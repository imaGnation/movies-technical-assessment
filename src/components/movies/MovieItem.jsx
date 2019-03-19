import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
    card: {
        maxWidth: 400,
        margin: '10px 0px'
    },
    media: {
        paddingTop: "110%",
        display: 'block',
        margin: 'auto',
    },
    actions: {
        display: "flex"
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500]
    }
});

export class MovieItem extends Component {
    constructor(props, state) {
        super(props, state);
    }

    render() {
        const { classes } = this.props;

        if (this.props.items !== undefined) {
            const renderMovies = this.props.items.map((movie) => {
                return (<Card className={classes.card} key={movie.id}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label={movie.title} className={classes.avatar}>
                                {movie.title.charAt(0).toUpperCase()}
                            </Avatar>
                        }

                        title={movie.title}
                        subheader={`Release date: ${movie.releaseDate}`} />

                    <CardMedia
                        className={classes.media}
                        image={movie.imageUrl}
                        title={movie.title}
                    />
                    <CardContent>

                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: movie.isSelected
                            })}
                            onClick={() => this.props.handleClick(movie.title)}
                            aria-expanded={movie.isSelected}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={movie.isSelected} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                {movie.synopsis}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card >)
            });
            return (<div>
                {renderMovies}
            </div>)
        } else
            return (<div></div >);


    }
}

MovieItem.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieItem);