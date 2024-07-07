import moment from "moment";

export const formatToISO = (time: string) => new Date(time).toISOString();
export const formatToNormal = (time: string): string => {
  const date = new Date(time);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getTimeDifference = (
  date: string,
  from: string,
  date2: string,
  from2: string
) => {
  const reservationDateTime = moment(`${date} ${from}`, "YYYY-MM-DD HH:mm");

  const currentDateTime = moment(`${date2} ${from2}`, "YYYY-MM-DD HH:mm");

  const diffMinutes = reservationDateTime.diff(currentDateTime, "minutes");

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  // Format the output
  if (hours > 0) {
    return `${hours} часов ${minutes} минут`;
  } else {
    return `${minutes} минут`;
  }
};
