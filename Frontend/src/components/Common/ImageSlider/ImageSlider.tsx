import './imageSlider.css';
const ImageCard = ({
  url,
  onClick,
  imageCardStyles,
}: {
  url: string;
  imageCardStyles?: string;
  onClick: () => void;
}) => {
  return (
    <div className={`inline-block `}>
      <img
        src={url}
        className={`w-[200px] h-auto aspect-video max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out ${imageCardStyles}`}
        onClick={() => onClick()}
      />
    </div>
  );
};

const ImageSlider = ({
  className,
  imageCardStyles,
  panoramas = [],
  onClick,
}: {
  className: string;
  imageCardStyles?: string;
  panoramas: any[];
  onClick: (id: string) => void;
}) => {
  return (
    <div
      className={`flex overflow-x-scroll pt-10 pb-10 hide-scroll-bar ${className}`}
    >
      <div className="flex gap-3 flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
        {panoramas &&
          panoramas.map((e) => (
            <ImageCard
              imageCardStyles={imageCardStyles}
              url={e.url}
              onClick={() => onClick(e._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageSlider;
