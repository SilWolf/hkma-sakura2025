export const renderRanking = (
  i: number | undefined | null | "1" | "2" | "3" | "4"
) => {
  if (typeof i === "undefined" || i === null) {
    return "-";
  }

  if (i === 1 || i === "1") {
    return "1st";
  } else if (i === 2 || i === "2") {
    return "2nd";
  } else if (i === 3 || i === "3") {
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

    title += `${((round - 1) % 4) + 1}局`;

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

export const renderPoint = (value: number | undefined | null) => {
  if (typeof value === "undefined" || value === null) {
    return "-";
  }

  if (value >= 0) {
    return `+${value.toFixed(1)}`;
  }

  return `▲${Math.abs(value).toFixed(1)}`;
};

export const renderScore = (value: number | undefined | null) => {
  if (typeof value === "undefined" || value === null) {
    return "-";
  }

  if (value >= 0) {
    return `+${value.toFixed(0)}`;
  }

  return `▲${Math.abs(value).toFixed(0)}`;
};

export const renderWeekday = (value: number) =>
  ["日", "一", "二", "三", "四", "五", "六"][value] ?? "-";

export const renderDate = (value: string) => {
  const date = new Date(value);
  if (!date) {
    return "-";
  }

  return date.toISOString().substring(0, 10);
};
