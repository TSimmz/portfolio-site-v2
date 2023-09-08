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

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const formatDate = (value: string | Date) => {
  const date = typeof value === 'string' ? new Date(value) : value;

  const dd =
    date.getDate() < 10 ? `0${date.getUTCDate()}` : `${date.getUTCDate()}`;
  const mm = months[date.getMonth()];

  const yyyy = date.getFullYear();

  return `${mm} ${dd}, ${yyyy}`;
};
