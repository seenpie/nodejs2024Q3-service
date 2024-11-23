import * as bcrypt from "bcrypt";

export async function hashByBcrypt(
  value: string,
  saltRound: number,
): Promise<string> {
  return await bcrypt.hash(value, saltRound);
}

export async function checkEqualHashAndPlainValues(
  plainValue: string,
  hashValue: string,
): Promise<boolean> {
  return await bcrypt.compare(plainValue, hashValue);
}
