import './Arrow.css';
import EditIcon from '@mui/icons-material/Edit';
interface hotSpotProps {
  yaw: Number | String;
  pitch: Number | String;
  onClick?: () => void;
  scale?: string;
  className?: String;
  edit?: boolean;
  info?: string;
  onEditClick?: () => void;
}

const Arrows = ({
  yaw,
  pitch,
  onClick,
  className,
  info,
  scale = '1',
  edit,
  onEditClick,
}: hotSpotProps) => {
  return (
    <div
      className={`view360-hotspot cursor-pointer ${className}  `}
      data-yaw={yaw}
      data-pitch={pitch}
      onClick={onClick}
    >
      <div className="flex flex-col justify-between  text-xs items-center">
        <div className="flex items-center p-2 gap-2 bg-white rounded max-w-[200px]   whitespace-normal">
          <span className=" break-words overflow-auto ">{info || ''}</span>
          {edit && (
            <EditIcon
              className=" w-full h-full hover:text-blue-500"
              sx={{ color: 'black', fontSize: '1.2rem' }}
              onClick={(e) => {
                e.stopPropagation();
                onEditClick && onEditClick();
              }}
            />
          )}
        </div>

        <div className="arrows-container flex items-center  ">
          <div
            style={{ transform: `scale(${scale})`, color: 'red' }}
            className={`arrows mt-10 `}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Arrows;
