import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import SearchIcon from '@material-ui/icons/Search';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import fetchUserSearch from '../actions/fetchUserSearch';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: 0,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    header: {
        width: '100%',
        height: '40px',
        backgroundColor: 'white',
        color: '#606060',
        display: 'grid',
        gridTemplateColumns: '11% 1fr 10%',
    },
    headerLeftDiv: {
        display: 'flex',
        width: '100%',
        height: '100%',
    },

    headerImg: {
        paddingLeft: '5px',
        width: '80%',
        height: '90%',
        alignSelf: 'center',
        objectFit: 'contain',
    },
    headerSidebar: {
        display: 'flex',

        alignItems: 'center',
    },
    icons: {
        padding: '0 0.5em',
        cursor: 'pointer',
    },
    profilePic: {
        height: '100%',
        borderRadius: '50%',
        background: '#7E57C2',
        color: 'white',
        padding: '0.3em 0.5em',
        fontSize: '1.3rem',
        alignSelf: 'center',
    },
    headerInputDiv: {
        width: '70%',
        justifySelf: 'center',
        display: 'flex',
    },
    input: {
        padding: '0.5em',
        border: '0',
        outline: 'none',
    },
    inputDiv: {
        display: 'grid',
        gridTemplateColumns: '95% 5%',
        width: '90%',
        marginRight: '1em',
        border: '1px solid #D3D3D3',
    },
}));

function AppBarComponent({ dispatch }) {
    const classes = useStyles();
    const history = useHistory();

    const [searchInput, setSearchInput] = useState('');

    function toggleDrawer() {
        dispatch({ type: 'OPEN_SIDEBAR' });
    }
    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            history.push(`/search/${searchInput}`);
            dispatch(fetchUserSearch(searchInput));
        }
    }

    return (
        <AppBar position="fixed" className={clsx(classes.appBar)}>
            <Toolbar className={classes.header}>
                <div className={classes.headerLeftDiv}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/">
                        <img
                            src="media/youtube-logo.png"
                            alt="youtube-logo"
                            className={classes.headerImg}
                        />
                    </Link>
                </div>
                <div className={classes.headerInputDiv}>
                    <div className={classes.inputDiv}>
                        <input
                            type="text"
                            placeholder="Search.."
                            className={classes.input}
                            value={searchInput}
                            name="searchInput"
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                        />
                        <span style={{ cursor: 'pointer' }}>
                            <SearchIcon
                                onClick={() => {
                                    history.push(`/search/${searchInput}`);
                                    dispatch(fetchUserSearch(searchInput));
                                }}
                            />
                        </span>
                    </div>
                    <span className={classes.icons}>
                        <SettingsVoiceIcon />
                    </span>
                </div>
                <div className={classes.headerSidebar}>
                    <span className={classes.icons}>
                        <VideoCallIcon />
                    </span>
                    <span className={classes.icons}>
                        <AppsIcon />
                    </span>
                    <span className={classes.icons}>
                        <NotificationsActiveIcon />
                    </span>
                    <div className={`${classes.profilePic} ${classes.icons}`}>
                        V
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}

AppBarComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(AppBarComponent);
