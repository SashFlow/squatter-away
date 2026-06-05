import { track } from "@vercel/analytics";

export function trackEarlyAccess(
  event: string,
  data?: Record<string, string | number | boolean>,
) {
  track(event, data);
}
