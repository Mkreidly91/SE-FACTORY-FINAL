import { Suspense } from 'react';
import ImageSlider from '../../../components/Common/ImageSlider/ImageSlider';
import ObjectViewer from '../../sample3d/ObjectViewer';
import V360 from '../../sample3d/V360.tsx';
import PanoEditor from '../../sample3d/PanoEditor.tsx';

const MarkersAndHotspots = ({ initialState }) => {
  const objectUrl = initialState.url;
  // const imageUrl = initialState.apartments[0].panoramas[0].url;
  const panoramas = initialState.panoramas.map((e) => e.url);
  console.log(initialState);
  return (
    <>
      <Suspense>
        <div className="mt-20">
          {objectUrl && <ObjectViewer url={initialState.url} />}
          <div className="w-[70%] m-auto ">
            <V360 image={''} />
          </div>
          {panoramas && (
            <ImageSlider
              images={panoramas}
              imageCardStyles="aspect-[16/9] h-auto"
            />
          )}
        </div>
        <div className="w-[70%] m-auto ">
          {panoramas && initialState.panoramas && (
            <PanoEditor
              initial={initialState.panoramas[1]}
              panoramas={initialState.panoramas}
            />
          )}
        </div>
      </Suspense>
    </>
  );
};

export default MarkersAndHotspots;
