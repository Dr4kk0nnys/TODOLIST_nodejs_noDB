import Database from './modules/database.js'

const database = new Database('.database.txt')
// console.log(database.read())
// console.log(database.getUserInput())
database.add()