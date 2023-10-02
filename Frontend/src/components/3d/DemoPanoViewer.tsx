import React, { useEffect, useMemo, useState, useRef, RefObject } from 'react';
import View360, {
  ControlBar,
  EquirectProjection,
  LoadingSpinner,
} from '@egjs/react-view360';
import '@egjs/react-view360/css/view360.min.css';
import Arrows from '../hotpots/arrows/Arrows';
import '@egjs/react-view360/css/view360.min.css';
import '@egjs/view360/css/loading-spinner.min.css';
import bedroom from '../../assets/images/Demo/bedroom.jpeg';
import spa from '../../assets/images/Demo/spa.jpg';
import salon from '../../assets/images/Demo/panorama.jpg';

const V360 = ({ className }: { className: string }) => {
  const panoramas = [
    {
      image: salon,
      hotspots: [
        { text: 'Spa', yaw: '357', pitch: '1.9', link: 2 },
        { text: 'Bedroom', yaw: '22', pitch: '5.5', link: 1 },
      ],
    },

    {
      image: bedroom,
      hotspots: [{ text: 'Salon', yaw: '100.46', pitch: '-3.35', link: 0 }],
    },

    {
      image: spa,
      hotspots: [{ text: 'Salon', yaw: 180, pitch: -7, link: 0 }],
    },
  ];

  const [p, setP] = useState(0);

  const plugin = useMemo(() => {
    return new ControlBar({ fullscreenButton: true });
  }, []);
  const spinner = useMemo(() => {
    return new LoadingSpinner();
  }, []);

  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: panoramas[p].image,
      }),
    [p]
  );

  const viewRef = useRef<View360 | null>();

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current?.hotspot?.refresh();
      viewRef.current?.hotspot?.render(viewRef.current?.camera);
    }
  }, [p, viewRef?.current, viewRef?.current?.camera?.yaw]);

  return (
    <View360
      plugins={[plugin, spinner]}
      ref={viewRef}
      className={`is-16by9 ${className} focus:outline-none`}
      projection={projection}
      hotspot={{
        zoom: true,
      }}
    >
      <div className="view360-hotspots">
        {panoramas[p].hotspots &&
          panoramas[p].hotspots.map((e: any) => (
            <Arrows
              key={e.yaw}
              yaw={e.yaw}
              pitch={e.pitch}
              info={e.text}
              onClick={() => {
                setP(e.link);
              }}
            />
          ))}
      </div>
    </View360>
  );
};

export default V360;
