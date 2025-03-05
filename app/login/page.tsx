"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Utensils } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from 'react';

export default function LoginPage() {
    const { toast } = useToast();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            console.log('Session:', session);
            console.log('User:', session?.user);
        }
    }, [session, status]);

    const handleSignIn = async () => {
        try {
            const response = await signIn('google', { callbackUrl: '/analyze', popup: true });
            if (response?.error) {
                throw new Error(response.error);
            }
            console.log('Sign-in r  esponse:', response);
        } catch (error:any) {
            console.error('Sign-in error:', error);
            toast({
                title: 'Error',
                description: error.message || 'Failed to sign in',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-10rem)]">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <Utensils className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">
                        Sign in with Google
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Button
                                onClick={handleSignIn}
                                variant="outline"
                                className="w-full flex items-center gap-2"
                            >
                                <FcGoogle className="h-5 w-5" />
                                Continue with Google
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
