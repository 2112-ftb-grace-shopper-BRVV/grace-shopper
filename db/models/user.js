// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt")

async function createUser({ username, password, address, email, isAdmin}) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user]
    } = await client.query(
      `
        INSERT INTO users(username, password, address, email, "isAdmin") 
        VALUES($1, $2, $3, $4, $5) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `,
      [username, hashedPassword, address, email, isAdmin]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}){

  const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1}`
  ).join(', ');

  if (setString.length === 0) {
      return;
  }

  try {
      const { rows: [ user ] } = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
      `, Object.values(fields));

      return user;
  } catch (error){
      console.log(error);
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
        SELECT id, username, address, email, "isAdmin"
        FROM users;
    `);

    return rows;
}   catch (error) {
    throw error;
}
}

async function getUserById(id) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT id, username, address, email, "isAdmin"
      FROM users
      WHERE id=$1
    `, [id]);

    if (!user) {
      return null
    }


    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user]  } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1
    `, [username]);

    if (!user) {
      return null
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    try {
      const { rows: [user]  } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1
      `, [username]);
      if (!user) {
        return null
      }
      if (passwordsMatch) {
        delete user.password     
      return user;
      }
      else {
        return null
      }    
      } catch (error) {
      throw error;
      }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  updateUser,
  getUserByUsername,
  getUserById,
  getUser
};


