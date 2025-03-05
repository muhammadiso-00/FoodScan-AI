"use client";

import { FoodAnalysis } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FoodAnalysisResultProps {
  analysis: FoodAnalysis;
  foodName: string;
}

export default function FoodAnalysisResult({ analysis, foodName }: FoodAnalysisResultProps) {
  // Extract numeric values from string formats
  const getNumericValue = (str: string): number => {
    const match = str.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Extract protein, fat, and carbs values
  const proteinValue = analysis.protein || getNumericValue(analysis.protein_content);
  const fatValue = analysis.fat || getNumericValue(analysis.fat_content);
  const carbsValue = analysis.carbs || getNumericValue(analysis.carbohydrate_content);

  const macroData = [
    { name: "Protein", value: proteinValue, color: "hsl(var(--chart-1))" },
    { name: "Carbs", value: carbsValue, color: "hsl(var(--chart-2))" },
    { name: "Fat", value: fatValue, color: "hsl(var(--chart-3))" },
  ];

  // Calculate calories if not provided
  const calories = analysis.calories || (proteinValue * 4 + carbsValue * 4 + fatValue * 9);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Analysis Results</span>
          <Badge variant="outline" className="text-xs font-normal">
            {analysis.food_name || foodName}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
          <div className="space-y-6">
            {/* Calories */}
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-4xl font-bold">{Math.round(calories)}</div>
              <div className="text-sm text-muted-foreground mt-1">Calories</div>
            </div>

            {/* Macronutrients Chart */}
            <div>
              <h3 className="text-lg font-medium mb-4">Macronutrients</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}g`}
                      labelLine={false}
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <Separator />

            {/* Macronutrient Details */}
            <div>
              <h3 className="text-lg font-medium mb-4">Detailed Breakdown</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{proteinValue}g</div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                  <div className="text-xs text-muted-foreground mt-1">{analysis.protein_content}</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{carbsValue}g</div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                  <div className="text-xs text-muted-foreground mt-1">{analysis.carbohydrate_content}</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{fatValue}g</div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                  <div className="text-xs text-muted-foreground mt-1">{analysis.fat_content}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Vitamins & Minerals */}
            {(analysis.vitamins?.length > 0 || analysis.minerals?.length > 0) && (
              <div>
                <h3 className="text-lg font-medium mb-4">Vitamins & Minerals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.vitamins?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Vitamins</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.vitamins.map((vitamin, index) => (
                          <Badge key={index} variant="secondary">
                            {vitamin}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {analysis.minerals?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Minerals</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.minerals.map((mineral, index) => (
                          <Badge key={index} variant="secondary">
                            {mineral}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator />

            {/* Health Benefits */}
            {analysis.health_benefits?.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Health Benefits</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {analysis.health_benefits.map((benefit, index) => (
                    <li key={index} className="text-sm">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Common Uses */}
            {analysis.common_uses?.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Common Uses</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.common_uses.map((use, index) => (
                    <Badge key={index} variant="outline">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Recommendations */}
            {analysis.recommendations && (
              <div>
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm">{analysis.recommendations}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <Card>
        <CardHeader>
          <CardTitle>Tahlil Natijasi</CardTitle>
          <CardDescription>
            {foodName} uchun batafsil ma'lumot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Oqsillar</h3>
              <p>{analysis.protein_content}</p>
            </div>
            <div>
              <h3 className="font-medium">Yog'lar</h3>
              <p>{analysis.fat_content}</p>
            </div>
            <div>
              <h3 className="font-medium">Uglevodlar</h3>
              <p>{analysis.carbohydrate_content}</p>
            </div>
            {/* ... other analysis details ... */}
          </div>
        </CardContent>
      </Card>
    </Card>
  );
}
