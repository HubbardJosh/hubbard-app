const getOrderByType = (type: string) => {
  switch (type) {
    case "Default":
      return 1;
    case "English":
      return 2;
    case "Japanese":
      return 3;
  }

  return 99;
};

const animeUtil = { getOrderByType };

export { animeUtil };
