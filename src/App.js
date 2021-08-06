import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import DrawerComponent from './Components/drawer';
import MainContent from './Components/mainContent';
import VideoComponent from './Components/videoComponent';
import AppBarComponent from './Components/appBar';
import fetchVideos from './actions/fetchVideos';
import SearchComponent from './Components/searchComponent';

const root = {
    display: 'flex',
};

function App({ dispatch }) {
    useEffect(() => {
        dispatch(fetchVideos());
    }, []);
    return (
        <div className={root}>
            <CssBaseline />
            <AppBarComponent />
            <DrawerComponent />
            <Switch>
                <Route exact path="/">
                    <MainContent />
                </Route>
                <Route exact path="/watch">
                    <VideoComponent />
                </Route>
                <Route path="/search/:slug">
                    <SearchComponent />
                </Route>
            </Switch>
        </div>
    );
}

App.propTypes = {
    dispatch: Proptypes.func.isRequired,
};

export default connect()(App);
