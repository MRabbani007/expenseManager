export const getDate = (baseDate: Date, offset: number | undefined = 0) => {
  if (baseDate === undefined || baseDate === null) {
    baseDate = new Date();
  }
  const today = new Date(
    new Date(baseDate).getTime() + offset * 24 * 60 * 60 * 1000
  );
  // Format <"YYYY-MM-DD"> for mongoDb
  const result =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    "-" +
    today.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  return result;
};

export const getMonth = () => {
  // const today = new Date(new Date().getTime() + offset * 24 * 60 * 60 * 1000);
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  // Format <"YYYY-MM-DD"> for mongoDb
  return {
    firstDay: getDate(firstDay),
    lastDay: getDate(lastDay),
  };
};
