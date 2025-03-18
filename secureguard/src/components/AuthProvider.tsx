"use client";

import { createContext, useState, useEffect } from "react";
import { NextOrObserver, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/backend/firebase";
import Cookies from "js-cookie";

export const AuthContext = createContext<object | null>(null);

export const AuthProvider = ( { children } : { children:React.ReactNode } ) => {
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        if (userID == null)
        {
            const cookieUserID = Cookies.get("userID");
            
            // validate user on server here

            //

            if (cookieUserID != null) {
                setUserID(cookieUserID);
            }
        }
    }, []);

    return (
        <AuthContext value={{userID, setUserID}}>
            {children}
        </AuthContext>
    );
}