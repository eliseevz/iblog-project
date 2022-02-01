export function getDateFrom(timeIn) {
    const time = new Date(timeIn)
    const diff = new Date().getTime() - time
    if (diff / 1000 / 60 >= 60) {
        if (diff / 1000 / 60 / 60 / 24 < 1) {
            // return "часы. минуты"
            const date = new Date(timeIn)
            return `${date.getHours()}:${date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()}`
        }
        if (diff / 1000 / 60 / 60 / 24 / 365 > 1) {
            const date = new Date(time)
            // return "день месяц год"
            // return `${date.getDay()} ${date.getMonth()} ${date.getFullYear()}`
            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' } )} ${date.getFullYear()}`
        } else {
            const date = new Date(time)
            // return "День месяц"
            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`
        }
    } else {
        if (diff / 1000 / 60 <= 1) {
            return "минуту назад"
        }
        if (diff / 1000 / 60 <= 3) {
            return "3 минуты назад"
        }
        if (diff / 1000 / 60 <= 5) {
            return "5 минут назад"
        }
        if (diff / 1000 / 60 <= 7) {
            return "7 минут назад"
        }
        if (diff / 1000 / 60 <= 10) {
            return "10 минут назад"
        }
        if (diff / 1000 / 60 <= 20) {
            return "20 минут назад"
        }
        if (diff / 1000 / 60 <= 30) {
            return "30 минут назад"
        }
        if (diff / 1000 / 60 <= 40) {
            return "40 минут назад"
        }
        if (diff / 1000 / 60 <= 50) {
            return "50 минут назад"
        }
    }
}