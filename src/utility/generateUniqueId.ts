export const generateUniqueId = (): string => {
  return Math.random().toString(30).substring(2, 7);
};
