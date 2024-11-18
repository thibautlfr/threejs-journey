import * as THREE from 'three'
import {useEffect, useMemo, useRef} from "react";

export default function CustomObject({verticesCount}) {

    const geometryRef = useRef()

    useEffect(() => {
        geometryRef.current.computeVertexNormals()
    }, []);

    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3)

        for (let i = 0; i < verticesCount; i++) {
            positions[i] = (Math.random() - 0.5) * 3
        }
        return positions
    }, [])

    return <mesh>
        <bufferGeometry ref={geometryRef}>
            <bufferAttribute
                attach="attributes-position"
                count={verticesCount}
                itemSize={3}
                array={positions}
            />
        </bufferGeometry>
        <meshStandardMaterial color='red' side={THREE.DoubleSide} />
    </mesh>
}