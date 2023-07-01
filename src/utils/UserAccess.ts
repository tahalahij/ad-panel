import { USER_ROLE } from "../types/UserTypes";

export function userHasAccess(
  role: USER_ROLE,
  allowedRoles: USER_ROLE[]
): boolean {
  return allowedRoles.some((r) => r === role);
}
