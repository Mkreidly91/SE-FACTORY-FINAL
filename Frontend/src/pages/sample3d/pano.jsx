import Marzipano, { Scene } from 'marzipano';
import { useEffect, useRef } from 'react';
import img from './panorama.jpg';
import type from 'marzipano/src/util/type';
const Pano = () => {
  const w = useRef();
  useEffect(() => {
    if (w.current) {
      var viewerOpts = {
        controls: {
          mouseViewMode: 'drag', // drag|qtvr
        },
      };
      var viewer = new Marzipano.Viewer(w.current, viewerOpts);
      const geometry = new Marzipano.EquirectGeometry([{ width: 8000 }]);

      var source = Marzipano.ImageUrlSource.fromString(img);
      // var limiter = Marzipano.RectilinearView.limit.traditional(
      //   1024,
      //   (100 * Math.PI) / 180
      // );
      // var view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);
      var view = new Marzipano.RectilinearView();
      var scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true,
      });
      console.log(scene);
      scene.switchTo({
        transitionDuration: 1000,
      });
    }
  }, [w.current]);

  console.log(w);
  return <div className="pano-container w-full h-full border" ref={w}></div>;
};

export default Pano;
