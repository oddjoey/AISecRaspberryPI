"use client";
import React, { useState } from 'react';

import Link from 'next/link'
import { useRouter } from "next/navigation";

import { FaRegUser, FaEye, FaEyeSlash } from 'react-icons/fa'; /*firebase db setup */

import { auth, db } from "../javascript/firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (!formData.firstName) {
          setError("First Name cannot empty!");
          return;
        }
        if (!formData.lastName) {
          setError("Last Name cannot be empty!");
          return;
        }
        if (!formData.email) {
          setError("Email cannot be empty!");
          return;
        }
        if (!formData.password) {
          setError("Password cannot be empty!");
          return;
        }
        if (formData.password != formData.confirmPassword) {
          setError("Cannot confirm password!");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        await setDoc(doc(collection(db, "users"), userCredential.user.uid), {
          uid: userCredential.user.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          createdAt: new Date(),
        });

        router.push("/login");
      
    } catch (error) {
      setError(error.message);
      if (error.message == "Firebase: Error (auth/invalid-email).") {
        setError("Invalid email!");
      }
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already in use!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <FaRegUser className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-600">Fill in the details to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-left">
              <label className="block text-sm text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                placeholder="First"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="text-left">
              <label className="block text-sm text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Last"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
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

          <div className="text-left">
            <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>
          { error && <label className="text-red-500">{ error }</label> }
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 mt-6"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-black font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp; 