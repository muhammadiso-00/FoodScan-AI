"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Upload, Search, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FoodAnalysis } from "@/lib/types";
import FoodAnalysisResult from "@/components/food-analysis-result";
import Link from "next/link";
import GradientBackground from "@/components/gradient-background";

const MISTRAL_API_KEY = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

export default function AnalyzePage() {
  const [foodName, setFoodName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1
  });

  const processMistralResponse = (responseText: string): FoodAnalysis => {
    try {
      // Clean the response text to handle potential extra characters
      let cleanedText = responseText.trim();

      // Find the first '{' and the last '}' to extract just the JSON object
      const startIndex = cleanedText.indexOf('{');
      const endIndex = cleanedText.lastIndexOf('}');

      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        cleanedText = cleanedText.substring(startIndex, endIndex + 1);
      }

      // Parse the cleaned JSON
      const analysis = JSON.parse(cleanedText);
      return {
        ...analysis,
        // Ensure all required fields exist
        food_name: analysis.food_name || foodName,
        protein_content: analysis.protein_content || "0g",
        fat_content: analysis.fat_content || "0g",
        carbohydrate_content: analysis.carbohydrate_content || "0g",
        vitamins: analysis.vitamins || [],
        minerals: analysis.minerals || [],
        health_benefits: analysis.health_benefits || [],
        common_uses: analysis.common_uses || []
      };
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // Fallback with default values
      return {
        food_name: foodName,
        protein_content: "0g",
        fat_content: "0g",
        carbohydrate_content: "0g",
        vitamins: [],
        minerals: [],
        health_benefits: [],
        common_uses: []
      };
    }
  };

  const analyzeByText = async () => {
    if (!foodName.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Please enter a food name" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(MISTRAL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistral-medium",
          messages: [{
            role: "user",
            content: `Analyze this food: ${foodName}. Return in JSON format with the following fields: food_name, protein_content, fat_content, carbohydrate_content, vitamins (array), minerals (array), health_benefits (array), common_uses (array).In uzbek language`
          }],
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!data?.choices?.[0]?.message?.content) {
        throw new Error("Invalid response from Mistral API");
      }

      const analysisData = processMistralResponse(data.choices[0].message.content);
      setAnalysis(analysisData);
      localStorage.setItem("analysis", JSON.stringify(analysisData));

      if (user) {
        await addDoc(collection(db, "foodEntries"), {
          userId: user.uid,
          foodName,
          analysis: analysisData,
          createdAt: serverTimestamp(),
        });
      }

      toast({ title: "Analysis complete", description: "Your food has been analyzed successfully." });
    } catch (error) {
      console.error("Error analyzing food:", error);
      toast({ variant: "destructive", title: "Analysis failed", description: "Failed to analyze food." });
    } finally {
      setLoading(false);
    }
  };

  const analyzeByImage = async () => {
    if (!file) {
      toast({ variant: "destructive", title: "Error", description: "Please upload an image" });
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      const base64Image = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
      });

      const response = await fetch(MISTRAL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistral-medium",
          messages: [{
            role: "user",
            content: [
              {
                type: "text",
                text: "Identify and analyze this food image. Return in JSON format with the following fields: food_name, protein_content, fat_content, carbohydrate_content, vitamins (array), minerals (array), health_benefits (array), common_uses (array)."
              },
              {
                type: "image_url",
                image_url: { url: base64Image }
              }
            ]
          }],
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!data?.choices?.[0]?.message?.content) {
        throw new Error("Invalid response from Mistral API");
      }

      const analysisData = processMistralResponse(data.choices[0].message.content);
      setAnalysis(analysisData);

      if (user) {
        let imageUrl = null;
        if (file) {
          const storageRef = ref(storage, `food-images/${user.uid}/${Date.now()}-${file.name}`);
          await uploadBytes(storageRef, file);
          imageUrl = await getDownloadURL(storageRef);
        }

        await addDoc(collection(db, "foodEntries"), {
          userId: user.uid,
          foodName: analysisData.food_name,
          imageUrl: imageUrl,
          analysis: analysisData,
          createdAt: serverTimestamp(),
        });
      }

      toast({ title: "Analysis complete", description: "Your food image has been analyzed successfully." });
    } catch (error) {
      console.error("Error analyzing food image:", error);
      toast({ variant: "destructive", title: "Analysis failed", description: "Failed to analyze food image." });
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="container mx-auto px-4 py-[100px]">
      <h1 className="text-3xl font-bold text-center mb-8">Ovqatni Tahlil Qilish</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="text">Ovqat Nomini Kiriting</TabsTrigger>
              <TabsTrigger value="image">Rasm Yuklash</TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <Card>
                <CardHeader>
                  <CardTitle>Ovqat Nomi Orqali Tahlil</CardTitle>
                  <CardDescription>
                    Tahlil qilmoqchi bo'lgan ovqat nomini kiriting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="food-name">Ovqat Nomi</Label>
                      <Input
                        id="food-name"
                        placeholder="Masalan: Tovuq Salat, Pitsa, Sushi"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={analyzeByText}
                      disabled={loading || !foodName.trim()}
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Tahlil qilinmoqda...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Ovqatni Tahlil Qilish
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="image">
              <Card>
                <CardHeader>
                  <CardTitle>Rasm Orqali Tahlil</CardTitle>
                  <CardDescription>
                    Tahlil qilmoqchi bo'lgan ovqat rasmini yuklang
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {imagePreview ? (
                        <div className="flex flex-col items-center">
                          <div className="relative w-full h-48 mb-4">
                            <Image
                              src={imagePreview}
                              alt="Ovqat rasmi"
                              fill
                              className="object-contain rounded-md"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Almashtirish uchun bosing yoki surung
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">
                            {isDragActive ? "Rasmni shu yerga tashlang" : "Rasmni shu yerga tashlang yoki tanlash uchun bosing"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            JPG, PNG, WEBP formatlar qo'llab-quvvatlanadi
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={analyzeByImage}
                      disabled={loading || !file}
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Tahlil qilinmoqda...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Rasmni Tahlil Qilish
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {!user && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Tahlil natijalarini saqlash uchun tizimga kiring.</span> Ovqatlanish ma'lumotlaringizni kuzatib borish uchun hisob yarating.
              </p>
              <div className="mt-2 flex space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Kirish</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Ro'yxatdan O'tish</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        <div>
          {analysis ? (
            <FoodAnalysisResult
              analysis={analysis}
              foodName={foodName || (file?.name.split('.')[0] || "Ovqat")}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg border p-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Hali Tahlil Qilinmagan</h3>
                <p className="text-muted-foreground max-w-md">
                  Batafsil ozuqaviy ma'lumotlarni olish uchun ovqat nomini kiriting yoki rasm yuklang.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
