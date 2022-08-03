export default function convertUnixToDate(unix: number): string {
  const date: Date = new Date(unix);
  return date.toLocaleString('en-US');
}
