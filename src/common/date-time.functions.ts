/**
 * Format seconds to hh:ss:mm
 * @param seconds
 * @returns string to hh:ss:mm
 */
export function formatTime(seconds: number): string {
  const date = new Date(seconds * 1000);
  const hours = _formatValue(date.getUTCHours());
  const minutes = _formatValue(date.getUTCMinutes());
  const secs = _formatValue(date.getSeconds());

  return `${hours !== "00" ? hours + ":" : ""}${minutes}:${secs}`;
}

/**
 *
 * @param timestamp number
 * @returns Date formated 'dd/mm/YY mm:ss'
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear() - 2000;
  const month = _formatValue(date.getMonth() + 1);
  const day = _formatValue(date.getDate());
  const hour = _formatValue(date.getHours());
  const mins = _formatValue(date.getMinutes());

  return `${day}/${month}/${year} ${hour}:${mins}`;
}

function _formatValue(value: number): string {
  return value < 10 ? "0" + value : value.toString();
}
