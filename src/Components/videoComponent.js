import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import Button from '@material-ui/core/Button';
import useQuery from './helpers/useQuery';
import fetchComments from '../actions/fetchComments';
import RecommendedVideos from './recommendedVid';
import CommentsComponent from './commentsComponent';

function VideoComponent({
    videoArr,
    statisticsArr,
    channelArr,
    fetchCommentsArr,
    searchVideoArr,
}) {
    const query = useQuery();
    const videoID = query.get('v');

    const [videoObj, setVideoObj] = useState({});
    const [videoTags, setVideoTags] = useState([]);
    const [videoStat, setVideoStat] = useState({});
    const [channel, setChannel] = useState({});

    const [videoData, setVideoData] = useState({ title: '', publishedAt: '' });

    useEffect(() => {
        fetchCommentsArr(videoID);
    }, []);

    useEffect(() => {
        fetchCommentsArr(videoID);
    }, [videoID]);

    useEffect(() => {
        if (videoArr.length && videoID) {
            if (videoArr.find((video) => video.id === videoID)) {
                setVideoObj(videoArr.find((video) => video.id === videoID));
            } else {
                setVideoObj(
                    searchVideoArr.find((video) => video.id.videoId === videoID)
                );
            }
        }
    }, [videoArr, videoID, searchVideoArr]);

    useEffect(() => {
        if (videoObj && videoObj.snippet) {
            setVideoTags(videoObj.snippet.tags);

            setVideoData({
                title: videoObj.snippet.title,
                publishedAt: videoObj.snippet.publishedAt,
            });
        }
    }, [videoObj]);

    useEffect(() => {
        if (statisticsArr.length) {
            setVideoStat(statisticsArr.find((obj) => obj.id === videoID));
        }
    }, [statisticsArr, videoID]);

    useEffect(() => {
        if (channelArr.length && videoObj && Object.keys(videoObj).length) {
            setChannel(
                channelArr.find(
                    (channelObj) => channelObj.id === videoObj.snippet.channelId
                )
            );
        }
    }, [channelArr, videoObj]);

    return (
        <div
            style={{
                paddingLeft: '60px',
                color: 'black',
                marginTop: '90px',
                display: 'flex',
                gap: '15px',
            }}
        >
            <div style={{ width: '65%' }}>
                <iframe
                    title="video-player"
                    width="100%"
                    height="480"
                    autoPlay=""
                    src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen=""
                    style={{ marginBottom: '0.5em' }}
                />
                <p style={{ color: '#0660D4', margin: '0px' }}>
                    {videoTags &&
                        videoTags
                            .map((tag) => `#${tag}`)
                            .slice(0, 4)
                            .join(' ')}
                </p>
                <h2 style={{ margin: '0px' }}>{videoData.title}</h2>
                <p style={{ margin: '0.5em' }}>
                    <span style={{ margin: '0' }}>
                        {videoStat &&
                            videoStat.statistics &&
                            videoStat.statistics.viewCount}{' '}
                        views
                    </span>
                    <span style={{ color: 'black' }}> • </span>
                    <Moment fromNow>{videoData.publishedAt}</Moment>
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        fontSize: '1rem',
                        color: '#605951',

                        fontWeight: '700',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            paddingRight: '1rem',
                            borderBottom: '1px solid black',

                            paddingBottom: '0.5em',
                        }}
                    >
                        <ThumbUpAltOutlinedIcon />
                        {videoStat &&
                            videoStat.statistics &&
                            videoStat.statistics.likeCount}
                    </span>
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            paddingRight: '1rem',

                            borderBottom: '1px solid black',
                            paddingBottom: '0.5em',
                        }}
                    >
                        <ThumbDownAltOutlinedIcon />
                        {videoStat &&
                            videoStat.statistics &&
                            videoStat.statistics.dislikeCount}
                    </span>

                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: '1rem',
                            paddingBottom: '0.5em',
                            gap: '3px',
                        }}
                    >
                        <ShareOutlinedIcon />
                        SHARE
                    </span>
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: '1rem',
                            paddingBottom: '0.5em',
                            gap: '3px',
                        }}
                    >
                        <FavoriteBorderOutlinedIcon />
                        THANKS
                    </span>
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingBottom: '0.5em',

                            gap: '3px',
                        }}
                    >
                        <SaveAltOutlinedIcon /> SAVE
                    </span>
                </div>
                <hr />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                        }}
                    >
                        <div
                            style={{
                                borderRadius: '50%',
                                height: '30%',
                            }}
                        >
                            <img
                                src={
                                    channel &&
                                    channel.snippet &&
                                    channel.snippet.thumbnails.default.url
                                }
                                alt={
                                    channel &&
                                    channel.snippet &&
                                    channel.snippet.description
                                }
                                style={{
                                    width: 'auto',
                                    height: '100%',

                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                        <div>
                            <h3>
                                {channel &&
                                    channel.snippet &&
                                    channel.snippet.title}
                            </h3>
                            <p>{videoData.title}</p>
                            <p style={{ color: '#0660D4', margin: '0px' }}>
                                {videoTags &&
                                    videoTags
                                        .map((tag) => `#${tag}`)
                                        .slice(0, 4)
                                        .join(' ')}
                            </p>
                            <p>SHOW MORE</p>
                        </div>
                    </div>
                    <div>
                        <Button variant="contained" color="secondary">
                            SUBSCRIBE
                        </Button>
                    </div>
                </div>
                <hr />
                <div>
                    <p>
                        {videoStat &&
                            videoStat.statistics &&
                            videoStat.statistics.commentCount}
                        &nbsp; Comments
                    </p>
                    <div
                        style={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: '5% 1fr',

                            alignItems: 'center',
                            gap: '20px',
                            rowGap: '20px',
                            height: '50px',
                        }}
                    >
                        <div
                            style={{
                                borderRadius: '50%',
                                height: '50%',
                                width: 'auto',
                            }}
                        >
                            <img
                                src={
                                    channel &&
                                    channel.snippet &&
                                    channel.snippet.thumbnails.default.url
                                }
                                alt={
                                    channel &&
                                    channel.snippet &&
                                    channel.snippet.description
                                }
                                style={{
                                    width: 'auto',
                                    height: '100%',

                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                outline: 'none',
                                border: 'none',
                                padding: '1em',
                                backgroundColor: '#FAFAFA',
                                borderBottom: '1px solid black',
                            }}
                        />
                    </div>
                </div>
                <CommentsComponent />
            </div>

            <RecommendedVideos />
        </div>
    );
}

VideoComponent.propTypes = {
    videoArr: PropTypes.arrayOf.isRequired,
    statisticsArr: PropTypes.arrayOf.isRequired,
    channelArr: PropTypes.arrayOf.isRequired,
    fetchCommentsArr: PropTypes.func.isRequired,
    searchVideoArr: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
    videoArr: state.videos,
    statisticsArr: state.statisticsArr,
    channelArr: state.channelArr,
    searchVideoArr: state.searchVideoArr,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCommentsArr: (videoID) => dispatch(fetchComments(videoID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoComponent);
