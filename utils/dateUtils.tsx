const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function formatDate(date: string | Date) {
  if (typeof date === 'string' || date instanceof Date) {
    const dateObject = new Date(date);

    return dateFormatter.format(dateObject);
  }

  return '';
}
``;
