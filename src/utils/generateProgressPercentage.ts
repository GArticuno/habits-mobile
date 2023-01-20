export const generateProgressPercentage = (amount: number, completed: number) => {
  if (amount > 0) return Math.round((completed / amount) * 100);
  return 0;
};