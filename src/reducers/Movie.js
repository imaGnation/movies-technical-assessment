import * as MovieActionTypes from '../actions/movie';
import { REHYDRATE } from 'redux-persist/lib/constants';
import _ from 'lodash';

const initialState = {};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case MovieActionTypes.GET_5_TOP_MOVIES_REQUEST:
            return {
                ...state,
                error: undefined
            }

        case MovieActionTypes.GET_5_TOP_MOVIES_SUCCESS:
            return {
                ...state,
                movieList: loadSelction(action.response.json),
                error: undefined
            }

        case MovieActionTypes.GET_5_TOP_MOVIES_FAILURE:
            return {
                ...state,
                error: action.error
            }

        case MovieActionTypes.MARK_MOVIE_AS_SELECTED:
            return {
                ...state,
                selectedMovie: action.movie
            }

        case MovieActionTypes.REMOVE_SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: undefined
            }

        case MovieActionTypes.ORDER_MOVIES_BY_FIELD:
            return {
                ...state,
                movieList: sortMoviesBy(action.sortBy, state.movieList)
            }


        case REHYDRATE:
            const movies = action.payload !== undefined ? action.payload.movies : {};
            const movieList = movies.movieList !== undefined ? movies.movieList : undefined;
            const selectedMovie = movies.selectedMovie !== undefined ? movies.selectedMovie : undefined;
            return {
                ...state,
                movieList: movieList,
                selectedMovie: selectedMovie
            }

        default:
            return state;
    }
}

function loadSelction(movieList) {
    if (movieList !== undefined && movieList.components !== undefined) {
        movieList.components.forEach((component) => {
            if (component.type === 'movie-list')
                component.items.forEach((item) => {
                    item.isSelected = false;
                });
        });
    }
    return movieList;
}

function sortMoviesBy(sortBy, movieList) {
    if (!_.isEmpty(sortBy) && movieList !== undefined && movieList.components !== undefined)
        movieList.components.forEach((component) => {
            if (component.type === 'movie-list')
                component.items = _.sortBy(component.items, sortBy);
        });
    return movieList;
}