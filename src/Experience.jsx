import { useFrame, extend, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import CustomObject from "./CustomObject"

extend({ OrbitControls })

export default function Experience() {

    const { camera, gl } = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()

    useFrame((state, delta) => {
        const angle = state.clock.elapsedTime
        state.camera.position.x = Math.sin(angle) * 12
        state.camera.position.z = Math.cos(angle) * 12
        state.camera.lookAt(0, 0, 0)


        cubeRef.current.rotation.y += delta
        // groupRef.current.rotation.y += delta
    })

    return <>

        {/*<orbitControls*/}
        {/*    args={[camera, gl.domElement]}*/}
        {/*/>*/}

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <group ref={groupRef}>
            {/* Sphere */}
            <mesh
                position-x={-2}
            >
                <sphereGeometry />
                <meshStandardMaterial color='orange' />
            </mesh>

            {/* Cube */}
            <mesh
                ref={cubeRef}
                rotation-y={Math.PI * 0.25}
                scale={1.5}
                position-x={2}
            >
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color='mediumpurple' />
            </mesh >
        </group>

        {/* Floor */}
        <mesh
            position-y={-1}
            rotation-x={- Math.PI * 0.5}
            scale={10}
        >
            <planeGeometry />
            <meshStandardMaterial color='greenyellow' />
        </mesh>

        <CustomObject verticesCount={10*3} />
    </>
}