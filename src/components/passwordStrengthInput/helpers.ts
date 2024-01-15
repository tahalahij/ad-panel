import { colors } from "@mui/material";
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

export enum PasswordStrength {
  STRONG = "قوی",
  MEDIUM = "خوب",
  WEAK = "ضعیف",
}

export function testPasswordStrength(password?: string): PasswordStrength {
  if (!password) return PasswordStrength.WEAK;
  if (!atLeastMinimumLength(password)) return PasswordStrength.WEAK;

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

export function generateColors(
  strength: PasswordStrength
): [string, string, string, string] {

  const COLORS = {
    NEUTRAL: colors.grey[600],
    WEAK: colors.red[800],
    MEDIUM: colors.amber[800],
    STRONG: colors.green[800],
  };

  switch (strength) {
    case PasswordStrength.MEDIUM:
      return [COLORS.MEDIUM, COLORS.MEDIUM, COLORS.NEUTRAL, COLORS.NEUTRAL];
    case PasswordStrength.STRONG:
      return [COLORS.STRONG, COLORS.STRONG, COLORS.STRONG, COLORS.STRONG];
    case PasswordStrength.WEAK:
    default:
      return [COLORS.WEAK, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL];
  }
}
