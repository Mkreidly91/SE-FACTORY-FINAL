import { useEffect, useMemo, useState, useRef } from 'react';
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
import HotspotForm from '../../components/Forms/HotspotForm';
import {
  addHotspot,
  addPanorama,
  deleteHotspot,
  deletePanorama,
  editHotspot,
  getProjectById,
} from '../../api/company.api';
import { useParams } from 'react-router-dom';
import ImageSlider from '../../components/Common/ImageSlider/ImageSlider';
import UploadButton from '../../components/Common/UploadButton';

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
  const { id: projectId } = useParams() as any;

  async function getPanoramas(projectId?: string, panoramaId = null) {
    if (!projectId) return;
    const res = await getProjectById(projectId);
    setSelectedHotspot(undefined);
    setPanoramas(res.panoramas);

    const check = res.panoramas.find((e: IPanorama) => e._id === panoramaId);
    if (check) {
      setPanoramaId(panoramaId);
    } else {
      if (res.panoramas.length > 0) setPanoramaId(res.panoramas[0]._id);
    }
  }
  useEffect(() => {
    getPanoramas(projectId);
  }, [projectId]);

  const [panoramaId, setPanoramaId] = useState() as any;
  const [panoramas, setPanoramas] = useState<any[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<IHotspot>();

  const [isOpen, setOpen] = useState(false);
  const viewRef = useRef() as any;

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

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current?.hotspot?.refresh();
      viewRef.current?.hotspot?.render(viewRef.current?.camera);
    }
  }, [selectedPanorama, selectedPanorama?.hotspots, viewRef?.current]);

  const handleAddHotspot = async (fields: any) => {
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
    if (selectedHotspot && selectedHotspot._id) {
      const status = await deleteHotspot(
        projectId,
        selectedPanorama._id,
        selectedHotspot._id
      );
      if (status === 200) {
        toggleDrawer();
        getPanoramas(projectId, panoramaId);
      }
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
  return panoramas.length > 0 && panoramaId ? (
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
          {panoramas.length === 0 ? (
            <span className="text-3xl w-full text-center">
              Please Add a panoramic Image
            </span>
          ) : (
            <AdjustIcon />
          )}
        </div>
      )}

      {isEdit && (
        <div className=" absolute top-2 left-2 flex flex-col gap-5">
          <Button
            text="Add Hotspot"
            className=" bg-white px-2 py-3 rounded-md button-gradient text-white text-sm text-center"
            onClick={() => {
              toggleDrawer();
              setSelectedHotspot(undefined);
            }}
          />
          <UploadButton
            className=""
            text="Add Panorama"
            accept="image/png, image/jpeg"
            onChange={async (e) => {
              const firstFile = e?.target?.files?.[0];
              if (firstFile) {
                const res = await addPanorama(projectId, e.target.files);
                if (res) {
                  getPanoramas(projectId, panoramaId);
                }
              }
            }}
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
        {selectedPanorama &&
          selectedPanorama.hotspots?.map((h: any) => (
            <Arrows
              key={h.link}
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
          onDelete={
            isEdit &&
            (async (id: string) => {
              const res = await deletePanorama(projectId, id);
              if (res) {
                getPanoramas(projectId, panoramaId);
              }
            })
          }
        />
      </div>
    </View360>
  ) : (
    isEdit && (
      <UploadButton
        text="Add Panorama"
        accept="image/png, image/jpeg"
        onChange={async (e) => {
          const firstFile = e?.target?.files?.[0];
          if (firstFile) {
            const res = await addPanorama(projectId, e.target.files);
            if (res) {
              getPanoramas(projectId, panoramaId);
            }
          }
        }}
      />
    )
  );
};

export default PanoEditor;
