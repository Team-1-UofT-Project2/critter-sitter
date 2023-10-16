module.exports = {
    format_time: (data) => {
        return Date.toLocaleTimeString();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
            new Date(date).getFullYear() + 5
        }`;
    },
};