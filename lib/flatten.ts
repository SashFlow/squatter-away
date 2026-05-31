export function flattenObject(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      result[newKey] = "";
    } else if (Array.isArray(value)) {
      result[newKey] = value.map(String).join(", ");
    } else if (typeof value === "object") {
      Object.assign(
        result,
        flattenObject(value as Record<string, unknown>, newKey),
      );
    } else {
      result[newKey] = String(value);
    }
  }

  return result;
}
