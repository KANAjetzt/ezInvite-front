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

const rotateImg = async (sourceImage) => {
  reader.readAsDataURL(sourceImage);

  const img = new Image();

  const result = await asyncFileRead(reader);

  img.src = result;

  await asyncImgOnLoad(img);

  // create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // make canvas the size of the image
  canvas.width = img.height;
  canvas.height = img.width;

  // rotate the context bei 90 degrees
  ctx.rotate((90 * Math.PI) / 180);
  // translate the context (x: 0, y: -theHeightOfTheImage) to put the center(0,0) back in the canvas top left
  // Visualized here: https://codepen.io/kanajetzt/pen/BaKeowQ
  ctx.translate(0, img.height * -1);
  // draw the image to the rotated and translated context
  ctx.drawImage(img, 0, 0);

  const blob = await asyncCanvasBlob(ctx.canvas);

  const file = new File([blob], sourceImage.name, {
    type: "image/png",
    lastModified: Date.now(),
  }); //output image as a file

  const dataUrl = canvas.toDataURL();

  return [file, dataUrl];
};

export default rotateImg;
