const getRandomBGColor = () => {
  let val1 = Math.random() * 255;
  let val2 = Math.random() * 255;
  let val3 = Math.random() * 255;

  return `rgba(${val1}, ${val2}, ${val3}, 0.5)`;
};

const util = { getRandomBGColor };

export { util };
