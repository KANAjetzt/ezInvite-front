// w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1586436644/

const handleImgSrc = (photo, mutation) => {
  // default img
  if (
    photo === null ||
    photo === undefined ||
    photo.split("/")[photo.split("/").length - 1] === "default.jpg"
  ) {
    return `${svelteEnv.frontUrl}/img/default.jpg`;
  }

  // data base64 stored img
  if (photo.startsWith("data:")) return photo;

  // cloudinary img
  return `${svelteEnv.cloudinaryUrl}${mutation ? mutation : ""}${photo}`;
};

export default handleImgSrc;
