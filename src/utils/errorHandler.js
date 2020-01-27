const getAllIndexes = (arr, searched) => {
  const indexes = [];
  arr.forEach((el, i) =>
    el.message === searched ? (indexes = [...indexes, i]) : null
  );
  return indexes;
};

const removeMessages = indexArr => {
  indexArr.forEach(index => $appStore.messages.splice(index, 1));
  // Make it reakt --> https://svelte.dev/tutorial/updating-arrays-and-objects
  $appStore.messages = $appStore.messages;
};

const handleError = (value, type, location, message) => {
  if (!value) {
    $appStore.messages = [
      ...$appStore.messages,
      {
        type: type,
        location: location,
        message: message
      }
    ];
    return;
  } else {
    const indexes = getAllIndexes($appStore.messages, location);
    removeMessages(indexes);
  }
};

export default handleError;
