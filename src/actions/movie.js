import { CALL_API } from '../middleware/api';

export const GET_5_TOP_MOVIES_REQUEST = 'GET_5_TOP_MOVIES_REQUEST';
export const GET_5_TOP_MOVIES_SUCCESS = 'GET_5_TOP_MOVIES_SUCCESS';
export const GET_5_TOP_MOVIES_FAILURE = 'GET_5_TOP_MOVIES_FAILURE';

export const MARK_MOVIE_AS_SELECTED = 'MARK_MOVIE_AS_SELECTED';
export const ORDER_MOVIES_BY_FIELD = 'ORDER_MOVIES_BY_FIELD';

export function getTopFiveMovies() {
    return {
        [CALL_API]: {
            types: [GET_5_TOP_MOVIES_REQUEST, GET_5_TOP_MOVIES_SUCCESS, GET_5_TOP_MOVIES_FAILURE],
            endpoint: 'getTopFiveMovies',
            httpMethod: 'GET',
        }
    }
}

export function markMovieAsSelected(title, movieList) {
    return { type: MARK_MOVIE_AS_SELECTED, title, movieList };
}

export function orderMovies(sortBy) {
    return { type: ORDER_MOVIES_BY_FIELD, sortBy };
}
