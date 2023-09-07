export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const assertValue = <T>(v: T | undefined, errorMessage: string): T => {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
};

export const formatDate = (value: string | Date) => {
  const date = typeof value === 'string' ? new Date(value) : value;

  const dd =
    date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : `${date.getUTCDate()}`;
  const mm =
    date.getUTCMonth() + 1 < 10
      ? `0${date.getUTCMonth() + 1}`
      : `${date.getUTCMonth() + 1}`;
  const yyyy = date.getUTCFullYear();

  return `${yyyy}-${mm}-${dd} UTC`;
};
