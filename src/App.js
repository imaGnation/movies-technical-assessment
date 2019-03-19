import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import MovieList from './components/movies/MovieList';
import './App.scss';

export default () => (
  <Layout>
    <Route exact path='/' component={MovieList} />
  </Layout>
);
