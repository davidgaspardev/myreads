import { Enum } from 'enumify';

export default class Books extends Enum {}

Books.initEnum(['CURRENTLY_READING','WANT_TO_READ','READ']);
