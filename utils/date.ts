export const timeBetweenDates = (date1: Date, date2: Date) => {
  const differenceMilliseconds = date1.getTime() - date2.getTime();
  const minutes = Math.round(differenceMilliseconds / 60000);
  const hours = Math.round(differenceMilliseconds / 3600000);
  const days = Math.round(differenceMilliseconds / 86400000);

  if (!days && !hours) {
    return `${minutes} min.`;
  }

  if (!days) {
    return `${hours} hr.`;
  }

  return `${days} days`;
};

export const dynamicTimeLeft = (date1: Date, date2: Date) => {
  const distance = date2.getTime() - date1.getTime();

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const addZero = (t: number) => (t > 9 ? t : `0${t}`);

  if (distance <= 0) {
    return `0`;
  }

  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};
