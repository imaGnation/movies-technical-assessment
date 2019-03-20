import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import OrderComponent from './OrderComponent';

export class MovieItemComponent extends Component {
    render() {

        const renderMoviecard = (items) => {
            if (items !== undefined)
                return items.map((movie) => {
                    return (<div className="movie" key={movie.id} onClick={() => this.props.onClick(movie)}>
                        <img src={movie.imageUrl} alt={movie.title} className="poster" />
                        <div className="title">{movie.title}</div>
                        <div className="info">
                            <span className="year">{movie.releaseDate}</span>
                        </div>
                    </div>);
                });
        }

        return (<div className="app">
            <div className="headerComponent">
                <h2 className="spacer">{this.props.type}</h2>
                <div className="spacer"></div>
                <div className="spacer orderComponent">
                    <OrderComponent handleChange={(value) => this.props.handleSelectOrderChange(value)} items={this.props.sortItems}
                        placeholder={this.props.placeholder} value={this.props.sortBy} />
                </div>
            </div>
            <Card className="movies">
                {renderMoviecard(this.props.items)}
            </Card>

        </div>);
    }
}

export default MovieItemComponent;