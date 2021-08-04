import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom';
import DrawerComponent from './Components/drawer';
import MainContent from './Components/mainContent';
import VideoComponent from './Components/videoComponent';
import AppBarComponent from './Components/appBar';

const root = {
    display: 'flex',
};

export default function App() {
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
            </Switch>
        </div>
    );
}
