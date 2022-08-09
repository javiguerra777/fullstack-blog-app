export default function convertUnixToDate(unix: number): string {
  const date: Date = new Date(unix);
  const dateToString: string = date.toLocaleString('en-US');
  const readableDate: string[] = dateToString.split(',');
  return readableDate[0];
}

export function limitCharacters(
  text: string,
  length: number,
): string {
  return text.slice(0, length);
}
