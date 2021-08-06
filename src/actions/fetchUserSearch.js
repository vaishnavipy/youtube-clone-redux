export default function fetchUserSearch(searchInput) {
    return (dispatch) => {
        fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&key=AIzaSyA36P_bRr_9FJbH7iIKV2CJ5laogiQPzLY`
        )
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: 'FETCH_USER_SEARCH',
                    searchVideoArr: data.items,
                });
            });
    };
}
