import './style.css'
import ReactDOM from 'react-dom/client'
import {Canvas} from '@react-three/fiber'
import Experience from './Experience'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        // dpr={ [1, 2] } by default with R3F
        gl={{
            antialias: false,
            outputColorSpace: THREE.SRGBColorSpace,
            // alpha: false by default with R3F
        }}
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [3, 2, 6]
        }}
    >
        <Experience/>
    </Canvas>
)