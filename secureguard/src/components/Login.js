"use client";

import React, { useState, useContext } from 'react';

import Link from 'next/link'
import { useRouter } from "next/navigation";

import { FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

import { auth, db } from "../backend/firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth"
import { createSession } from "../backend/sessions.ts"

import Cookies from 'js-cookie';

import { AuthContext } from './AuthProvider.tsx';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { userID, setUserID } = useContext(AuthContext);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!formData.email) {
      setError("Email cannot be empty!");
      return;
    }
    if (!formData.password) {
      setError("Password cannot be empty!");
      return;
    }

    const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);

    const userID = await userCredential.user.getIdToken();

    //await createSession(userID);

    setUserID(userID);

    if (formData.rememberMe) {
      Cookies.set("userID", userID, { expires: 7 });
    }

    router.push("/");

  } catch (error) {
    setError(error.message);

    if (error.message == "Firebase: Error (auth/invalid-credential).") {
      setError("Invalid Email/Password!");
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaShieldAlt className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">SecureGuard</h2>
          <p className="mt-2 text-base text-gray-600">Welcome back</p>
          <p className="mt-1 text-sm text-gray-500">Please enter your credentials to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">Email address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>
        
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 text-black border-gray-300 rounded"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          { error && <label className="text-red-500">{ error }</label> }
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 mt-6"
          >
            Sign in
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-black font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 