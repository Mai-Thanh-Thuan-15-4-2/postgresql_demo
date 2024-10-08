import * as dayjs from 'dayjs';

export function formatExcelDate(excelDate: number): string {
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}
