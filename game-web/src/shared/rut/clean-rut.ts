export const cleanRut = (value: string): string => {
  if (!value) return "";

  const clean = value.replace(/[^0-9kK]/g, "");

  if (clean.length === 0) return "";

  if (clean.length === 1) {
    return clean.toUpperCase();
  }

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1).toUpperCase();

  return `${body}-${dv}`;
};
