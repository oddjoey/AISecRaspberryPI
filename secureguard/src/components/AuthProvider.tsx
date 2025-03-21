"use client";

import { createContext, useState, useEffect } from "react";
import { getSession } from "@/backend/sessions";

export const AuthContext = createContext<object | null>(null);

export const AuthProvider = ( { children } : { children:React.ReactNode } ) => {
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        const getsess = async () => {
            const session = await getSession();
            if (session) {
                setUserID(session);
            }
        };

        if (userID == null) {
            getsess();
        }
    }, []);

    return (
        <AuthContext.Provider value={{userID, setUserID}}>
            {children}
        </AuthContext.Provider>
    );
}