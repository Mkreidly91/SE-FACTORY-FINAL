import { Suspense } from 'react';
import ImageSlider from '../../../components/Common/ImageSlider/ImageSlider';
import ObjectViewer from '../../sample3d/ObjectViewer';
import V360 from '../../sample3d/V360.tsx';

const MarkersAndHotspots = ({ initialState }) => {
  const objectUrl = initialState.apartments[0].url;
  // const imageUrl = initialState.apartments[0].panoramas[0].url;
  const panoramas = initialState.apartments[0].panoramas.map((e) => e.url);

  return (
    <>
      <Suspense>
        <div className="mt-20">
          {objectUrl && <ObjectViewer url={initialState.apartments[0].url} />}
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
      </Suspense>
    </>
  );
};

export default MarkersAndHotspots;
