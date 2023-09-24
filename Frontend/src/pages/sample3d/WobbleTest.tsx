// import React, { Suspense, useEffect, useState, useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';

import { fabClasses } from '@mui/material';
import {
  Bounds,
  Box,
  ContactShadows,
  Environment,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  OrbitControls,
  Sphere,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  MotionConfig,
  animate,
  useAnimate,
  useAnimation,
  useSpring,
} from 'framer-motion';
import { MotionCanvas, motion } from 'framer-motion-3d';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function Wobble() {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas>
      <MotionConfig
        transition={{ type: 'spring', mass: 2, tension: 1000, friction: 10 }}
      >
        <motion.mesh
          position={[0, 0, 0]}
          // whileHover={{ scale: 2, color: 'yellow' }}
          initial={{ color: 'red', scale: 2 }}
          transition={{ type: 'spring' }}
          rotation={[0, 10, 0]}
          onPointerOver={() => {
            setHovered(true);
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onPointerOut={() => {
            setHovered(false);
          }}
        >
          <sphereGeometry attach={'geometry'} args={[1, 64, 64]} />

          <MeshDistortMaterial
            attach="material"
            // speed={hovered ? 3 : 2}
            speed={3}
            // color={!hovered ? '#e3dac9' : 'black'}
            color={'black'}
            envMapIntensity={0.4}
            clearcoat={0.4}
            clearcoatRoughness={0}
            metalness={0.1}
          />
        </motion.mesh>

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
      </MotionConfig>
    </Canvas>
  );
}

export default Wobble;
