export function microtime(getAsFloat = false) {
  const now = Date.now() / 1000;
  const performanceNow = (performance.now() + performance.timeOrigin) / 1000;

  const seconds = Math.floor(now);
  const microseconds = Math.round((performanceNow - seconds) * 1e6);

  if (getAsFloat) {
    return now + microseconds / 1e6;
  }

  const microsecondsString = microseconds.toString().padStart(6, "0");

  return `${seconds}${microsecondsString}`;
}
