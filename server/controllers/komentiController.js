const mssqlConnection = require('../mssqlConnection');

// Fetch all Komentis
exports.getKomentet = async(req, res) => {
    try {
        const query = 'SELECT * FROM Komenti';
        const result = await mssqlConnection.executeQuery(query);
        res.json(result);
    } catch (error) {
        console.error('Failed to fetch Komentis:', error);
        res.status(500).json({ error: 'Failed to fetch Komentis' });
    }
};

// Add a new Komenti
exports.addKomenti = async (req, res) => {
    const { comment,title, artikulliID } = req.body;
    try {
      const query = `INSERT INTO Komenti (comment, title ,artikulliID) VALUES ('${comment}','${title}' ,'${artikulliID}')`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to add Komenti:', error);
      res.status(500).json({ error: 'Failed to add Komenti' });
    }
  };
  

// Edit a Komenti
exports.editKomenti = async (req, res) => {
    const { id } = req.params;
    const { comment, title,artikulliID } = req.body;
    try {
      const query = `UPDATE Komenti SET comment = '${comment}', title = ${title}  ,artikulliID = ${artikulliID} WHERE id = ${id}`;
      await mssqlConnection.executeQuery(query);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to edit Komenti:', error);
      res.status(500).json({ error: 'Failed to edit Komenti' });
    }
  };
  

// Delete a Komenti
exports.deleteKomenti = async(req, res) => {
    const { id } = req.params;
    try {
        const query = `DELETE FROM Komenti WHERE id = ${id}`;
        await mssqlConnection.executeQuery(query);
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to delete Komenti:', error);
        res.status(500).json({ error: 'Failed to delete Komenti' });
    }
};

//comment