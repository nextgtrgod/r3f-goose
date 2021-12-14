import * as THREE from 'three'
import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stats, Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { EffectComposer, DepthOfField, Noise, Vignette } from '@react-three/postprocessing'

function Banana({ z, speed }) {
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

export default function App({ count = 80, speed=1, depth = 80 }) {
	return (
		<Canvas
			gl={{ alpha: false, antialias: false }}
			dpr={[1, 1.5]}
			camera={{ position: [0, 0, 10], near: 0.01, far: depth + 15, fov: 30 }}
		>
			<color attach="background" args={["#FEB8C6"]}/>
			{/* <ambientLight intensity={0.2} /> */}
			<spotLight position={[10, 20, 10]} penumbra={1} intensity={1} color="pink"/>
			<Suspense fallback={null}>
				<Environment preset="sunset" />
				{Array.from({ length: count }, (_, i) => (
					<Banana
						key={i}
						z={-(i / count) * depth - 20}
						speed={speed}
					/>
				))}
			</Suspense>
			<EffectComposer multisampling={0}>
				<DepthOfField
					target={[0, 0, 60]}
					focalLength={.5}
					bokehScale={11}
					height={700}
				/>
				{/* <Noise premultiply opacity={.5} /> */}
				{/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
			</EffectComposer>
			<Stats showPanel={0} />
			{/* <OrbitControls /> */}
		</Canvas>
	)
}