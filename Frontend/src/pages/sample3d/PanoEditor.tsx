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
import {
  addHotspot,
  deleteHotspot,
  editHotspot,
  getPanoramaById,
  getProjectById,
} from '../../api/company.api';
import { useParams } from 'react-router-dom';

export interface IPanorama {
  _id: string;
  url: string;
  marker?: any;
  hotspots?: any[];
}
export interface IHotspot {
  _id: string;
  link: string;
  info: string;
}

const PanoEditor = ({
  id,
  initialPanoramas,
}: {
  id: string;
  initialPanoramas: IPanorama[];
}) => {
  const { id: projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      const fetchInfo = async () => {
        const res = await getProjectById(projectId);
        setPanoramas(res.panoramas);
        if (id) {
          setState(res.panoramas.find((e) => e._id === id));
        } else {
          setState(res.panoramas[0]);
        }
      };
      fetchInfo();
    }
  }, [projectId, id]);

  const [state, setState] = useState() as any;
  const [panoramas, setPanoramas] = useState(initialPanoramas);
  const [selectedHotspot, setSelectedHotspot] = useState<IHotspot>();
  const [isOpen, setOpen] = useState(false);

  console.log(state);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

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

  const viewRef = useRef() as any;

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current?.hotspot?.refresh();
      viewRef.current?.hotspot?.render(viewRef.current?.camera);
    }
  }, [state, state?.hotspots, viewRef?.current]);

  const handleAddHotspot = async (fields) => {
    if (viewRef.current.camera) {
      const yaw = viewRef.current.camera.yaw;
      const pitch = viewRef.current.camera.pitch;
      const res = await addHotspot(projectId, state?._id, {
        ...fields,
        yaw,
        pitch,
      });
      if (res) {
        toggleDrawer();
        setSelectedHotspot(undefined);
        setState((prev: any) => ({ ...prev, hotspots: res }));
      }
    }
  };

  const handleDeleteHotspot = async () => {
    const [status, data] = await deleteHotspot(
      projectId,
      state?._id,
      selectedHotspot?._id
    );
    if (status === 200) {
      toggleDrawer();
      setSelectedHotspot(undefined);
      setState((prev: any) => ({ ...prev, hotspots: data }));
    }
  };

  const handleEditHotspot = async (fields: Partial<IHotspot>) => {
    if (projectId && selectedHotspot) {
      const res = await editHotspot(
        projectId,
        state?._id,
        selectedHotspot?._id,
        fields
      );
      if (res) {
        setState((prev: any) => ({ ...prev, hotspots: res }));
      }
    }
  };

  const onHotSpotChange = async (h: IHotspot) => {
    if (projectId) {
      const newPanorama = await getPanoramaById(projectId, h.link);
      setState(newPanorama);
    }
  };
  return (
    state &&
    panoramas && (
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
            toggleDrawer();
            setSelectedHotspot(undefined);
          }}
        />
        {isOpen && (
          <div
            onClick={() => toggleDrawer()}
            className="form-cancel absolute top-0 left-0 w-full h-full  z-30 bg-black opacity-50"
          ></div>
        )}
        <div
          className={`bg-white bg-transparent flex items-end h-full w-[30%] max-w-[300px] p-5 absolute z-50 left-0 top-0 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <HotspotForm
            selectedHotspot={selectedHotspot}
            setOpen={setOpen}
            isOpen={isOpen}
            panoramas={panoramas.filter((e) => e._id !== state._id)}
            addAction={async (data) => handleAddHotspot(data)}
            deleteAction={async (data) => handleDeleteHotspot(data)}
            editAction={async (data) => handleEditHotspot(data)}
          />
        </div>

        <div className="view360-hotspots">
          {state.hotspots &&
            state.hotspots?.map((h: any) => (
              <Arrows
                yaw={h.yaw}
                pitch={h.pitch}
                info={h.info}
                edit
                onEditClick={() => {
                  setSelectedHotspot(h);
                  toggleDrawer();
                }}
                onClick={async () => {
                  onHotSpotChange(h);
                }}
              />
            ))}
        </div>
      </View360>
    )
  );
};

export default PanoEditor;
