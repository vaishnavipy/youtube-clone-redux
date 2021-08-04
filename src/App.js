import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import SearchIcon from '@material-ui/icons/Search';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import CssBaseline from '@material-ui/core/CssBaseline';
import DrawerComponent from './Components/drawer';
import MainContent from './Components/mainContent';
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
            <MainContent />
        </div>
    );
}
