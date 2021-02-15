const times = [30, 60];
const ampm = 12;
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function timeToStr(today) {

  let hour = today.getHours();
  let minute = today.getMinutes();
  let timeOfDay;
  hour >= ampm ? (timeOfDay = "PM") : (timeOfDay = "AM");
  hour = updateTime(hour, "hour");
  minute = updateTime(minute, "minute");
  return `${hour}:${minute} ${timeOfDay}`;
}

function dateToStr(today) {
  let day = today.getDay();
  let date = today.getDate();
  let monthnum = today.getMonth();
  return `${weekday[day]} ${date} ${month[monthnum]}`;
}

function updateTime(k, type) {
  let p;
  type === "hour" && k > ampm ? (p = k - 12) : (p = k);
  if (p < 10) {
    return "0" + p;
  } else {
    return p;
  }
}

function minsToNextUpdate(minute) {
  let min_diff = 30;
  let i = 0;
  for (i = 0; i < times.length; i++) {
    let diff = times[i] - minute;
    if (diff > 0 && diff < min_diff) {
      min_diff = diff;
    }
  }
  return min_diff;
}

export { timeToStr, minsToNextUpdate, dateToStr };
