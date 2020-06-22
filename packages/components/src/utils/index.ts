export function parseTime(date: number): string {
  const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  const oneDayMs = 24 * 60 * 60 * 1000;
  const threeDaysMs = 3 * oneDayMs;

  const innerDate = new Date(date);
  const today = Date.now();

  if (today - date < oneDayMs / 2)
    return innerDate.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  else if (today - date < threeDaysMs) return days[innerDate.getDay()];
  return `${innerDate.getDate()} ${months[innerDate.getMonth()]}`;
}
