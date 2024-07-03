export const toTitleCase = (str: string): string => {
  str = str.replace("_", "-");
  if (str.length === 2) return str.toLocaleUpperCase();
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
};
