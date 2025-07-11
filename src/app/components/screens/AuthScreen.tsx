
import { Object3DRenderer } from "@/app/components/auth/molecules/Object3DRenderer";
import { CoffeeCups } from "@/app/components/auth/atoms/CoffeeCups";
import { AuthForm } from "@/app/components/auth/molecules/AuthForm";
import { Hero } from "@/app/components/auth/organisms/Hero";

const MODELS3D = [
  {
    children: <CoffeeCups/>,
    context: false,
    name: 'helmet'
  }
]


const AuthScreen = () => {
  return (
      <div className="w-full flex flex-col-reverse md:flex-row relative md:h-[100dvh] ">
        <Hero />
        <div className=" w-full h-40 md:w-3/4 z-40 relative md:absolute flex flex-row items-center md:items-end md:h-full justify-center md:justify-end ">
          {MODELS3D.map((model, index)=>{
            return <Object3DRenderer key={index} name={model.name} context={model.context}>
              {model.children}
            </Object3DRenderer>
          })}
        </div>
        <AuthForm />
      </div>
  )
}

export default AuthScreen

