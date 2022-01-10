/**
* Format seconds to HH:MM:SS
* @param seconds
* @returns string to HH:MM:SS
*/
export function formatTime(seconds: number): string {
 const date = new Date(seconds * 1000);
 let hh = date.getUTCHours();
 let mm = date.getUTCMinutes();
 let ss = date.getSeconds();
 // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
 // if (hh > 12) {hh = hh % 12;}
 let hours = hh.toString();
 let minutes = mm.toString();
 let secs = ss.toString();

 if (hh < 10) {
   hours = "0" + hours;
 }
 if (mm < 10) {
   minutes = "0" + minutes;
 }
 if (ss < 10) {
   secs = "0" + secs;
 }

 return `${hours}:${minutes}:${secs}`;
}