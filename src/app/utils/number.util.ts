export class NumberUtil {
  static zero(number: number | string): string {
    return Number(number) > 9 ? String(number) : '0' + number;
  }
}