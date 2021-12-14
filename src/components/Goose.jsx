import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Goose({ z, speed }) {
	const ref = useRef()
	const { viewport, camera } = useThree()
	const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
	// const { nodes, materials } = useGLTF('/goose.glb')

	const [data] = useState({
		x: THREE.MathUtils.randFloatSpread(2),
		y: THREE.MathUtils.randFloatSpread(2 * height),
		rX: Math.random() * Math.PI,
		rY: Math.random() * Math.PI,
		rZ: Math.random() * Math.PI,
	})

	useFrame((state) => {
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

	// return (
	// 	<mesh
	// 		ref={ref}
	// 		geometry={nodes.banana.geometry}
	// 		material={materials.skin}
	// 		material-emissive="orange"
	// 		rotation={[-Math.PI / 2, 0, 0]}
	// 	/>
	// )

	const { nodes, materials } = useGLTF('/goose-transformed.glb')

	return (
		<group ref={ref}>
			<mesh geometry={nodes.Plane_Material003_0.geometry} material={materials['Material.003']} />
			<mesh geometry={nodes.Plane_Material003_0_1.geometry} material={materials['Material.001']} />
			<mesh geometry={nodes.Plane_Material003_0_2.geometry} material={materials['Material.002']} />
		</group>
	)
}