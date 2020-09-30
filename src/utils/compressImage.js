const reader = new FileReader();

const asyncCanvasBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      "image/png",
      0.7
    );
  });
};

const asyncFileRead = (reader) => {
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

const asyncImgOnLoad = (img) => {
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve();
    };
  });
};

const compressImg = async (sourceImage, newWidth) => {
  reader.readAsDataURL(sourceImage);

  const img = new Image();

  const result = await asyncFileRead(reader);

  img.src = result;

  await asyncImgOnLoad(img);

  // if img resolution is lower then compress with --> return sourceImage
  if (img.width <= newWidth) return sourceImage;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const scaleFactor = newWidth / img.width;

  canvas.width = newWidth;
  canvas.height = img.height * scaleFactor;

  ctx.drawImage(img, 0, 0, newWidth, img.height * scaleFactor);

  const blob = await asyncCanvasBlob(ctx.canvas);

  const file = new File([blob], sourceImage.name, {
    type: "image/png",
    lastModified: Date.now(),
  }); //output image as a file

  const dataUrl = canvas.toDataURL("image/jpeg", 0.2);

  return [file, dataUrl];
};

export default compressImg;
