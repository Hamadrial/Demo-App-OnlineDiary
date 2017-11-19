import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// BrowserRouter interacts with history library and decides what to do base on the change inside the URL
// Route provides cofiguration to React router (change component base on the URL)
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './style/style.css';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={ createStoreWithMiddleware(reducers) }>
    <BrowserRouter>
      <div className="posts-index">
        <nav className="navbar navigation-bar">
          <Link className="navbar-brand app-title" to="/">
            Online Diary
          </Link>

          <Link role="button" className="navbar-nav btn add-new-button" to="/posts/new">
            Add new
          </Link>
        </nav>

        <Switch>
          <Route path="/posts/new" component={ PostsNew } />
          <Route path="/posts/:id" component={ PostsShow } />
          <Route path="/" component={ PostsIndex } />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.app-container'));
