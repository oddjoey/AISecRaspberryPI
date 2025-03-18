"use client";

import Cookies from 'js-cookie';
import router from "next/router";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from 'react';
import { AuthContext } from "@/components/AuthProvider"

const Logout = () => {
    const route = useRouter();
    const { userID, setUserID } = useContext(AuthContext);

    useEffect(() => {
        if (Cookies.get("userID")) {
            Cookies.remove("userID");
            setUserID(null);
            route.push("/");
        }
    }, [router]);

    return (
        <></>
    )
}

export default Logout;