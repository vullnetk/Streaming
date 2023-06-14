const express = require('express');
const genresController = require('../controllers/genresController');
const castCrewRolesController = require('../controllers/castCrewRolesController');
const castCrewController = require('../controllers/castCrewController');
const userController = require('../controllers/userController');
const subscriptionController = require('../controllers/subscriptionController');
const movieController = require('../controllers/movieController');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

// Fetch all genres
router.get('/genres', genresController.getAllGenres);
// Get a Genre by Id
router.get('/genres/:id', genresController.getGenreById);
// Add a new genre
router.post('/genres/add', genresController.addGenre);
// Edit a genre
router.put('/genres/edit/:id', genresController.editGenre);
// Delete a genre
router.delete('/genres/delete/:id', genresController.deleteGenre);



// Fetch all cast crew roles
router.get('/castCrewRoles', castCrewRolesController.getAllcastCrewRoles);
// Add a new cast crew role
router.post('/castCrewRoles/add', castCrewRolesController.addCastCrewRole);
// Edit a cast crew role
router.put('/castCrewRoles/edit/:id', castCrewRolesController.editCastCrewRole);
// Delete a cast crew role
router.delete('/castCrewRoles/delete/:id', castCrewRolesController.deleteCastCrewRole);


// Fetch all castCrews
router.get('/castCrews', castCrewController.getAllcastCrews);
// Add a new castCrew
router.post('/castCrew/add', castCrewController.addCastCrew);
// Edit a castCrew
router.put('/castCrew/edit/:id', castCrewController.editCastCrew);
// Delete a castCrew 
router.delete('/castCrews/delete/:id', castCrewController.deleteCastCrew);

//User
router.post('/insertUser', userController.insert_user);
router.get('/user/:uid', userController.get_user);

//Subscription
router.get('/subscriptions', subscriptionController.get_subscriptions);
router.get('/subscription/:id', subscriptionController.get_subscription);
router.post('/uploadSubscription', subscriptionController.insert_subscription);
router.put('/editsubscription/:id', subscriptionController.edit_subscription);
router.delete('/subscription/delete/:id', subscriptionController.delete_subscription);

// Fetch all movies
router.get('/movies', movieController.getAllMovies);
// Get a single movie by ID
router.get('/movies/:id', movieController.getMovieById);
// Create a new movie
router.post('/createmovie', movieController.createMovie);
// Update a movie
router.put('/updatemovie/:id', movieController.updateMovie);
// Delete a movie
router.delete('/movie/delete/:id', movieController.deleteMovie);

//Wishlist
router.get('/wishlists', wishlistController.getAllWishlists);
router.post('/addToWishlist', wishlistController.addToWishlist);
router.put('/approveRequest/:id', wishlistController.approveRequest);
router.put('/rejectRequest/:id', wishlistController.rejectRequest);
router.get('/myWishlist', wishlistController.getUserWishlists)

module.exports = router;