export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getDayLabel = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const dateStr = date.toDateString();

  if (dateStr === today.toDateString()) return 'Dzisiaj';
  if (dateStr === tomorrow.toDateString()) return 'Jutro';
  if (dateStr === dayAfterTomorrow.toDateString()) return 'Pojutrze';

  return formatDate(dateString);
};
