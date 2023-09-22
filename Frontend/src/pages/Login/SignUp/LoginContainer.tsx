import {
  Html,
  OrbitControls,
  Sparkles,
  Stars,
  useGLTF,
} from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import React, { useState, useEffect, FC, Suspense, useRef } from 'react';
import Wobble from '../../sample3d/WobbleTest';

import * as THREE from 'three';

const LoginContainer = () => {
  const aspect = window.innerWidth / window.innerHeight;
  const d = 60;
  const camera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    1,
    1000
  );
  camera.position.set(0, 0, 0);
  camera.zoom = 50;

  return (
    <div className="w-full h-full bg-white ">
      <Canvas
        className=" border border-black h-full bg-transparent rounded-md"
        frameloop="demand"
        camera={camera}
        dpr={window.devicePixelRatio}
      >
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} intensity={1} />
        {/* <directionalLight color="white" position={[5, 0, 5]} /> */}
        <pointLight intensity={2} position={[-10, 30, 20]} castShadow />
        <pointLight
          intensity={1}
          position={[20, 30, -10]}
          castShadow
          visible={true}
        />

        <OrbitControls
          makeDefault
          target={[0, 2, 0]}
          // rotateSpeed={1}
          autoRotate
          autoRotateSpeed={0.01}
        />

        <Suspense>
          <Wobble />

          {/* <Stars
            radius={50}
            depth={50}
            count={5000}
            factor={10}
            saturation={1000}
            fade
            speed={0.01}
          /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LoginContainer;
