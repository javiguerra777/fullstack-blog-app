export default function convertUnixToDate(unix: string): string {
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

export const validateEmail = (email: string) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
