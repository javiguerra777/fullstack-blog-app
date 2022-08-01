export default function convertUnixToDate(unix: number): string {
  const date: Date = new Date(unix * 1000);
  const humanDateFormat: string = date.toLocaleString();
  return humanDateFormat;
}
