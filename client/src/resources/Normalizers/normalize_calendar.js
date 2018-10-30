import moment from 'moment-timezone';

let now = moment().tz('Asia/Seoul').format('YYYY-MM-DD');

export default value => {
    if(!value) {
        return now;
    }

    return value
};