export function isCodeContainError(code: string): string | false {
  const errorRegex = /Error:\s*([^"]+)/;
  const match = code.match(errorRegex);

  return match ? match[0] : false;
}
