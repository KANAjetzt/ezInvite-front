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

const compressImg = async (sourceImage, newWidth, newHeight) => {
  reader.readAsDataURL(sourceImage);

  const img = new Image();

  const result = await asyncFileRead(reader);

  img.src = result;

  const canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;

  const ctx = canvas.getContext("2d");

  await asyncImgOnLoad(img);

  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  const blob = await asyncCanvasBlob(ctx.canvas);

  const file = new File([blob], sourceImage.name, {
    type: "image/png",
    lastModified: Date.now(),
  }); //output image as a file

  return file;
};

export default compressImg;
