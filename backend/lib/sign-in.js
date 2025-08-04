import { authClient } from "../../frontend/src/auth/auth-client.js";

export async function signInUser(params) {
    try {
        const { data, error } = await authClient.signIn.email({
            email: params.email,
            password: params.password,
            callbackURL: "/dashboard",
            rememberMe: params.rememberMe ?? false
        }, {
            onRequest: () => {
                console.log("Signing in...");
            },
            onSuccess: (ctx) => {
                console.log("Sign in successful! Redirecting...", ctx);
                window.location.href = "/dashboard";
            },
            onError: (ctx) => {
                console.error("Sign in failed:", ctx.error);
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

export async function handleSignInForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const params = {
        email: formData.get('email'),
        password: formData.get('password'),
        rememberMe: formData.get('rememberMe') === 'on',
    };

    if (!params.email || !params.password) {
        const error = 'Email and password are required';
        alert(error);
        return { success: false, error };
    }

    const result = await signInUser(params);
    
    if (result.success) {
        console.log("Redirecting to dashboard...");
        window.location.href = "/dashboard";
    } else {
        alert(`Sign in failed: ${result.error}`);
    }

    return result;
}

export async function signIn(email, password, rememberMe = false) {
    return signInUser({ email, password, rememberMe });
}

export async function attemptSignIn(credentials) {
    try {
        return await signInUser({
            email: credentials.email,
            password: credentials.password,
            rememberMe: false
        });
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Sign in failed'
        };
    }
}
