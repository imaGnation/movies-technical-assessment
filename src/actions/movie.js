import { CALL_API } from '../middleware/api';

export const GET_5_TOP_MOVIES_REQUEST = 'GET_5_TOP_MOVIES_REQUEST';
export const GET_5_TOP_MOVIES_SUCCESS = 'GET_5_TOP_MOVIES_SUCCESS';
export const GET_5_TOP_MOVIES_FAILURE = 'GET_5_TOP_MOVIES_FAILURE';

export const MARK_MOVIE_AS_SELECTED = 'MARK_MOVIE_AS_SELECTED';
export const ORDER_MOVIES_BY_FIELD = 'ORDER_MOVIES_BY_FIELD';
export const REMOVE_SELECTED_MOVIE = 'REMOVE_SELECTED_MOVIE';


export function getTopFiveMovies() {
    return {
        [CALL_API]: {
            types: [GET_5_TOP_MOVIES_REQUEST, GET_5_TOP_MOVIES_SUCCESS, GET_5_TOP_MOVIES_FAILURE],
            endpoint: 'getTopFiveMovies',
            httpMethod: 'GET',
        }
    }
}

export function markMovieAsSelected(movie) {
    return { type: MARK_MOVIE_AS_SELECTED, movie };
}

export function removeSelectedMovie() {
    return { type: REMOVE_SELECTED_MOVIE };
}

export function orderMovies(sortBy) {
    return { type: ORDER_MOVIES_BY_FIELD, sortBy };
}
