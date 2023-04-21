import moment from 'moment';
import { checkError } from '../tests/specialTest/test';

export function getCurrentDate(offset: number = 0) {
    const now = moment();
    const formattedDate = now.add(offset, 'days').format('YYYY-MM-DD')
    checkError();
    return formattedDate;
}