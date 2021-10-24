const mongoose = require('mongoose')
require("dotenv").config();

const server = process.env.MONGOURI
class Database {
    constructor() {
        this.connect()
    }
    connect() {
        mongoose.connect(server,{
            serverSelectionTimeoutMS: 5000
          }).then(() => {
            console.log('Mongo connection successful')
        }).catch(err => {
            console.log('Mongo connection failed:', err)
        })
    }

}
module.exports = new Database()