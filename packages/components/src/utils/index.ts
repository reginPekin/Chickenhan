export function parseTime(stringDate: string): string {
  const date = Date.parse(stringDate);

  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const months = [
    'jun',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sept',
    'okt',
    'nov',
    'dec',
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

export async function handleImages(
  files: File[],
  onLoad: (files: string[]) => void,
): Promise<void> {
  if (!files) return; // сам вызывается @fix

  const promisedFiles: Promise<string>[] = [];

  for (const file of files) {
    const promise = new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.onload = (event): void => {
        resolve(String(event.target?.result));
      };
      reader.readAsDataURL(file);
    });

    promisedFiles.push(promise);
  }

  Promise.all(promisedFiles).then(onLoad);
}
