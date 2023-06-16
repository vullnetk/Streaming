const mssqlConnection = require('../mssqlConnection');
const admin = require('../firebaseService');
const serviceAccount = require('../firebase-config.json');
// const { sendNotificationToAllUsers } = require('../notificationService');

// Initialize the Firebase Admin SDK with your service account credentials
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
      const query = 'SELECT * FROM Movie';
      const result = await mssqlConnection.executeQuery(query);
      res.json(result);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  };
  
// Get a single movie by ID
exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
      const query = `SELECT * FROM Movie WHERE id = ${id}`;
      const result = await mssqlConnection.executeQuery(query);
      if (result.length === 0) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(result[0]);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
      res.status(500).json({ error: 'Failed to fetch movie' });
    }
  };
  
  // Create a new movie
  exports.createMovie = async (req, res) => {
    const { Title, MovieYear, Description, CoverImage, MovieLink, isPg, genreId } = req.body;
    try {
      const query = `
        INSERT INTO Movie (Title, MovieYear, Description, CoverImage, MovieLink, isPg, genreId)
        VALUES ('${Title}', ${MovieYear}, '${Description}', '${CoverImage}', '${MovieLink}', ${isPg ? 1 : 0}, ${genreId})
      `;
      await mssqlConnection.executeQuery(query);

      // Notify all users about the new movie
      const notification = {
        title: 'New Movie Added',
        body: `A new movie "${Title}" has been added. Check it out!`,
        // Add any additional data or options for the notification as needed
      };
      await sendNotificationToAllUsers(notification);

      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to create movie:', error);
      res.status(500).json({ error: 'Failed to create movie' });
    }
  };

  // Function to send a notification to all users
async function sendNotificationToAllUsers(notification) {
  try {
    const message = {
      notification: notification,
      topic: 'all_users', // Send the notification to a specific topic or use device tokens as needed
    };

    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Failed to send notification:', error);
    throw new Error('Failed to send notification');
  }
}


  // Update a movie
  exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const { Title, MovieYear, Description, CoverImage, MovieLink, isPg, genreId } = req.body;
    try {
      const query = `
        UPDATE Movie
        SET Title = '${Title}', MovieYear = ${MovieYear}, Description = '${Description}', CoverImage = '${CoverImage}',
        MovieLink = '${MovieLink}', isPg = ${isPg ? 1 : 0}, genreId = ${genreId}
        WHERE id = ${id}
      `;
      await mssqlConnection.executeQuery(query);
      console.log('aaaaaaaaa');
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to update movie:', error);
      res.status(500).json({ error: 'Failed to update movie' });
    }
  };
  
  // Delete a movie
  exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const query = `DELETE FROM Movie WHERE id = ${id}`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to delete movie:', error);
      res.status(500).json({ error: 'Failed to delete movie' });
    }
  };