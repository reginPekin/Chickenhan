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

export const handleFile = (
  loadedFiles: File[] | FileList,
  setFileUrl: (file: string | ArrayBuffer | null) => void,
): void => {
  if (!loadedFiles) {
    return;
  }

  const files: File[] = Array.prototype.slice.call(loadedFiles);

  for (const file of files) {
    const reader = new FileReader();

    reader.onload = async (): Promise<void> => {
      const b64image = reader.result;

      const img = new Image();
      img.src = `${b64image}`;

      const form = new FormData();
      form.append('photo', file);

      setFileUrl(reader.result);
    };

    // eslint-disable-next-line no-console
    reader.onabort = (): void => console.log('file reading was aborted');
    // eslint-disable-next-line no-console
    reader.onerror = (): void => console.log('file reading has failed');
    reader.readAsDataURL(file);
  }
};
