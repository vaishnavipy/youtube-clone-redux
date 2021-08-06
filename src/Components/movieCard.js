import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default function MovieCard({ videoObj, channel, stat }) {
    const { title, thumbnails, publishedAt } = videoObj.snippet;

    return (
        <div
            style={{
                height: '270px',
                color: '#606060',
                cursor: 'pointer',
            }}
        >
            <div
                style={{
                    height: '70%',
                    width: '90%',
                }}
            >
                <img
                    src={thumbnails.medium.url}
                    alt={videoObj.title}
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: '5px',
                    width: '100%',
                    height: '30%',
                }}
            >
                <div
                    style={{
                        borderRadius: '50%',
                        height: '60%',
                        width: '25%',
                    }}
                >
                    <img
                        src={channel && channel.snippet.thumbnails.default.url}
                        alt={channel && channel.snippet.description}
                        style={{
                            width: 'auto',
                            height: '100%',

                            borderRadius: '50%',
                        }}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <p
                        style={{
                            margin: '0',

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
                        {title}
                    </p>
                    <p style={{ margin: '0' }}>
                        {channel && channel.snippet.title}
                    </p>
                    {stat && (
                        <p style={{ margin: '0' }}>
                            <span style={{ margin: '0' }}>
                                {stat.statistics.viewCount}
                            </span>
                            <span style={{ color: 'black' }}> • </span>
                            <span>
                                <Moment fromNow>{publishedAt}</Moment>
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

MovieCard.propTypes = {
    videoObj: PropTypes.objectOf.isRequired,
    channel: PropTypes.objectOf.isRequired,
    stat: PropTypes.objectOf.isRequired,
};
