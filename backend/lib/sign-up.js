import { authClient } from "../../frontend/src/auth/auth-client.js";

export async function signUpUser(params) {
    try {
        const { data, error } = await authClient.signUp.email({
            email: params.email,
            password: params.password,
            name: params.name,
            image: params.image,
            callbackURL: "/dashboard"
        }, {
            onRequest: () => {
                console.log("Signing up...");
            },
            onSuccess: (ctx) => {
                console.log("Sign up successful! Redirecting...", ctx);
                window.location.href = "/dashboard";
            },
            onError: (ctx) => {
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

export async function handleSignUpForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const params = {
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
        image: formData.get('image') || undefined,
    };

    const result = await signUpUser(params);
    
    if (result.success) {
        window.location.href = "/dashboard";
    } else {
        alert(`Sign up failed: ${result.error}`);
    }

    return result;
}
