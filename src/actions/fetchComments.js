export default function fetchComments(videoID) {
    return (dispatch) => {
        fetch(
            `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=40&videoId=${videoID}&key=${process.env.REACT_APP_API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: 'FETCH_COMMENTS', commentsArr: data.items });
            });
    };
}
