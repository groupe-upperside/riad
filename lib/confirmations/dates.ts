const riadDateFormatter = new Intl.DateTimeFormat('en', {
    timeZone: 'Africa/Casablanca',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

export function todayAtRiad(now = new Date()): string {
    const parts = riadDateFormatter.formatToParts(now);
    return ['year', 'month', 'day'].map((type) => parts.find((part) => part.type === type)!.value).join('-');
}

export function addCalendarDays(value: string, days: number): string {
    const date = new Date(`${value}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
}
