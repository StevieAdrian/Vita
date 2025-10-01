export function formatDate(timestamp: any): string {
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };

  const formatted = new Intl.DateTimeFormat('id-ID', options).format(date);
  return formatted.replace(/:/g, '.').concat(' WIB');
}
