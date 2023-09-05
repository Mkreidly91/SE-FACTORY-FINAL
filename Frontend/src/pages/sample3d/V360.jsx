import React, { useEffect, useMemo, useState, useRef } from 'react';
import View360, { ControlBar, EquirectProjection } from '@egjs/react-view360';
import '@egjs/react-view360/css/view360.min.css';
import img from './panorama.jpg';
import Arrows from '../../components/Hotpots/Arrows/Arrows';
import Button from '../../components/Common/Button';
import AdjustIcon from '@mui/icons-material/Adjust';

const V360 = ({ image }) => {
  const [position, setPosition] = useState({
    yaw: 110,
    pitch: -30,
  });

  const [sofaInfo, setSofaInfo] = useState(false);
  const [hotspots, setHotspot] = useState([]);
  const [state, setState] = useState([]);
  const imgUrl = new URL('./panorama.jpg', import.meta.url).href;
  const plugin = useMemo(() => {
    return new ControlBar({ fullscreenButton: true });
  }, []);

  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: image,
      }),
    [image]
  );
  const viewRef = useRef();

  // Refresh Hotspots for hotspot changes
  useEffect(() => {
    viewRef.current.hotspot.refresh();
    viewRef.current.hotspot.render(viewRef.current.camera);
  }, [hotspots]);

  return (
    <View360
      plugins={[plugin]}
      ref={viewRef}
      className="is-16by9 "
      projection={projection}
      hotspot={{
        zoom: true,
      }}
    >
      <div className="absolute w-fit h-fit flex items-center justify-center  top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%]">
        <AdjustIcon />
      </div>

      <Button
        text="set Marker"
        s
        className="absolute top-1 left-1 bg-white"
        onClick={() => {
          setHotspot((prev) => [
            <Arrows
              yaw={viewRef.current?.camera.yaw}
              pitch={viewRef.current?.camera.pitch}
            />,
            ...prev,
          ]);
        }}
      />

      <div className="view360-hotspots">
        <Arrows yaw={'0'} pitch={'0'} />
        {hotspots}
        <div
          className="view360-hotspot text-red-400 "
          data-yaw={position.yaw}
          data-pitch={position.pitch}
        >
          <span
            onClick={() => setSofaInfo((prev) => !prev)}
            className="p-5 bg-black rounded-full"
          >
            Ikea sofa
          </span>
          {sofaInfo && (
            <span className="p-5 bg-white">price: $500 color: Beige</span>
          )}
        </div>
      </div>
    </View360>
  );
};

export default V360;
