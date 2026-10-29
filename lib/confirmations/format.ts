export function staffDate(value: number) {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Africa/Casablanca',
    }).format(new Date(value));
}
export function stayDate(value: string) {
    return new Intl.DateTimeFormat('fr-FR', {dateStyle: 'medium', timeZone: 'UTC'}).format(
        new Date(`${value}T00:00:00Z`),
    );
}
