import * as MovieActionTypes from '../actions/movie';
import _ from 'lodash';

const initialState = {};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case MovieActionTypes.GET_5_TOP_MOVIES_REQUEST:
            return {
                ...state,
                movieList: undefined,
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
                movieList: selectMovie(action.title, action.movieList)
            }

        case MovieActionTypes.ORDER_MOVIES_BY_FIELD:
            return {
                ...state,
                movieList: sortMoviesBy(action.sortBy, state.movieList)
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

function selectMovie(title, movieList) {
    if (!_.isEmpty(title) && movieList !== undefined && movieList.components !== undefined)
        movieList.components.forEach((component) => {
            if (component.type === 'movie-list')
                component.items.forEach((movie) => {
                    if (movie.title === title)
                        movie.isSelected = !movie.isSelected;
                    else
                        movie.isSelected = false;
                });
        });
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