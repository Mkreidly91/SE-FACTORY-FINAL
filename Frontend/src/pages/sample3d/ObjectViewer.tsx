import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import React, { useState, useEffect, FC, Suspense, useRef } from 'react';
import * as THREE from 'three';

export const ObjectViewer = ({ url }: { url: string }) => {
  const m: any = useGLTF(url);
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
  camera.position.set(60, 60, 60);
  camera.zoom = 50;

  return (
    <div className="w-[80%] h-[500px] mx-auto ">
      {m && (
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
          {/* <spotLight color="yellow" position={[0, 0, 0]} /> */}

          <OrbitControls makeDefault target={[0, 2, 0]} />
          <Suspense>
            {m && (
              <primitive
                onPointerDown={(e) => {
                  //   placeMarker(e);
                }}
                object={m.scene}
              >
                {/* {children} */}
              </primitive>
            )}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default ObjectViewer;
