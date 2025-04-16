"use client";

import Cookies from 'js-cookie';
import router from "next/router";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from 'react';
import { AuthContext } from "@/components/AuthProvider"
import { getSession, deleteSession } from "@/backend/sessions";

const Logout = () => {
    const route = useRouter();
    const { userID, setUserID } = useContext(AuthContext);

    const del_session = async () => {
        await deleteSession();
    };

    useEffect(() => {
        del_session();
        setUserID(null);
        route.push("/");
    }, [router]);

    return (
        <></>
    )
}

export default Logout;