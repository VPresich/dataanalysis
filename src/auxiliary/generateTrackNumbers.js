const generateTrackNumbers = (length) => {
  return [
    "All",
    ...Array.from({ length }, (_, index) => (index + 1).toString()),
  ];
};

export default generateTrackNumbers;
