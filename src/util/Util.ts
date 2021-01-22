export function formatNumComma(num: number): string {
  return num.toLocaleString("en");
}

export function toNumber(str: string): number {
  return Number(str.replaceAll(".", "").replaceAll(",", ""));
}
