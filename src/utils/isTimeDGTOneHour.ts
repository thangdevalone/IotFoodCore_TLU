function parseTimeStringToDateTime(timeString: string): Date | null {
  const timeRegex = /^(\d+):(\d+) (AM|PM)$/;
  const match = timeString.match(timeRegex);

  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const ampm = match[3];

    const date = new Date();
    date.setHours(ampm === 'PM' ? hours + 12 : hours, minutes, 0, 0);

    return date;
  } else {
    return null; // Trả về null nếu chuỗi không hợp lệ
  }
}

export function isTimeDGTOneHour(timeString1: string, timeString2: string): boolean | null {
  if(timeString2.search("PM")!==-1) return false
  const date1 = parseTimeStringToDateTime(timeString1);
  const date2 = parseTimeStringToDateTime(timeString2);

  if (date1 && date2) {
    // Tính khoảng cách thời gian giữa hai thời điểm
    const timeDifferenceInMilliseconds = Math.abs(date1.getTime() - date2.getTime());

    // 1 tiếng = 60 phút x 60 giây x 1000 mili giây
    const oneHourInMilliseconds = 60 * 60 * 1000;

    return timeDifferenceInMilliseconds > oneHourInMilliseconds;
  } else {
    return null; // Trả về null nếu chuỗi không hợp lệ
  }
}