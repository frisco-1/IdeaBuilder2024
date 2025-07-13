import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

//This exclamation mark is used to resolve the TypScript Error 2322

//It's a non-null assertion operator, which tells TypeScript that the value will not be null or undefined at runtime.
//It tells TypeScript that even though something looks like it could be null or undefined, it can trust you that it won't be.

const databaseLink = new MongoClient(process.env.DB_URI!);

const db = databaseLink.db("catalog");

export const auth = betterAuth({
     database: mongodbAdapter(db),

     emailAndPassword: {  
        enabled: true
    },
    socialProviders: { 
        github: { 
           clientId: process.env.GITHUB_CLIENT_ID as string, 
           clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    }, 
});