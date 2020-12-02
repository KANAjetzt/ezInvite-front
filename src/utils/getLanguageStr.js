const getLanguageStr = (languages, id) => {
  // filter out the string with the desired ID
  const strArr = languages.filter(str => str.ID === id);
  // return only the string value of the object
  return strArr[0].str;
};

export default getLanguageStr