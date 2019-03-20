import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getTopFiveMovies, markMovieAsSelected, orderMovies } from '../../actions/movie';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import MovieItemComponent from './MovieItemComponent';
import _ from 'lodash';

export class MovieList extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            sortBy: '',
            isLoaderActive: false
        };
    }

    componentWillMount = () => {
        this.props.getTopFiveMovies();
    }

    componentDidUpdate = () => {
        debugger
        if (this.props.selectedMovie !== null) {
            this.setState({ isLoaderActive: false });
            this.props.history.push('/selected-movie');
        }

    }

    handleSelectOrderChange = (sortBy) => {
        this.setState({ sortBy: sortBy });
        if (!_.isEmpty(sortBy))
            this.props.orderMovies(sortBy.value);
    }

    handleOnMovieClick = (movie) => {
        this.setState({ isLoaderActive: true });
        this.props.markMovieAsSelected(movie);
    }

    render = () => {
        const renderLoader = (active) => {
            if (active) return <div> <div> <Loader type="Oval" color="#97b03a" height="100" width="100" /> </div> </div>
        }


        return (<div>
            {renderLoader(this.state.isLoaderActive)}
            <MovieItemComponent items={this.props.movies} type={this.props.movieList !== null ? this.props.movieList.type : ''}
                handleSelectOrderChange={(value) => this.handleSelectOrderChange(value)} placeholder={'Sort by'} sortBy={this.state.sortBy}
                sortItems={this.props.sortOderItems} onClick={(movie) => this.handleOnMovieClick(movie)}
            />
        </div>);
    }
}

function mapStateToProps(state, ownProps) {
    const movieList = state.movies !== {} && state.movies.movieList !== undefined ? state.movies.movieList : null;
    let sortOderItems = [];
    let movies = [];

    if (movieList !== null && movieList.components !== undefined)
        movieList.components.forEach((component) => {
            switch (component.type) {
                case 'order-select':
                    sortOderItems = component.items;
                    break;
                case 'movie-list':
                    movies = component.items;
                    break;
                default:
                    break
            }
        });

    return {
        movieList: movieList,
        sortOderItems: sortOderItems,
        movies: movies,
        selectedMovie: state.movies.selectedMovie !== undefined ? state.movies.selectedMovie : null
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTopFiveMovies,
        markMovieAsSelected,
        orderMovies
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList)