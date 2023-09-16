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
import ImageSlider from '../../components/Common/ImageSlider/ImageSlider';
import { AddAPhoto, AddAPhotoOutlined } from '@mui/icons-material';

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

const PanoEditor = ({ isEdit = false }: { isEdit: boolean }) => {
  const { id: projectId } = useParams();

  async function getPanoramas(projectId: string, panoramaId = null) {
    const res = await getProjectById(projectId);
    setSelectedHotspot(undefined);
    setPanoramas(res.panoramas);
    if (panoramaId) {
      setPanoramaId(panoramaId);
    } else {
      setPanoramaId(res.panoramas[0]._id);
    }
  }
  useEffect(() => {
    if (projectId) {
      getPanoramas(projectId);
    }
  }, [projectId]);

  const [panoramaId, setPanoramaId] = useState() as any;
  const [panoramas, setPanoramas] = useState<any[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<IHotspot>();

  const [isOpen, setOpen] = useState(false);
  const selectedPanorama = panoramas.find((e) => e._id === panoramaId);
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
    if (selectedPanorama) {
      return new EquirectProjection({
        src: selectedPanorama.url,
      });
    }
  }, [selectedPanorama]);

  const viewRef = useRef() as any;

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current?.hotspot?.refresh();
      viewRef.current?.hotspot?.render(viewRef.current?.camera);
    }
  }, [selectedPanorama, selectedPanorama?.hotspots, viewRef?.current]);

  const handleAddHotspot = async (fields) => {
    if (viewRef.current.camera) {
      const yaw = viewRef.current.camera.yaw;
      const pitch = viewRef.current.camera.pitch;
      const res = await addHotspot(projectId, selectedPanorama?._id, {
        ...fields,
        yaw,
        pitch,
      });
      if (res) {
        toggleDrawer();
        getPanoramas(projectId, panoramaId);
      }
    }
  };

  const handleDeleteHotspot = async () => {
    const [status, data] = await deleteHotspot(
      projectId,
      selectedPanorama?._id,
      selectedHotspot?._id
    );
    if (status === 200) {
      toggleDrawer();
      getPanoramas(projectId, panoramaId);
    }
  };

  const handleEditHotspot = async (fields: Partial<IHotspot>) => {
    if (projectId && selectedHotspot) {
      const res = await editHotspot(
        projectId,
        selectedPanorama?._id,
        selectedHotspot?._id,
        fields
      );
      if (res) {
        getPanoramas(projectId, panoramaId);
      }
    }
  };

  const onHotSpotChange = async (h: IHotspot) => {
    if (projectId) setPanoramaId(h.link);
  };
  return (
    selectedPanorama &&
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
        {isEdit && (
          <div className="absolute w-fit h-fit flex items-center justify-center  top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%]">
            <AdjustIcon />
          </div>
        )}

        {isEdit && (
          <div className=" absolute top-2 left-2 flex flex-col gap-5">
            <Button
              text="Add Hotspot"
              className=" bg-white px-2 py-3 rounded-md button-gradient text-white text-sm"
              onClick={() => {
                toggleDrawer();
                setSelectedHotspot(undefined);
              }}
            />
            <Button
              text="Add Panorama"
              className=" bg-white px-2 py-3 rounded-md button-gradient text-white text-sm"
              onClick={() => {}}
            />
          </div>
        )}
        {isOpen && (
          <div
            onClick={() => toggleDrawer()}
            className="form-cancel absolute top-0 left-0 w-full h-full  z-30 bg-black opacity-50"
          ></div>
        )}
        {isEdit && (
          <div
            className={`bg-white bg-transparent flex items-end h-full w-[30%] max-w-[300px] p-5 absolute z-50 left-0 top-0 transform ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out`}
          >
            <HotspotForm
              selectedHotspot={selectedHotspot}
              setOpen={setOpen}
              isOpen={isOpen}
              panoramas={panoramas.filter((e) => e._id !== panoramaId)}
              addAction={handleAddHotspot}
              deleteAction={handleDeleteHotspot}
              editAction={handleEditHotspot}
            />
          </div>
        )}

        <div className="view360-hotspots">
          {selectedPanorama.hotspots &&
            selectedPanorama.hotspots?.map((h: any) => (
              <Arrows
                yaw={h.yaw}
                pitch={h.pitch}
                info={h.info}
                edit={isEdit}
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

        <div className="absolute bottom-0 flex items-center gap-5 w-full">
          <ImageSlider
            className="w-full pb-0"
            panoramas={panoramas}
            imageCardStyles="aspect-[16/9] h-auto border-2 border-black rounded-md"
            onClick={setPanoramaId}
          />
        </div>
      </View360>
    )
  );
};

export default PanoEditor;
