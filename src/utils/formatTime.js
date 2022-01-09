// Fromats seconds into minutes and hours
const formatTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds / 60) % 60;
    let secs = seconds % 60;
    return [hours, minutes, secs]
        .map(v => ('' + v).padStart(2, '0'))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
};

export default formatTime;
