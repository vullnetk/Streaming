import axios from 'axios';


export function addToWatchLater(UserId, MovieId) {
    console.log(UserId)
    watchLaterData = {
    movieId: MovieId,
    userId: UserId
  };

  try {
    const response = axios.post('/api/addToWatchLater', watchLaterData = {});
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
