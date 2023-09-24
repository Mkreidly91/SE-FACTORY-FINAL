import { Bounds, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import React, { useState, useEffect, Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

export const ObjectViewer = ({
  url,
  className,
}: {
  url: string;
  className: string;
}) => {
  const [state, setState] = useState(0);
  const m: any = useGLTF(url);

  const model = useRef();
  const camera = useMemo(() => {
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

    return camera;
  }, [m.scene]);

  useEffect(() => {
    setTimeout(() => {
      setState(1);
    }, 200);
  }, []);

  return (
    <>
      {m && (
        <Canvas
          className={`
          border border-black h-full bg-transparent rounded-md ${className}`}
          frameloop="demand"
          camera={camera}
          dpr={window.devicePixelRatio}
        >
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[0, 0, 5]} intensity={1} />
          <pointLight intensity={2} position={[-10, 30, 20]} castShadow />
          <pointLight
            intensity={1}
            position={[20, 30, -10]}
            castShadow
            visible={true}
          />
          <OrbitControls enableZoom={false} makeDefault target={[0, 2, 0]} />

          <Suspense>
            {m.scene && (
              <Bounds fit clip observe margin={1.2} damping={1}>
                {state === 1 && (
                  <primitive scale={1} ref={model} object={m.scene} />
                )}
              </Bounds>
            )}
          </Suspense>
        </Canvas>
      )}
    </>
  );
};

export default ObjectViewer;
