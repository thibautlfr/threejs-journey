import {OrbitControls} from '@react-three/drei'
import {Perf} from 'r3f-perf'
import {
    Bloom,
    DepthOfField,
    EffectComposer,
    Glitch,
    Noise,
    SSR,
    ToneMapping,
    Vignette
} from "@react-three/postprocessing"
import {ToneMappingMode, BlendFunction, GlitchMode} from "postprocessing"
import {useControls} from 'leva'

export default function Experience() {
    const {showVignette, blendFunction, opacity} = useControls('Vignette', {
        showVignette: {value: false},
        blendFunction: {value: BlendFunction.NORMAL, options: BlendFunction},
        opacity: {value: 1, min: 0, max: 1}
    }, {collapsed: true})

    const {showGlitch, delay, duration, strength, mode} = useControls('Glitch', {
        showGlitch: {value: false},
        delay: {value: [0.5, 1], min: 0, max: 2},
        duration: {value: [0.1, 0.3], min: 0, max: 1},
        strength: {value: [0.2, 0.4], min: 0, max: 1},
        mode: {value: GlitchMode.SPORADIC, options: GlitchMode}
    }, {collapsed: true})

    const {showNoise} = useControls('Noise', {
        showNoise: {value: false},
    }, {collapsed: true})

    return <>
        <color args={['#ffffff']} attach="background"/>

        <EffectComposer>
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC}/>
            {showVignette &&
                <Vignette
                    offset={0.3}
                    darkness={0.9}
                    blendFunction={blendFunction}
                    opacity={opacity}
                />
            }

            {showGlitch &&
                <Glitch
                    delay={delay}
                    duration={duration}
                    strength={strength}
                    mode={mode}
                />
            }

            {showNoise &&
                <Noise
                    premultiply
                    blendFunction={BlendFunction.NORMAL}
                />
            }

            {/*<Bloom*/}
            {/*    mipmapBlur*/}
            {/*    luminanceThreshold={0.7}*/}
            {/*    luminanceSmoothing={1}*/}
            {/*    intensity={10}*/}
            {/*/>*/}

            <DepthOfField
                focusDistance={0.025}
                focalLength={0.025}
                bokehScale={6}
            />

        </EffectComposer>

        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5}/>
        <ambientLight intensity={1.5}/>

        <mesh castShadow position-x={-2}>
            <sphereGeometry/>
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={2} scale={1.5}>
            <boxGeometry/>
            <meshStandardMaterial
                color="mediumpurple"
            />
        </mesh>

        <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry/>
            <meshStandardMaterial color="greenyellow"/>
        </mesh>
    </>
}