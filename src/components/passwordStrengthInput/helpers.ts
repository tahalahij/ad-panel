import { IconType } from "react-icons";
import { MdCheckCircleOutline, MdOutlineErrorOutline } from "react-icons/md";

const atLeastMinimumLength = (password: string) =>
  new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password: string) =>
  new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password: string) =>
  new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password: string) =>
  new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password: string) =>
  new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

enum PasswordStrength {
  STRONG = "قوی",
  MEDIUM = "خوب",
  WEAK = "ضعیف",
}

export function testPasswordStrength(password?: string): PasswordStrength {
  if (!password) return PasswordStrength.WEAK;

  let points = 0;

  if (atLeastMinimumLength(password)) points += 1;
  if (atLeastOneUppercaseLetter(password)) points += 1;
  if (atLeastOneLowercaseLetter(password)) points += 1;
  if (atLeastOneNumber(password)) points += 1;
  if (atLeastOneSpecialChar(password)) points += 1;

  if (points >= 5) return PasswordStrength.STRONG;
  if (points >= 3) return PasswordStrength.MEDIUM;
  return PasswordStrength.WEAK;
}

export function getIcon(strength: PasswordStrength): IconType {
  switch (strength) {
    case PasswordStrength.STRONG:
      return MdCheckCircleOutline;
    case PasswordStrength.WEAK:
    case PasswordStrength.MEDIUM:
    default:
      return MdOutlineErrorOutline;
  }
}

export function generateColors(strength: PasswordStrength): string[] {
  let result: string[] = [];

  const COLORS = {
    NEUTRAL: "hsla(0, 0%, 88%, 1)",
    WEAK: "hsla(353, 100%, 38%, 1)",
    MEDIUM: "hsla (40, 71%, 51%, 1)",
    STRONG: "hsla (134, 73%, 30%, 1)",
  };

  switch (strength) {
    case PasswordStrength.WEAK:
      result = [COLORS.WEAK, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
    case PasswordStrength.MEDIUM:
      result = [COLORS.MEDIUM, COLORS.MEDIUM, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
    case PasswordStrength.STRONG:
      result = [COLORS.STRONG, COLORS.STRONG, COLORS.STRONG, COLORS.STRONG];
      break;
  }

  return result;
}
