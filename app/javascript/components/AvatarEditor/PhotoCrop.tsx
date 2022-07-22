import React, { FC, useState } from "react";
import PhotoCropper from "react-avatar-edit";

type Props = {
  callback: (value: any) => void
}

const borderStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: 'auto',
  borderStyle: 'dotted',
  borderWidth: '0.3rem',
  borderRadius: '0.3rem',
}

export const PhotoCrop: FC<Props> = ({ callback }) => {
  const [result, setResult] = useState<any>();
  const onCrop = (cropped: any) => {
    setResult(cropped);
    callback(result);
  };

  const onClose = () => {
    setResult(null);
  };

  const onBeforeFileLoad = (elem: any) => {
    if (elem.target.files[0].size > 1000000) {
      elem.target.value = "";
      alert("A imagem selecionada é grande de mais!")
    }
  };

  const dimention = 300;

  return (
    <PhotoCropper
      borderStyle={borderStyle}
      label="Escolha uma imagem"
      width={dimention}
      height={dimention}
      imageWidth={dimention}
      imageHeight={dimention}
      onCrop={(e) => onCrop(e)}
      onClose={() => onClose()}
      onBeforeFileLoad={onBeforeFileLoad}
    />
  );
};
