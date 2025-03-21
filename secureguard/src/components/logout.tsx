"use client";

import router from "next/router";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from 'react';
import { AuthContext } from "@/components/AuthProvider"
import { deleteSession } from "@/backend/sessions";

const Logout = () => {
    const route = useRouter();
    const { userID, setUserID } = useContext(AuthContext);

    useEffect(() => {
        setUserID(null);
        deleteSession();
        route.push("/");
    }, [router]);

    return (
        <></>
    )
}

export default Logout;