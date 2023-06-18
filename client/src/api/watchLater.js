import axios from 'axios';


export function addToWatchLater(MovieId, UserId) {
    console.log(UserId)
    const watchLaterData = {
    movieId: MovieId,
    userId: UserId
  };

  try {
    console.log('abd');
    console.log(watchLaterData);
    const response = axios.post('/api/addToWatchLater', watchLaterData );
    console.log('Added to watchLater successfully');
    return response.data;
  } catch (error) {
    console.error('Failed to add to watchLater:', error);
    throw error;
  }
}

export function removeFromWatchLater(movieId, userId) {
    return axios.delete(`/api/removeFromWatchLater/${movieId}/${userId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Failed to remove from WatchLater List:', error);
        throw error;
      });
}
