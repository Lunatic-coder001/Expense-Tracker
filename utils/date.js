export function getFormattedDate(date) {
    return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

// With this helper function, we can get a date// that is X number of days,// so days, number of days in the past.`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;