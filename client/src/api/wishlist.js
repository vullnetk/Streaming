import axios from 'axios';

// Fetch all wishlists
export function fetchWishlists() {
  return axios.get('/api/wishlists')
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch wishlists:', error);
      throw error;
    });
}

// Get a wishlist by UserId
export function fetchWishlistByUserId(userId) {
  console.log(userId)
  return axios.get(`/api/myWishlist/${userId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch wishlist for this user:', error);
      throw error;
    });
}

// Create a new movie
export function addToWishlist(title, year, country, genre, description, userId) {
    console.log(userId)
  const wishlistData = {
    MovieTitle: title,
    MovieYear: year,
    MovieCountry: country,
    Genre: genre,
    Description: description,
    UserId: userId
  };

  return axios.post('/api/addToWishlist', wishlistData)
    .then(response => {
      console.log('Added to wishlist successfully');
      return response.data;
    })
    .catch(error => {
      console.error('Failed to add to wishlist:', error);
      throw error;
    });
}

// Accept a request
export function acceptRequest(id) {
    return axios.put(`/api/approveRequest/${id}`)
      .then(response => {
        console.log('Request has been accepted');
        return response.data;
      })
      .catch(error => {
        console.error('Failed to accept request:', error);
        throw error;
      });
  }

  // Reject a request
export function rejectRequest(id) {
    return axios.put(`/api/rejectRequest/${id}`)
      .then(response => {
        console.log('Request has been rejected');
        return response.data;
      })
      .catch(error => {
        console.error('Failed to reject request:', error);
        throw error;
      });
  }
