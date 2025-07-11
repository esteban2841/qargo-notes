// @typescript-eslint/no-explicit-any
'use client'
import {QargoCoffeeContext} from '@/context'
import { useContext, useState } from 'react'
import { Input } from "@/app/components/auth/atoms/Input";
import { Button } from "@/app/components/auth/atoms/Button";
import { ChevronRight, Mail, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchDataSections } from '@/utils/qargoCommonFunctions';
export const AuthForm = () => {
  const router = useRouter();
  const { isLoginMode, toggleMode } = useContext(QargoCoffeeContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  interface ApiResponse {
    status: number;
    [key: string]: any;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission
    try {
      console.log("🚀 ~ handleSubmit ~ isLoginMode:", isLoginMode)
      const registerResponse: ApiResponse = isLoginMode 
        ? await fetchDataSections('http://localhost:3000/api', 'login', undefined, formData) 
        : await fetchDataSections('http://localhost:3000/api', 'register', undefined, formData);
      console.log("🚀 ~ handleSubmit ~ registerResponse:", registerResponse)
      if(registerResponse.status == 200 && !isLoginMode){
        const loginResponse: ApiResponse = await fetchDataSections('http://localhost:3000/api', 'login', undefined, formData) 
        if(loginResponse.status == 200){
          router.push('/main')
        }
      }
      if(registerResponse.status == 200 && isLoginMode){
        router.push('/main')
      }
    } catch (error: unknown) {
      const errorMessage = (error as any).response?.data?.message || 'Algo salio mal. Por favor intentelo de nuevo'
      return errorMessage
    }
  };

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleInputChange = (e: InputChangeEvent): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2 z-40 md:gap-6 bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
      <div className="text-center ">
        <h2 className="text-2xl font-bold text-white ">
          {isLoginMode ? 'Welcome Back' : 'Join QargoNotes'}
        </h2>
        <p className="text-gray-400">
          {isLoginMode ? 'Sign in to your account' : 'Create your account to get started'}
        </p>
      </div>

      <div className="space-y-2 md:space-y-6">
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

        <Button variant='primary' onClick={(e)=>handleSubmit(e)} className="w-full">
          {isLoginMode ? 'Sign In' : 'Create Account'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="md:mt-8 text-center">
        <p className="text-gray-400 ">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        </p>
        <Button
          variant="ghost"
          onClick={()=>toggleMode && toggleMode(!isLoginMode)}
          className="w-full"
        >
          {isLoginMode ? 'Create Account' : 'Sign In'}
        </Button>
      </div>
    </div>
  );
};
