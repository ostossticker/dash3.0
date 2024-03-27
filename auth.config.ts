import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./fetch/user"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"

export default{
    providers:[
        google({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        }),
        github({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            credentials: {
                email: { 
                    label: 'Email', 
                    type: 'email', 
                    placeholder: 'Email' 
                },
                password: {
                  label: 'Password',
                  type: 'password',
                  placeholder: 'Password',
                },
              },
            async authorize(credentials){
                const {email , password} = credentials
                const user = await getUserByEmail(email as string)
                if(!user || !user.email) return null
                if(password === user.password) return user
                return null  
            }
        })
    ]
}satisfies NextAuthConfig