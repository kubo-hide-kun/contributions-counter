export const sum = (list: number[]): number => {
  return list.reduce((prev, curr) => prev + curr);
};

export const average = (list: number[]): number => {
  return sum(list) / list.length;
};
