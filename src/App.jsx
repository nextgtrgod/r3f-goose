import { useState, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Stats, Environment, OrbitControls, ScrollControls } from '@react-three/drei'
import { EffectComposer, DepthOfField, Noise, Vignette } from '@react-three/postprocessing'
import Goose from './components/Goose.jsx'

const debug = window.location.hash === '#debug'

export default function App({
	count = 80,
	speed = 1.5,
	depth = 80,
	easing = x => (1 - (x - 1) ** 2) ** .5,
}) {
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
				<ScrollControls pages={4}>
					{Array.from({ length: count }, (_, i) => (
						<Goose
							key={i}
							index={i}
							z={-Math.round(easing(i / count) * depth)}
							speed={speed}
							depth={depth}
						/>
					))}
				</ScrollControls>
			</Suspense>
			<EffectComposer multisampling={0}>
				<DepthOfField
					target={[0, 0, .5 * depth]}
					focalLength={.5}
					bokehScale={12}
					height={700}
				/>
				{/* <Noise premultiply opacity={.5} /> */}
				{/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
			</EffectComposer>
			{debug && (
				<>
					<Stats showPanel={0} />
					{/* <OrbitControls
						target={[0, 0, -depth / 2]}
						// minAzimuthAngle={-Math.PI / 8}
						// maxAzimuthAngle={Math.PI / 8}
					/> */}
				</>
			)}
		</Canvas>
	)
}