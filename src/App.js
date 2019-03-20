import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import MovieList from './components/movies/MovieList';
import MovieDetails from './components/movies/MovieDetail';
import './App.scss';

export default () => (
  <Layout>
    <Route exact path='/' component={MovieList} />
    <Route path='/selected-movie' component={MovieDetails} />
  </Layout>
);
