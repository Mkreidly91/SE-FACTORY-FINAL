import './Arrow.css';
import EditIcon from '@mui/icons-material/Edit';
interface hotSpotProps {
  yaw: Number | String;
  pitch: Number | String;
  onClick?: () => void;
  scale?: string;
  className?: String;
  edit?: boolean;
}

const Arrows = ({
  yaw,
  pitch,
  onClick,
  className,
  scale = 1,
  edit,
}: hotSpotProps) => {
  return (
    <div
      className={`view360-hotspot cursor-pointer ${className}  `}
      data-yaw={yaw}
      data-pitch={pitch}
      onClick={onClick}
    >
      {/* <div className="  bottom-[180%] flex justify-center gap-2 left-[50%] translate-x-[-30%] text-xs p-2 text-black bg-white rounded border"> */}
      <div className="flex flex-col justify-between  text-xs items-center">
        <div className="flex items-center p-2 gap-2 bg-white rounded max-w-[200px]   whitespace-normal">
          <span className=" break-words overflow-auto ">bedroom</span>
          {edit && (
            <EditIcon
              className=""
              sx={{ color: 'black', fontSize: '1rem' }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>

        {/* </div> */}
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
