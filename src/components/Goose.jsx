import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import gooseModelUrl from '../models/goose.glb?url'

export default function Goose({ z, speed }) {
	const { nodes, materials } = useGLTF(gooseModelUrl)
	const ref = useRef()
	const { viewport, camera } = useThree()
	const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

	const [data] = useState({
		x: THREE.MathUtils.randFloatSpread(2),
		y: THREE.MathUtils.randFloatSpread(2 * height),
		rX: Math.random() * Math.PI,
		rY: Math.random() * Math.PI,
		rZ: Math.random() * Math.PI,
	})

	useFrame((state, dt) => {
		ref.current.position.set(
			(data.x * width),
			(data.y += 0.025),
			z,
		)
		ref.current.rotation.set(
			(data.rX += 0.001),
			(data.rY += 0.001 * speed),
			(data.rZ += 0.001),
		)

		ref.current.scale.set(.5, .5, .5)

		if (data.y > height) data.y = -height
	})

	return (
		<group ref={ref}>
			<mesh geometry={nodes.goose_1.geometry} material={materials.eye} />
			<mesh geometry={nodes.goose_2.geometry} material={materials.body} />
			<mesh geometry={nodes.goose_3.geometry} material={materials.paws} />
		</group>
	)
}