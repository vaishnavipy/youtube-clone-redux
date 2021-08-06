export default function fetchComments(videoID) {
    return (dispatch) => {
        fetch(
            `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=40&videoId=${videoID}&key=AIzaSyA36P_bRr_9FJbH7iIKV2CJ5laogiQPzLY`
        )
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: 'FETCH_COMMENTS', commentsArr: data.items });
            });
    };
}
