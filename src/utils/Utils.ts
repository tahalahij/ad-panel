import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import { WeekDays } from "../types/ScheduleTypes";
import { USER_ROLE } from "../types/UserTypes";

type convertOptions = {
  isRial?: boolean;
  withComma?: boolean;
  appendToman?: boolean;
};
export function convertToCurrency(
  amount: number,
  options: convertOptions = {
    isRial: true,
    withComma: false,
    appendToman: false,
  }
): string {
  let result: string;
  if (options.isRial) {
    result = (amount / 10).toFixed(0);
  } else {
    result = amount.toString();
  }

  if (options.withComma) {
    result = addCommas(result);
  }

  result = digitsEnToFa(result);

  if (options.appendToman) {
    result = result + " تومان";
  }
  return result;
}

export function convertCurrencyToHighValueReadable(
  amount: number,
  options: convertOptions = {
    isRial: true,
    withComma: false,
    appendToman: true,
  }
): string {
  let result: string;
  amount = amount / 1000;
  if (options.isRial) {
    result = (amount / 10).toFixed(0);
  } else {
    result = amount.toString();
  }

  if (options.withComma) {
    result = addCommas(result);
  }

  result = digitsEnToFa(result);
  result = result + " هزار";

  if (options.appendToman) {
    result = result + " تومان";
  }

  return result;
}

export const getReadableDay = (item: WeekDays) => {
  switch (item) {
    case WeekDays.SATURDAY:
      return "شنبه";
    case WeekDays.SUNDAY:
      return "یکشنبه";
    case WeekDays.MONDAY:
      return "دوشنبه";
    case WeekDays.TUESDAY:
      return "سه‌شنبه";
    case WeekDays.WEDNESDAY:
      return "چهارشنبه";
    case WeekDays.THURSDAY:
      return "پنج‌شنبه";
    case WeekDays.FRIDAY:
      return "جمعه";
    default:
      return "";
  }
};

export function generateReadableError(
  error: { property: string; errors: string[] }[] | string
) {
  if (typeof error === "string") {
    return error;
  }

  if (Array.isArray(error)) {
    let readableString = "";
    error.forEach((e, index) => {
      readableString += e.property + ": ";
      readableString += e.errors.join(", ");
      if (index < error.length - 1) readableString += "\n";
    });

    return readableString;
  }

  return "";
}

export function getRoleName(role: USER_ROLE) {
  switch (role) {
    case "ADMIN":
      return "مدیر سامانه";
    case "CONTROLLER":
      return "مدیر کنترلی";
    case "OPERATOR":
      return "مدیر مانیتورها";
    default:
      return "";
  }
}

export function extractNonEmptyStrings(obj: { [key: string]: string }) {
  return Object.entries(obj).reduce(
    (acc, [k, v]) => (v ? { ...acc, [k]: v } : acc),
    {}
  );
}
