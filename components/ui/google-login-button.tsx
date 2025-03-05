import { useGoogleLogin } from '@react-oauth/google';
import { Button } from './button';
import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginButtonProps {
    onSuccess?: (tokenResponse: any) => void;
    onError?: () => void;
}

export function GoogleLoginButton({ onSuccess, onError }: GoogleLoginButtonProps) {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            localStorage.setItem('googleToken',tokenResponse.access_token)
            console.log("Google Token Response:", tokenResponse);
            try {
                const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userData = await res.json();
                console.log("Google User Data:", userData);
                // Call the onSuccess prop if provided
                if (onSuccess) onSuccess(tokenResponse);
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (onError) onError();
            }
        },
        onError: () => {
            console.error("Login Failed");
            if (onError) onError();
        },
        // Add flow type to ensure proper authentication
        flow: 'implicit'
    });

    return (
<Button
    variant="outline"
    onClick={() => login()}
    className="w-full flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
>
    <FcGoogle className="w-5 h-5" />
    Continue with Google
</Button>
    );
}
