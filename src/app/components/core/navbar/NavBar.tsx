'use client'
import { useContext } from "react"
import { Button } from "../../auth/atoms/Button"
import { Logo } from "../../auth/atoms/Logo"
import { QargoCoffeeContext } from "@/context"

export const NavBar = () => {

    const { logout } = useContext(QargoCoffeeContext)

    const handleLogout = () => {
        // Implement logout logic here
        logout && logout();
    };
  return (
    <nav className="w-full h-20 flex justify-between items-center bg-gray-900 border-b border-gray-700 p-4">
      <Logo className="text-white text-2xl font-bold" />
      <div onClick={()=>handleLogout()} className="flex justify-between items-center">
        <Button variant="primary">Logout</Button>
      </div>
    </nav>
  )
}

