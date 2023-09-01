import './Arrow.css';
interface hotSpotProps {
  yaw: Number;
  pitch: Number;
  onClick?: () => void;
  className: String;
}

const Arrows = ({ yaw, pitch, onClick, className }: hotSpotProps) => {
  return (
    <div
      className={`view360-hotspot arrows text-red-400 cursor-pointer ${className}`}
      data-yaw={yaw}
      data-pitch={pitch}
    ></div>
  );
};

export default Arrows;
