import React, { useState } from 'react';
import { Button, Chip, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AddCircleRounded } from '@mui/icons-material';

interface FeatureBoxProps {
  features: string[];
  setFeatures: any;
  //  setFeatures: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>; // Define the type of setFeatures
  // setFeatures: React.Dispatch<React.SetStateAction<string[]>>; // Define the type of setFeatures
}

const FeatureBox = ({ features = [], setFeatures }: FeatureBoxProps) => {
  // const [tags, setFeatures] = useState([]) as any;
  const [text, setText] = useState('');

  function onDelete(t: string) {
    const newState = features.filter((e: any) => e !== t);
    setFeatures(newState);
  }

  function onAdd() {
    setFeatures([...features, text]);
    setText('');
  }

  function Tag({ text, onClick }: { text: string; onClick: () => void }) {
    return <Chip className="w-fit" label={text} onDelete={onClick} />;
  }
  return (
    <>
      <div className=" self-start flex flex-col gap-1 w-full">
        <label className=" font-semibold text-gray-600 text-sm">Features</label>
        <div className="flex gap-2 items-center">
          <TextField
            className="w-full grow"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={() => onAdd()} disabled={text.trim() ? false : true}>
            <AddCircleRounded />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {features &&
            features.map((t: string) => {
              return <Tag key={t} text={t} onClick={() => onDelete(t)} />;
            })}
        </div>
      </div>
    </>
  );
};

export default FeatureBox;
