export const convertToYear = (date: string) =>
  new Date(date).getFullYear() || '';

export const convertToDate = (date: string) => {
  const newDate = new Date(date);

  return (
    `${newDate.getDate() + 1}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}` || 'Uninformed'
  );
};

export const getTodayDate = () => new Date().toISOString().slice(0, 10);
