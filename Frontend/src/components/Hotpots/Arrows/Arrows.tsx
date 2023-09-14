import './Arrow.css';
interface hotSpotProps {
  yaw: Number | String;
  pitch: Number | String;
  onClick?: () => void;
  scale?: string;
  className?: String;
}

const Arrows = ({
  yaw,
  pitch,
  onClick,
  className,
  scale = 1,
}: hotSpotProps) => {
  return (
    <div
      className={`view360-hotspot  text-red-400 cursor-pointer ${className}  `}
      data-yaw={yaw}
      data-pitch={pitch}
      onClick={onClick}
    >
      <div style={{ transform: `scale(${scale})` }} className={`arrows `}></div>
    </div>
  );
};

export default Arrows;
