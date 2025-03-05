"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export interface FoodAnalysis {
  id?: string;
  food_name: string;
  protein_content: string;
  fat_content: string;
  carbohydrate_content: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  vitamins: string[];
  minerals: string[];
  health_benefits: string[];
  common_uses: string[];
  recommendations?: string;
}

export default function FoodAnalysisPage() {
  const [analysisData, setAnalysisData] = useState<FoodAnalysis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAnalysis = localStorage.getItem('analysis');
      if (storedAnalysis) {
        try {
          const analysisData = JSON.parse(storedAnalysis) as FoodAnalysis;
          setAnalysisData(analysisData);
        } catch (error) {
          console.error('Error parsing analysis data from localStorage:', error);
        }
      }
    }
  }, []);

  if (!analysisData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <p>No analysis data found.</p>
      </div>
    );
  }

  const nutrientData = [
    { name: "Protein", value: analysisData.protein || 0, fill: "#8884d8" },
    { name: "Fat", value: analysisData.fat || 0, fill: "#82ca9d" },
    { name: "Carbs", value: analysisData.carbs || 0, fill: "#ffc658" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Food Analysis</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Food Details Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white bg-opacity-5 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Food Details</CardTitle>
              <CardDescription>Basic information about the food</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Food Name:</strong> {analysisData.food_name}</p>
              <p><strong>Protein:</strong> {analysisData.protein_content}</p>
              <p><strong>Fat:</strong> {analysisData.fat_content}</p>
              <p><strong>Carbs:</strong> {analysisData.carbohydrate_content}</p>
              <p><strong>Calories:</strong> {analysisData.calories || "N/A"}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vitamins Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white bg-opacity-5 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Vitamins</CardTitle>
              <CardDescription>Vitamins present in the food</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {analysisData.vitamins.map((vitamin, index) => (
                  <li key={index}>{vitamin}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Minerals Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white bg-opacity-5 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Minerals</CardTitle>
              <CardDescription>Minerals present in the food</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {analysisData.minerals.map((mineral, index) => (
                  <li key={index}>{mineral}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Health Benefits Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-white bg-opacity-5 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Health Benefits</CardTitle>
              <CardDescription>Health benefits of the food</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {analysisData.health_benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Common Uses Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <Card className="bg-white bg-opacity-5 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Common Uses</CardTitle>
              <CardDescription>Common uses of the food</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {analysisData.common_uses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations Card */}
        {analysisData.recommendations && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Card className="bg-white bg-opacity-5 backdrop-blur-lg">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Recommendations for the food</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{analysisData.recommendations}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Nutrient Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="mt-8"
      >
        <Card className="bg-white bg-opacity-5 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>Nutrient Distribution</CardTitle>
            <CardDescription>Macronutrient ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutrientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

     
    </div>
  );
}
