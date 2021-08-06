import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useQuery from './helpers/useQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        zIndex: 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        zIndex: 0,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,

        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        width: '100%',
        height: '40px',
        maxHeight: '40px',

        display: 'grid',
        gridTemplateColumns: 'auto 1fr',

        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    image: {
        width: '100%',
        height: '50%',
        alignSelf: 'center',
        objectFit: 'contain',
    },
    hideDrawer: {
        width: '0',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
}));

function DrawerComponent({ openSidebar, handleToggleSidebar }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen((prevState) => !prevState);
    };

    const query = useQuery();

    const drawerClass = clsx(classes.drawer, {
        [classes.drawerOpen]: openSidebar,
        [classes.hideDrawer]: !openSidebar,
    });

    const paperClass = {
        paper: clsx({
            [classes.drawerOpen]: openSidebar,
            [classes.hideDrawer]: !openSidebar,
        }),
    };

    return (
        <Drawer
            variant="permanent"
            className={
                query.get('v')
                    ? drawerClass
                    : clsx(classes.drawer, {
                          [classes.drawerOpen]: open,
                          [classes.drawerClose]: !open,
                      })
            }
            classes={
                query.get('v')
                    ? paperClass
                    : {
                          paper: clsx({
                              [classes.drawerOpen]: open,
                              [classes.drawerClose]: !open,
                          }),
                      }
            }
        >
            <div className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={
                        query.get('v') ? handleToggleSidebar : toggleDrawer
                    }
                    className={clsx(classes.menuButton)}
                >
                    <MenuIcon />
                </IconButton>
                {open || openSidebar ? (
                    <img
                        src="media/youtube-logo.png"
                        alt="youtube-logo"
                        className={classes.image}
                    />
                ) : (
                    ''
                )}
            </div>
            <Divider />
            <List>
                {['Home', 'Explore', 'Subscriptions'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[
                    'Library',
                    'History',
                    'Your Videos',
                    'Watch Later',
                    'Liked Videos',
                ].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

DrawerComponent.propTypes = {
    openSidebar: PropTypes.bool.isRequired,
    handleToggleSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    openSidebar: state.openSidebar,
});

const mapDispatchToProps = (dispatch) => ({
    handleToggleSidebar: () => dispatch({ type: 'OPEN_SIDEBAR' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
