import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useScroll } from '@react-three/drei'
// import { useSpring, animated, config } from '@react-spring/three'
import gooseModelUrl from '@/assets/models/goose.glb?url'

export default function Goose({ index, z, speed }) {
	const { nodes, materials } = useGLTF(gooseModelUrl)
	const { viewport, camera } = useThree()
	const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

	const ref = useRef()
	const scroll = useScroll()

	const [data] = useState({
		x: THREE.MathUtils.randFloatSpread(1.5),
		y: THREE.MathUtils.randFloatSpread(2 * height),
		rX: Math.random() * Math.PI,
		rY: Math.random() * Math.PI,
		rZ: Math.random() * Math.PI,
	})

	useFrame((state, dt) => {
		if (dt < 0.1)  {
			ref.current.position.set(
				(data.x * width),
				(data.y += (speed + scroll.offset * 8) * dt),
				z,
			)
		}

		const rotation = 0.08 * dt

		ref.current.rotation.set(
			(data.rX += rotation),
			(data.rY += rotation),
			(data.rZ += rotation),
		)

		const offsetHeight = height * (index === 0 ? 4 : 1)

		if (data.y > offsetHeight) data.y = -offsetHeight
	})

	const scale = 0.75

	return (
		<group ref={ref} scale={scale}>
			<mesh geometry={nodes.goose_1.geometry} material={materials.eye} />
			<mesh geometry={nodes.goose_2.geometry} material={materials.body} />
			<mesh geometry={nodes.goose_3.geometry} material={materials.paws} />
		</group>
	)
}