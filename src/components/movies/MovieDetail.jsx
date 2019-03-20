import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeSelectedMovie } from '../../actions/movie';
import { Button } from "@material-ui/core";

export class MovieDetail extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = { movie: undefined };
    }

    conponentWillMount = () => {
        if (this.props.movie === undefined)
            this.props.history.push('/');

        if (this.props.selectedMovie !== undefined)
            this.setState({ movie: this.props.selectedMovie })
    }

    componentWillUnmount = () => {
        this.props.removeSelectedMovie();
        this.props.history.push('/');
    }

    cancel = (event) => {
        event.preventDefault();
        this.props.removeSelectedMovie();
        this.props.history.push('/');
    }

    render = () => {

        if (this.props.selectedMovie === undefined)
            return (<div></div>);
        else {
            const movie = this.props.selectedMovie;
            return (<div className="detail">
                <Card className="movie">
                    <CardHeader className="cancel"
                        avatar={
                            <Avatar aria-label={movie.title}>
                                {movie.title.charAt(0).toUpperCase()}
                            </Avatar>
                        }

                        title={movie.title}
                        subheader={`Release date: ${movie.releaseDate}`} />
                    <img src={movie.imageUrl} className="poster" />
                    <Typography className="desc">
                        {movie.synopsis}
                    </Typography>
                    <CardContent>

                    </CardContent>
                    <CardActions disableActionSpacing>
                        <Button onClick={this.cancel.bind(this)} className="cancel">Cancel</Button>
                    </CardActions>
                </Card>
            </div>);
        }

    }
}


function mapStateToProps(state, ownProps) {
    return {
        selectedMovie: state.movies.selectedMovie
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeSelectedMovie
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);