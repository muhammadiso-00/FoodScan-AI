export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }

  export interface FoodEntry {
    id: string;
    userId: string;
    foodName?: string;
    imageUrl?: string;
    createdAt: Date;
    analysis: FoodAnalysis;
  }

  export interface FoodAnalysis {
    id:string;
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
