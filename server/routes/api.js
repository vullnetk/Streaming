const express = require('express');
const genresController = require('../controllers/genresController');
const castCrewRolesController = require('../controllers/castCrewRolesController');
const castCrewController = require('../controllers/castCrewController');

const router = express.Router();

// Fetch all genres
router.get('/genres', genresController.getAllGenres);
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

module.exports = router;


//comment