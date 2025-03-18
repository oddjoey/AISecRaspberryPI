"use server";

import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { auth } from "./firebase";

export async function createSession(token: string)
{
    const cookieStore = await cookies();

    cookieStore.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
    });
}

export async function getSession()
{
    const cookie = (await cookies()).get('authToken')?.value

    return { isAuth: cookie != null, authToken: cookie }
}

export async function deleteSession()
{
    const cookieStore = await cookies();
    cookieStore.delete('authToken');

    await signOut(auth);
}