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

const rotateImg = async (sourceImage, clockwise = false) => {
  reader.readAsDataURL(sourceImage);

  const img = new Image();

  const result = await asyncFileRead(reader);

  img.src = result;

  await asyncImgOnLoad(img);

  // const canvas = document.createElement("canvas");
  const canvas = document.getElementById("testCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((180 * Math.PI) / 180);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.restore();

  const blob = await asyncCanvasBlob(ctx.canvas);

  const file = new File([blob], sourceImage.name, {
    type: "image/png",
    lastModified: Date.now(),
  }); //output image as a file

  const dataUrl = canvas.toDataURL();

  return [file, dataUrl];
};

export default rotateImg;
