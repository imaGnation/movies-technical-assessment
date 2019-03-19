import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getTopFiveMovies, markMovieAsSelected, orderMovies } from '../../actions/movie';
import { connect } from 'react-redux';
import OrderComponent from './OrderComponent';
import MovieItem from './MovieItem';
import Loader from 'react-loader-spinner';
import MovieItemComponent from './MovieItemComponent';

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
        if (this.state.isLoaderActive)
            this.setState({ isLoaderActive: false });
    }

    handleExpandClick = (title) => {
        this.setState({ isLoaderActive: true });
        this.props.markMovieAsSelected(title, this.props.movieList);
    }

    handleSelectOrderChange = (sortBy) => {
        this.setState({ sortBy: sortBy });
        this.props.orderMovies(sortBy.value);
    }

    render = () => {
        const renderOrderItems = (placeholder, items) => {
            return <OrderComponent handleChange={(value) => this.handleSelectOrderChange(value)} items={items}
                placeholder={placeholder} value={this.state.sortBy} />
        }

        const renderLoader = (active) => {
            if (active) return <div> <div> <Loader type="Oval" color="#97b03a" height="100" width="100" /> </div> </div>
        }

        const renderMovieList = (movies) => {
            return <MovieItem items={movies} handleClick={(title) => this.handleExpandClick(title)} />
        }

        return (<div>
            {renderLoader(this.state.isLoaderActive)}
            <MovieItemComponent items={this.props.movies} type={this.props.movieList !== null ? this.props.movieList.type : ''}
                handleSelectOrderChange={(value) => this.handleSelectOrderChange(value)} placeholder={'Sort by'} sortBy={this.state.sortBy}
                sortItems={this.props.sortOderItems}
            />
        </div>)
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
            }
        });

    return {
        movieList: movieList,
        sortOderItems: sortOderItems,
        movies: movies
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