"use client"
import { useState } from "react";
import Input from "@repo/ui/input";
import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { useRouter } from "next/navigation";

interface AuthPageProps {
    isSigninPage: boolean
}
export const AuthPage = ({ isSigninPage }: AuthPageProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    // we will add the functionality of uploading avatar later

    const router = useRouter();

    async function handleSignIn() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                email,
                password,
            })

            console.log(response.data.data.user);
            router.push("/");
            return response.data.data.user;
        }catch(e){
            console.log(e)
        }  
    }

    async function handleSignUp() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                name,
                email,
                password,
                username
            })

            console.log(response.data.data.user);
            router.push("/");
            return response.data.data.user;
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div>
            <div>
                {
                    isSigninPage ? null : (
                        <div>
                            <Input type="text" value={username} placeholder="Enter Username..." handleChange={
                                (e) => setUsername(e.target.value)
                            } />
                            <Input type="text" value={name} placeholder="Enter name..." handleChange={
                                (e) => setName(e.target.value)
                            } />
                        </div>
                    )
                }
                <Input type="email" value={email} placeholder="Enter Email..." handleChange={
                    (e) => setEmail(e.target.value)
                } />
                <Input type="text" value={password} placeholder="Enter Password..." handleChange={
                    (e) => setPassword(e.target.value)
                } />
                <button onClick={isSigninPage ? handleSignIn : handleSignUp}>
                    {isSigninPage ? "Sign In" : "Sign Up"}
                </button>
            </div>
        </div>
    )
}


