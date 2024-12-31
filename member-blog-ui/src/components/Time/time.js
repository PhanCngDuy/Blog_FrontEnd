import moment from 'moment';

export const calculateTimeDifference = (timestamp) => {
    const now = moment();
    const targetTime = moment(timestamp);
    const diffInMinutes = now.diff(targetTime, 'minutes');
    const diffInHours = now.diff(targetTime, 'hours');

    if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else {
        return targetTime.format('HH:mm DD/MM/YYYY');
    }
};
