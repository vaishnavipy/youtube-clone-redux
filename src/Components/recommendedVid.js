import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecommendedVideos({ videosArr, channelArr }) {
    const videoCards = videosArr.map((videoObj) => (
        <Link
            to={`/watch?v=${videoObj.id}`}
            style={{ textDecoration: 'none', color: 'black' }}
        >
            {' '}
            <div
                style={{
                    width: '100%',

                    display: 'grid',
                    gridTemplateColumns: '50% 1fr',
                    height: '120px',
                    gap: '10px',

                    margin: '1em',
                }}
            >
                <div style={{ height: '100%', width: '100%' }}>
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                        src={videoObj.snippet.thumbnails.medium.url}
                        alt={videoObj.snippet.title}
                    />
                </div>
                <div>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '14px',
                            fontWeight: '900',
                            color: 'black',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            webkitLineClamp: '2',
                            webkitBoxOrient: 'vertical',
                        }}
                    >
                        {videoObj.snippet.title}
                    </p>
                    <p style={{ margin: '0.5em 0' }}>
                        {channelArr.find(
                            (channel) =>
                                videoObj.snippet.channelId === channel.id
                        ) &&
                            channelArr.find(
                                (channel) =>
                                    videoObj.snippet.channelId === channel.id
                            ).snippet.title}
                    </p>
                </div>
            </div>
        </Link>
    ));

    return (
        <div style={{ width: '30%' }}>
            Recommended
            <div>{videoCards}</div>
        </div>
    );
}

RecommendedVideos.propTypes = {
    videosArr: PropTypes.arrayOf.isRequired,
    channelArr: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
    videosArr: state.videos,
    channelArr: state.channelArr,
});

export default connect(mapStateToProps)(RecommendedVideos);
