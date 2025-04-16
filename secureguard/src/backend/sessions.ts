"use server";

import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { auth } from "./firebase";

export async function createSession(token: string)
{
    const cookieStore = await cookies();

    cookieStore.set('authToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
    });
}

export async function getSession()
{
    const cookie = (await cookies()).get('authToken')?.value

    return cookie;
}


export async function deleteSession()
{
    const cookieStore = await cookies();
    cookieStore.delete('authToken');

    console.log("deleted!!!");

    await signOut(auth);
}