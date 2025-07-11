'use client'
import {QargoCoffeeContext} from '@/context'
import { useContext, useState } from 'react'
import { Input } from "@/app/components/auth/atoms/Input";
import { Button } from "@/app/components/auth/atoms/Button";
import { ChevronRight, Mail, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
export const AuthForm = () => {
  const router = useRouter();
  const { isLoginMode, toggleMode } = useContext(QargoCoffeeContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      const registerResponse = await fetch(
        isLoginMode ? '/api/login' : '/api/register',
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          cache: 'no-cache',
          body: JSON.stringify(formData)
        }
      )
      if(registerResponse.status == 200 && !isLoginMode){
        const loginResponse = await fetch(
          '/api/login',
          {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            body: JSON.stringify({
              email: formData.email, 
              password: formData.password
            })
          }
        )
        if(loginResponse.status == 200){
          const res = await loginResponse.json()
          router.push('/main')
        }
      }
      if(registerResponse.status == 200 && isLoginMode){
        const res = await registerResponse.json()
        router.push('/main')
      }
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ error:", error)
      const errorMessage = (error as any).response?.data?.message || 'Algo salio mal. Por favor intentelo de nuevo'
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {isLoginMode ? 'Welcome Back' : 'Join QargoNotes'}
        </h2>
        <p className="text-gray-400">
          {isLoginMode ? 'Sign in to your account' : 'Create your account to get started'}
        </p>
      </div>

      <div className="space-y-6">
        {!isLoginMode && (
          <Input
            icon={User}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        )}
        
        <Input
          icon={Mail}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
        />
        
        <Input
          icon={Lock}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />

        {isLoginMode && (
          <div className="text-right">
            <button
              type="button"
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <Button onClick={handleSubmit} className="w-full">
          {isLoginMode ? 'Sign In' : 'Create Account'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-400 mb-4">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        </p>
        <Button
          variant="ghost"
          onClick={()=>toggleMode(!isLoginMode)}
          className="w-full"
        >
          {isLoginMode ? 'Create Account' : 'Sign In'}
        </Button>
      </div>
    </div>
  );
};
