import React, { useEffect, useMemo, useState, useRef } from 'react';
import View360, {
  ControlBar,
  EquirectProjection,
  LoadingSpinner,
} from '@egjs/react-view360';
import '@egjs/react-view360/css/view360.min.css';
import Arrows from '../../components/Hotpots/Arrows/Arrows';
import Button from '../../components/Common/Button';
import AdjustIcon from '@mui/icons-material/Adjust';
import '@egjs/react-view360/css/view360.min.css';
import '@egjs/view360/css/loading-spinner.min.css';
import def from './bedroom.jpeg';
import HotspotForm from '../../components/Forms/HotspotForm';
import { Drawer } from '@mui/material';

interface IPanorama {
  url: string;
  marker?: any;
  hotspots?: any[];
}
const PanoEditor = ({
  initial,
  panoramas,
}: {
  initial: IPanorama;
  panoramas: IPanorama[];
}) => {
  useEffect(() => {
    console.log(initial);
    setState(initial);
    setHotspots(hotspots);
  }, [initial]);

  const [hotspots, setHotspots] = useState<IPanorama | null>();

  const [state, setState] = useState(initial) as any;
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const [p, setP] = useState(def);
  const imgUrl = new URL(
    'https://vizi-bucket.s3.eu-west-1.amazonaws.com/27df8097-3fbf-4705-b592-8a9714036157.jpeg',
    import.meta.url
  ).href;

  const plugin = useMemo(() => {
    return new ControlBar({ fullscreenButton: true });
  }, []);

  const spinner = useMemo(() => {
    return new LoadingSpinner();
  }, []);

  const projection = useMemo(() => {
    if (state) {
      return new EquirectProjection({
        src: state.url,
      });
    }
  }, [state]);

  const viewRef = useRef();
  // Refresh Hotspots for hotspot changes
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current?.hotspot?.refresh();
      viewRef.current?.hotspot?.render(viewRef.current?.camera);
    }
  }, [hotspots, state]);

  return (
    state.url && (
      <View360
        plugins={[plugin, spinner]}
        ref={viewRef}
        className="is-16by9 rounded-md relative"
        projection={projection}
        hotspot={{
          zoom: true,
        }}
      >
        <div className="absolute w-fit h-fit flex items-center justify-center  top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%]">
          <AdjustIcon />
        </div>

        <Button
          text="Add Hotspot"
          className="absolute top-2 left-2 bg-white px-2 py-3 rounded-md button-gradient text-white text-sm"
          onClick={() => {
            // setHotspot((prev: any) => [
            //   <Arrows
            //     yaw={viewRef.current?.camera?.yaw}
            //     pitch={viewRef.current?.camera?.pitch}
            //   />,
            //   ...prev,
            // ]);
            toggleDrawer();
          }}
        />
        {open && (
          <div
            onClick={() => toggleDrawer()}
            className="form-cancel absolute top-0 left-0 w-full h-full  z-30 bg-black opacity-50"
          ></div>
        )}
        <div
          className={`button-gradient h-full w-[30%] max-w-[300px] p-5 absolute z-50 left-0 top-0 transform ${
            open ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <HotspotForm setOpen={setOpen} />
        </div>

        <div className="view360-hotspots">
          {state.hotspots?.map((h: any) => (
            <Arrows
              yaw={h.yaw}
              pitch={h.pitch}
              edit
              onClick={() => {
                setState((prev) => {
                  return panoramas.find((e) => e._id === h.link);
                });
              }}
            />
          ))}

          <Arrows
            yaw={'0'}
            pitch={'0'}
            onClick={() => {
              setP(new URL('./panorama.jpg', import.meta.url).href);
            }}
          />

          <Arrows
            yaw={'20'}
            pitch={'0'}
            onClick={() => {
              setP(new URL('./bedroom.jpeg', import.meta.url).href);
            }}
            scale={2}
          />

          {hotspots}
          {/* <div
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
          </div> */}
        </div>
      </View360>
    )
  );
};

export default PanoEditor;
