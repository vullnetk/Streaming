const express = require('express');
const genresController = require('../controllers/genresController');

const router = express.Router();

// Fetch all genres
router.get('/genres', genresController.getAllGenres);
// Add a new genre
router.post('/genres/add', genresController.addGenre);
// Edit a genre
router.put('/genres/edit/:id', genresController.editGenre);
// Delete a genre
router.delete('/genres/delete/:id', genresController.deleteGenre);

module.exports = router;