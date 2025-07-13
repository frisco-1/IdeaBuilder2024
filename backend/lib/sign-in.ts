import { authClient } from "./auth-client";

interface SignInParams {
    email: string;
    password: string;
    rememberMe?: boolean;
}

interface SignInResult {
    success: boolean;
    data?: any;
    error?: string;
}

export async function signInUser(params: SignInParams): Promise<SignInResult> {
    try {
        const { data, error } = await authClient.signIn.email({
            /**
             * The user email
             */
            email: params.email,
            /**
             * The user password
             */
            password: params.password,
            /**
             * A URL to redirect to after the user verifies their email (optional)
             */
            callbackURL: "/dashboard",
            /**
             * remember the user session after the browser is closed. 
             * @default true
             */
            rememberMe: params.rememberMe ?? false
        }, {
            //callbacks
            onRequest: () => {
                //show loading
                console.log("Signing in...");
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                console.log("Sign in successful! Redirecting...", ctx);
                window.location.href = "/dashboard";
            },
            onError: (ctx) => {
                // display the error message
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

export async function handleSignInForm(event: SubmitEvent): Promise<SignInResult> {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const params: SignInParams = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        rememberMe: formData.get('rememberMe') === 'on', // checkbox value
    };

    // Validate required fields
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

// Alternative: Direct parameter approach
export async function signIn(email: string, password: string, rememberMe: boolean = false): Promise<SignInResult> {
    return signInUser({ email, password, rememberMe });
}

// Helper function for programmatic sign-in
export async function attemptSignIn(credentials: { email: string; password: string }): Promise<SignInResult> {
    try {
        const result = await signInUser({
            email: credentials.email,
            password: credentials.password,
            rememberMe: false
        });
        
        return result;
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Sign in failed'
        };
    }
}