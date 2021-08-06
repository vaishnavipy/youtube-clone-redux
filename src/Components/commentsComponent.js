import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

function CommentsComponent({ commentsArr }) {
    const comments = commentsArr.map((commentObj) => {
        console.log('comments arr map');
        const { snippet } = commentObj.snippet.topLevelComment;
        return (
            <div
                style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '5% 1fr',

                    alignItems: 'center',
                    gap: '20px',
                    rowGap: '20px',
                    height: '50px',
                    margin: '1em 0',
                }}
            >
                <div
                    style={{
                        borderRadius: '50%',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <img
                        src={snippet.authorProfileImageUrl}
                        alt={snippet.authorDisplayName}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        }}
                    />
                </div>
                <div>
                    <p
                        style={{
                            margin: 0,
                        }}
                    >
                        <span
                            style={{
                                fontWeight: '700',
                                textTransform: 'capitalize',
                            }}
                        >
                            {snippet.authorDisplayName}
                        </span>
                        {'       '}
                        <span>
                            &nbsp; &nbsp;
                            <Moment fromNow>{snippet.publishedAt}</Moment>
                        </span>
                    </p>
                    <p style={{ margin: 0 }}>{snippet.textOriginal}</p>
                </div>
            </div>
        );
    });

    return <div style={{ margin: '3em 0' }}>{comments}</div>;
}

const mapStateToProps = (state) => ({
    commentsArr: state.commentsArr,
});

CommentsComponent.propTypes = {
    commentsArr: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(CommentsComponent);
