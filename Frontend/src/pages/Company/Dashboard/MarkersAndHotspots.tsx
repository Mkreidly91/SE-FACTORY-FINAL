import { Suspense, useEffect, useState } from 'react';
import ImageSlider from '../../../components/Common/ImageSlider/ImageSlider';
import ObjectViewer from '../../sample3d/ObjectViewer';
import V360 from '../../sample3d/V360.tsx';
import PanoEditor from '../../sample3d/PanoEditor.tsx';
import UploadButton from '../../../components/Common/UploadButton.tsx';
import { addApartment, deleteApartment } from '../../../api/company.api.ts';
import Button from '../../../components/Common/Button.tsx';
import ApiErrorHandler from '../../../components/Common/ApiError.tsx';
import { ApiError } from '../../../api/api.helpers.ts';

const MarkersAndHotspots = ({ initialState }) => {
  const objectUrl = initialState.url;
  const [model, setModel] = useState(initialState.url);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    setIsEmpty(Boolean(model));
  }, [model]);

  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      const res = await addApartment(initialState._id, e.target.files);
      setModel(res);
    }
  };

  const handleDelete = async () => {
    const res = await deleteApartment(initialState._id);
    if (res === 200) {
      setModel('');
      if (error) {
        setError(undefined);
      }
    } else if (res?.error) {
      setError(res.error);
    }
  };
  return (
    <Suspense>
      <div className="w-full ">
        <div className=" w-full mt-20 pb-20">
          {error && <ApiErrorHandler error={error} />}
          <div className="mb-10 relative ">
            {!model ? (
              <div className=" flex items-center justify-center w-[80%] h-[500px] min-h-[50vh]  mx-auto   ">
                <div className="flex flex-col gap-5 items-center justify-center w-full h-full border-4 rounded-md border-gray-500 border-dashed  ">
                  <span>No 3D model present click on upload</span>
                  <UploadButton
                    className="w-fit cursor-pointer text-center  "
                    text={'Upload'}
                    accept="*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            ) : (
              <div className=" w-[80%] h-[500px] min-h-[50vh]  mx-auto ">
                <div className="flex flex-col gap-5 absolute left-[11%] top-[10px]">
                  <UploadButton
                    className="w-fit  cursor-pointer z-10  "
                    text={'Replace'}
                    accept="*"
                    onChange={handleFileChange}
                  />
                  <Button
                    className=" px-2 py-3 rounded-md bg-red-800 text-white text-sm z-10"
                    text="Delete"
                    onClick={() => handleDelete()}
                  />
                </div>

                <ObjectViewer url={model} />
              </div>
            )}
          </div>

          <div className="w-[80%] m-auto ">
            <PanoEditor isEdit />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default MarkersAndHotspots;
