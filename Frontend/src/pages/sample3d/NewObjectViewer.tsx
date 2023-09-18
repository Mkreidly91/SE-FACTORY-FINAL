import React, { useState, useEffect, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import {
  Html,
  OrbitControls,
  OrthographicCamera,
  useGLTF,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export const NewObjectViewer = ({
  url,
  zoom = 50,
  position = [60, 60, 60],
  className,
}: {
  url: string;
  zoom?: number;
  position?: number[];
  className?: string;
}) => {
  const m: any = useGLTF(url);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Initial call to setContainerSize
    handleResize();

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const aspect = containerSize.width / containerSize.height;

  const d = 60;
  const camera = useMemo(() => {
    const camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      1,
      1000
    );
    camera.position.set(60, 60, 60);
    camera.zoom = zoom;
    return camera;
  }, [position, zoom]);
  // Calculate a scale factor based on the container size
  const scaleFactor = Math.min(
    containerSize.width / 500,
    containerSize.height / 500
  );

  return (
    <div className={`w-[80%] h-[500px] mx-auto ${className}`}>
      {m && (
        <Canvas
          className=" h-full bg-transparent rounded-md"
          frameloop="demand"
          dpr={window.devicePixelRatio}
          camera={camera}
          resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
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

          <OrbitControls
            zoom0={zoom}
            makeDefault
            target={[0, 0, 0]}
            camera={camera}
            autoRotate
          />

          <Suspense>
            {m && (
              <group scale={[scaleFactor, scaleFactor, scaleFactor]}>
                <primitive object={m.scene} />
              </group>
            )}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};
