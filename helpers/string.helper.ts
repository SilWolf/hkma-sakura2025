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

export const renderMatchCode = (code: string) => {
  try {
    const [round, extendedRound] = code
      .split(".")
      .map((value) => parseInt(value));

    let title = "";
    if (round >= 1 && round <= 4) {
      title += "東";
    } else if (round >= 5 && round <= 8) {
      title += "南";
    } else if (round >= 9 && round <= 12) {
      title += "西";
    } else if (round >= 13 && round <= 16) {
      title += "北";
    }

    title += `${round}局`;

    if (extendedRound > 0) {
      title += `${extendedRound}本場`;
    }

    return title;
  } catch (_) {
    return "-";
  }
};

export const renderMatchResultType = (type: string) => {
  if (type === "exhausted") {
    return "流局";
  }

  return " ";
};
