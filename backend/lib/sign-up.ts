import { authClient } from "./auth-client";

interface SignUpParams {
    email: string;
    password: string;
    name: string;
    image?: string;
}

interface SignUpResult {
    success: boolean;
    data?: any;
    error?: string;
}

export async function signUpUser(params: SignUpParams): Promise<SignUpResult> {
    try {
        const { data, error } = await authClient.signUp.email({
            email: params.email,
            password: params.password,
            name: params.name,
            image: params.image,
            callbackURL: "/dashboard"
        }, {
            onRequest: (ctx) => {
                //show loading
                console.log("Signing up...");
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                console.log("Sign up successful! Redirecting...", ctx);
                window.location.href =  "/dashboard";
            },
            onError: (ctx) => {
                // display the error message
                console.error("Sign up failed:", ctx.error);
                alert(ctx.error.message);
            },
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        return { 
            success: false, 
            error: err instanceof Error ? err.message : 'Unknown error occurred' 
        };
    }
}

export async function handleSignUpForm(event: SubmitEvent): Promise<SignUpResult> {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const params: SignUpParams = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        name: formData.get('name') as string,
        image: (formData.get('image') as string) || undefined,
    };

    const result = await signUpUser(params);
    
    if (result.success) {
        window.location.href = "/dashboard";
    } else {
        alert(`Sign up failed: ${result.error}`);
    }

    return result;
}