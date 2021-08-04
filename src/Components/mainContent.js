import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchVideos from '../actions/fetchVideos';
import MovieCard from './movieCard';

const useStyles = makeStyles((theme) => ({
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(7) + 40,
    },
    videoContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(275px,1fr))',
        color: 'blue',
        gap: '10px',
    },
}));

function MainContent({ videos, channels, fetchVideosProp, statistics }) {
    const classes = useStyles();
    const [videosArr, setVideosArr] = useState([]);
    const [channelArr, setChannelArr] = useState([]);
    const [statisticsArr, setStatisticsArr] = useState([]);

    useEffect(() => {
        fetchVideosProp();
    }, []);

    useEffect(() => {
        if (videos.length && channels.length && statistics.length) {
            setVideosArr(videos);
            setChannelArr(channels);
            setStatisticsArr(statistics);
        }
    }, [videos, channels, statistics]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.videoContainer}>
                {videosArr.map((videoObj) => {
                    const channel = channelArr.filter(
                        (channelObj) =>
                            channelObj.id === videoObj.snippet.channelId
                    );

                    const stat = statisticsArr.filter(
                        (statObj) => statObj.id === videoObj.id
                    );

                    return (
                        <Link to={`/watch?v=${videoObj.id}`}>
                            {' '}
                            <MovieCard
                                videoObj={videoObj}
                                key={videoObj.id}
                                channel={channel[0]}
                                stat={stat[0]}
                            />
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}

MainContent.propTypes = {
    videos: PropTypes.arrayOf.isRequired,
    fetchVideosProp: PropTypes.func.isRequired,
    channels: PropTypes.arrayOf.isRequired,
    statistics: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
    videos: state.videos,
    channels: state.channelArr,
    statistics: state.statisticsArr,
});

const mapDispatchToProps = (dispatch) => ({
    fetchVideosProp: () => {
        dispatch(fetchVideos());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
