'use client'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

export function CoffeeCups(props: any) {
  const { nodes, materials } = useGLTF('/models/coffee/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_cappuccino_03_coffee_BLACK_0 as THREE.Mesh).geometry}
          material={materials.coffee_BLACK}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_blackEsspresso_03_coffee_BLACK_0 as THREE.Mesh).geometry}
          material={materials.coffee_BLACK}
          position={[34.348, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_latte_03_coffee_BLACK_0 as THREE.Mesh).geometry}
          material={materials.coffee_BLACK}
          position={[-19.272, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_blackEsspresso_02_coffee_BLACK_0 as THREE.Mesh).geometry}
          material={materials.coffee_BLACK}
          position={[34.348, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_black_02_coffee_BLACK_0 as THREE.Mesh).geometry}
          material={materials.coffee_BLACK}
          position={[19.386, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_latte_02_coffee_LATTE_0 as THREE.Mesh).geometry}
          material={materials.coffee_LATTE}
          position={[-19.272, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_cappuccino_02_coffee_BLACK_0 as THREE.Mesh).geometry}
          material={materials.coffee_BLACK}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_blackEsspresso_01_coffee_BLACK_0 as THREE.Mesh).geometry}
          material={materials.coffee_BLACK}
          position={[34.348, 0.344, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_black_01_coffee_BLACK_0 as THREE.Mesh).geometry}
          material={materials.coffee_BLACK}
          position={[19.386, 5.141, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_latte_01_coffee_LATTE_0 as THREE.Mesh).geometry}
          material={materials.coffee_LATTE}
          position={[-19.272, 6.195, 0]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.coffee_cappuccino_01_coffee_CAPPUCCINO_0 as THREE.Mesh).geometry}
          material={materials.coffee_CAPPUCCINO}
          position={[0, 0.922, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/coffee/scene.gltf')