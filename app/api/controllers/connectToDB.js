const { Pool } = require('pg')

async function connectToDB(queryString) {
    return new Promise((resolve, reject) => {    
      const pool = new Pool({
        user: process.env.DBUSER,
        host: process.env.DBHOST,
        database: process.env.DBNAME,
        password: process.env.DBPASSWORD,
        port: process.env.DBPORT,
        ssl: { rejectUnauthorized: false }})
      
      pool.connect((err, client, release) => {
        if (err ) {
          reject(err)
        }
        if (!client) {
          reject("No client")
        }
        client.query(queryString, (err, result) => {
          release()
          if (err) {
            reject(err)
          }
          else {
            resolve(result)
          }
        })
      })
    })
  }

module.exports = connectToDB;