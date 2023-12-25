export const renderRanking = (i: number) => {
  if (i === 1) {
    return "1st";
  } else if (i === 2) {
    return "2nd";
  } else if (i === 3) {
    return "3rd";
  }

  return `${i}th`;
};
