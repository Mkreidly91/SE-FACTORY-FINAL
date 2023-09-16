import { Suspense, useEffect, useState } from 'react';
import ImageSlider from '../../../components/Common/ImageSlider/ImageSlider';
import ObjectViewer from '../../sample3d/ObjectViewer';
import V360 from '../../sample3d/V360.tsx';
import PanoEditor from '../../sample3d/PanoEditor.tsx';

const MarkersAndHotspots = ({ initialState }) => {
  const objectUrl = initialState.url;
  const panoramas = initialState.panoramas;

  const images = initialState.panoramas.map((e) => e.url);
  const [selected, setSelected] = useState(1);
  return (
    <Suspense>
      <div className="w-full ">
        <div className="mt-20 w-full">
          <div className="mb-10">
            {objectUrl && <ObjectViewer url={initialState.url} />}
          </div>

          <div className="w-[80%] m-auto ">
            {initialState && initialState.panoramas && (
              <PanoEditor
                projectId={initialState._id}
                id={initialState.panoramas[1]._id}
                initialPanoramas={initialState.panoramas}
              />
            )}
          </div>
          {images && (
            <ImageSlider
              images={images}
              imageCardStyles="aspect-[16/9] h-auto"
              onClick={() => {}}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default MarkersAndHotspots;
