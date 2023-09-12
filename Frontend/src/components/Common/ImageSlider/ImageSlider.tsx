import './imageSlider.css';
const ImageSlider = ({
  imageCardStyles,
  images = [],
  onClick,
}: {
  imageCardStyles?: string;
  images: string[];
  onClick: () => void;
}) => {
  const ImageCard = ({
    url,
    onClick,
  }: {
    url: string;
    onClick: () => void;
  }) => {
    return (
      <div className={` inline-block px-3 ${imageCardStyles}`}>
        <img
          src={url}
          className="w-[200px] h-auto aspect-video max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
        />
      </div>
    );
  };
  return (
    <div className="flex overflow-x-scroll pt-10 pb-10 hide-scroll-bar">
      <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
        {images && images.map((e) => <ImageCard url={e} onClick={onClick} />)}
      </div>
    </div>
  );
};

export default ImageSlider;
