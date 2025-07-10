
import { Object3DRenderer } from "@/app/components/molecules/Object3DRenderer";
import { CoffeeCups } from "@/app/components/atoms/CoffeeCups";
import { AuthForm } from "@/app/components/molecules/AuthForm";
import { Hero } from "@/app/components/organisms/Hero";

const MODELS3D = [
  {
    children: <CoffeeCups/>,
    context: false,
    name: 'helmet'
  }
]


const AuthScreen = () => {
  return (
      <div className="w-full flex relative h-[100dvh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="w-3/4 z-40 absolute flex flex-row items-end h-full justify-end ">
        {MODELS3D.map((model, index)=>{
          return <Object3DRenderer key={index} name={model.name} context={model.context}>
            {model.children}
          </Object3DRenderer>
        })}
      </div>
        <Hero />
        <AuthForm />
      </div>
  )
}

export default AuthScreen

