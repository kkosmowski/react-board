import { DateFormat } from '@enums';
import { NumberUtil } from './number.util';

export class TimeUtil {
  static format(time: string, dateFormat: DateFormat): string {
    const zero = NumberUtil.zero;
    const date = new Date(time);

    switch (dateFormat) {
      case DateFormat.DateWithTime:
        return zero(date.getDate()) + '.' + zero(date.getMonth()) + '.' + date.getFullYear()
          + ', ' + zero(date.getHours()) + ':' + zero(date.getMinutes());
      default:
        return time;
    }
  }

  static getDayName(dayNumber: number, lang: string) {
    let days: string[];

    switch (lang) {
      case 'pl':
        days = ['Ni', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];
        break;

      case 'en':
      default:
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        break;
    }

    return days[dayNumber];
  }
}