/**
 * Format seconds to hh:ss:mm
 * @param seconds
 * @returns string to hh:ss:mm
 */
export function formatTime(seconds: number): string {
  const date = new Date(seconds * 1000);
  let hh = date.getUTCHours();
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();
  // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
  // if (hh > 12) {hh = hh % 12;}
  const hours = _formatValue(date.getUTCHours());
  const minutes = _formatValue(date.getUTCMinutes());
  const secs = _formatValue(date.getSeconds());

  return `${hours}:${minutes}:${secs}`;
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

  const dateFormated = `${day}/${month}/${year} ${hour}:${mins}`;

  return dateFormated;
}

function _formatValue(value: number): string {
  return value < 10 ? "0" + value : value.toString();
}
