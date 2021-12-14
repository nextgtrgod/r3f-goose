import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer, DepthOfField, Noise, Vignette } from '@react-three/postprocessing'
import Goose from './components/Goose.jsx'

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
					<Goose
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