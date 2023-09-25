import Atropos from 'atropos/react';
import 'atropos/css';

export default function Pan({
  className,
  img,
}: {
  className?: string;
  img?: any;
}) {
  return (
    <Atropos
      className={`${className}`}
      activeOffset={40}
      shadowScale={1.05}
      onEnter={() => console.log('Enter')}
      onLeave={() => console.log('Leave')}
      onRotate={(x, y) => console.log('Rotate', x, y)}
    >
      <img
        src={img}
        className=""
        style={{ margin: '0', marginLeft: '0' }}
        data-atropos-offset="-1"
      />
    </Atropos>
  );
}
