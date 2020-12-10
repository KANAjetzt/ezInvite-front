// location: "de-DE" / en-US
export const formatDate = (date, location) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Wenn ISO String Uhrzeit hat
  return `${new Date(date).toLocaleDateString(location, options)}`;
};
