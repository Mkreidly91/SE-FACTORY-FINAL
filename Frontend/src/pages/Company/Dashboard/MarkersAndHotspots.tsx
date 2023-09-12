import { Suspense } from 'react';
import ImageSlider from '../../../components/Common/ImageSlider/ImageSlider';
import ObjectViewer from '../../sample3d/ObjectViewer';
import V360 from '../../sample3d/V360';

const MarkersAndHotspots = ({ initialState }) => {
  const objectUrl = initialState.apartments[0].url;
  const imageUrl = initialState.apartments[0].panoramas[0].url;
  const panoramas = initialState.apartments[0].panoramas.map((e) => e.url);
  console.log(objectUrl);
  console.log(initialState);
  return (
    <Suspense>
      <div className="mt-20">
        {objectUrl && <ObjectViewer url={initialState.apartments[0].url} />}
        {imageUrl && (
          <V360 image={initialState.apartments[0].panoramas[0].url} />
        )}
        {panoramas && (
          <ImageSlider
            images={panoramas}
            imageCardStyles="aspect-[16/9] h-auto"
          />
        )}
      </div>
    </Suspense>
  );
};

export default MarkersAndHotspots;
