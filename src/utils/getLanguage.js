const filterCurrentLanguage = (languagesArray, currentLanguage) => {
  return languagesArray.map((str) => {
    if (!str) return;
    if (currentLanguage === "en") {
      delete str.DE;
      str.str = str.EN;
      delete str.EN;
      return str;
    } else if (currentLanguage === "de") {
      delete str.EN;
      str.str = str.DE;
      delete str.DE;
      return str;
    }
  });
};

const fetchLanguages = async (currentLanguage) => {
  const response = await fetch("/languages.json");
  const data = await response.json();

  const filteredData = filterCurrentLanguage(data, currentLanguage);

  return filteredData;
};

export default fetchLanguages;
