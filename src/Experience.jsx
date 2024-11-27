import {Text3D, OrbitControls, Center, useMatcapTexture} from '@react-three/drei'
import {Perf} from 'r3f-perf'
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience() {

    // const [ torusGeometry, setTorusGeometry ] = useState()
    // const [ material, setMaterial ] = useState()

    const donuts = useRef([])
    console.log(donuts)
    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

    useEffect(() => {
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, []);

    useFrame((state, delta) => {
        donuts.current.forEach((donut) => {
            donut.rotation.y += delta * 0.3
        })
    })

    return <>

        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        {/*<torusGeometry ref={setTorusGeometry} />*/}
        {/*<meshMatcapMaterial ref={ setMaterial } matcap={matCapTexture}/>*/}

        <Center>
            <Text3D
                font="./fonts/helvetiker_regular.typeface.json"
                material={material}
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                Thibaut Lefrancois
            </Text3D>
        </Center>

        {[...Array(100)].map((value, index) =>
            <mesh
                ref={ (element) => donuts.current[index] = element }
                key={index}
                material={material}
                geometry={torusGeometry}
                position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                ]}
                scale={0.2 + Math.random() * 0.2}
                rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ]}
            />
        )}
    </>
}