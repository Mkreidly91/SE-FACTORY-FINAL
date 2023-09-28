import {
  ContactShadows,
  Environment,
  MeshDistortMaterial,
  OrbitControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function Wobble() {
  return (
    <Canvas>
      <mesh position={[0, 0, 0]} rotation={[0, 10, 0]} scale={1.7}>
        <sphereGeometry attach={'geometry'} args={[1, 64, 64]} />

        <MeshDistortMaterial
          attach="material"
          speed={3}
          color={'black'}
          envMapIntensity={0.4}
          clearcoat={0.4}
          clearcoatRoughness={0}
          metalness={0.1}
        />
      </mesh>

      <OrbitControls enableZoom={false} />

      <Environment preset="warehouse" />
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1.6, 0]}
        opacity={0.8}
        width={15}
        height={15}
        blur={2.5}
        far={1.6}
      />
    </Canvas>
  );
}

export default Wobble;
