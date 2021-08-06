import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function SearchComponent({ searchVideoArr }) {
    console.log(searchVideoArr);
    const videos = searchVideoArr.map((videoObj) => {
        const { title, description, channelTitle, thumbnails } =
            videoObj.snippet;
        return (
            <Link
                to={`/watch?v=${videoObj.id.videoId}`}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                {' '}
                <div
                    style={{
                        width: '80%',

                        display: 'grid',
                        gridTemplateColumns: '30% 1fr',
                        height: '200px',
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
                            src={thumbnails.medium.url}
                            alt={title}
                        />
                    </div>
                    <div>
                        <h3
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
                            {title}
                        </h3>
                        <p style={{ margin: '0.5em 0' }}>{channelTitle}</p>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        );
    });

    return (
        <div
            style={{
                paddingLeft: '100px',
                color: 'black',
                marginTop: '90px',
            }}
        >
            {videos}
        </div>
    );
}

SearchComponent.propTypes = {
    searchVideoArr: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
    searchVideoArr: state.searchVideoArr,
});

export default connect(mapStateToProps)(SearchComponent);
