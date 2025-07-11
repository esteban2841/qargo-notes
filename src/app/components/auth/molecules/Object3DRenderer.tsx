'use client'

import {  OrbitControls, Stage } from "@react-three/drei";
import { Canvas} from "@react-three/fiber"
import styled from "styled-components";
import { Suspense, useRef, useContext, RefObject } from "react";
import { Loader } from "../atoms/Loader";
import { QargoCoffeeContext } from "@/context";

const ThreeDimentionContainerRenderer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50dvh;
  width: 50vw;
  top: 60px;
  position: relative;
  right: 0;
  @media (max-width: 700px) {
    align-items: center;
    justify-content: start;
    position: relative;
    height: 50vh;
    width: 50vw;
  }

  background-color: transparent;
`

interface Object3DRendererProps {
  children: React.ReactNode
  context: boolean
  name: string
}

export const Object3DRenderer = ({children, context, name}: Object3DRendererProps) => {
    const ref = useRef<HTMLElement>()
    const { helmet } = useContext(QargoCoffeeContext)
    const isContextNeeded = context
    const { autoRotate } = helmet
  return (
    <ThreeDimentionContainerRenderer className={name}>
        <Canvas dpr={[1, 10]} camera={{ fov: 1 }} frameloop={'always'}	>
        <Suspense fallback={<Loader/>}>
            <Stage
            preset="upfront" intensity={10}  
            environment="warehouse">
                {children}
            </Stage>
        </Suspense>
        <OrbitControls ref={ref as RefObject<any>} makeDefault={!isContextNeeded} 
          autoRotate={autoRotate && isContextNeeded}  autoRotateSpeed={6}/>
        </Canvas>
    </ThreeDimentionContainerRenderer>
  )
}
