const mssqlConnection = require('./mssqlConnection');
// const existingTables = ['Genres']; // Add the names of existing tables

const getExistingTables = async () => {
  try {
    const query = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`;
    const result = await mssqlConnection.executeQuery(query);
    return result.map(row => row.TABLE_NAME);
  } catch (error) {
    console.error('Failed to fetch existing tables:', error);
    return [];
  }
};

const generateTables = async () => {
  const existingTables = await getExistingTables();

  const newTables = ['Genres','CastCrewRole', 'CastCrew', 'Movie' ]; // Add the names of new tables to be created

  for (const table of newTables) {
    if (!existingTables.includes(table)) {
      let createTableQuery = '';

      switch (table) {
        case 'Genres':
          createTableQuery = `
            CREATE TABLE Genres (
              id INT IDENTITY(1,1) PRIMARY KEY,
              name VARCHAR(255) NOT NULL
            )
          `;
          break;

        case 'CastCrewRole':
          createTableQuery = `
            CREATE TABLE CastCrewRole (
              id INT IDENTITY(1,1) PRIMARY KEY,
              role VARCHAR(255) NOT NULL
            )
          `;
          break;

        case 'CastCrew':
          createTableQuery = `
            CREATE TABLE CastCrew (
              id INT IDENTITY(1,1) PRIMARY KEY,
              fullName VARCHAR(255) NOT NULL,
              roleId INT NOT NULL UNIQUE,
              FOREIGN KEY (roleId) REFERENCES CastCrewRole(id)
            )
          `;
          break;

        case 'Movie':
          createTableQuery = `
            CREATE TABLE Movie (
              id INT IDENTITY(1, 1) PRIMARY KEY,
              Title VARCHAR(255) NOT NULL,
              MovieYear INT NOT NULL,
              Description VARCHAR(255) NOT NULL,  
              CoverImage VARCHAR(255) NOT NULL,
              MovieLink VARCHAR(255) NOT NULL,
              isPg BIT NOT NULL,
              genreId INT NOT NULL,
              FOREIGN KEY (genreId) REFERENCES Genres(id),
            )
           `;
           break;

        default:
          console.log(`Table creation not defined for ${table}`);
          continue;
        }
      try {
        await mssqlConnection.executeQuery(createTableQuery);
        console.log(`Created table ${table}`);
      } catch (error) {
        console.error(`Failed to create table ${table}:`, error);
      }
    }
  }
};

generateTables();
