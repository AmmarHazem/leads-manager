import { CREATE_MESSAGE } from './types';

export const getMessages = msg => ({type: CREATE_MESSAGE, payload: msg})
