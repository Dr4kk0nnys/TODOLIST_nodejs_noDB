import fs from 'fs'
import PromptSync from 'prompt-sync'

class Database {
    constructor(database_path) {
        this.databasePath = database_path

        console.log('Database called!')
    }

    read() {
        const data = fs.readFileSync(this.databasePath, 'UTF-8', (err) => {
            throw err
        })

        return data.split('\n')
    }

    add() {
        const data = this.getUserInput('What you want to add: ')

        /*
            * If the database is empty, there is no need
            * to add a '\n' at the start
            * so it just write the entire database
        */
        const dbRead = this.read()
        if (dbRead[0] === '' && dbRead.length === 1) {
            fs.writeFileSync(this.databasePath, data)
            return
        }

        fs.appendFileSync(this.databasePath, '\n' + data)

        console.log('Successfully passed the data to the database!')
    }

    remove() {
        /*
            * How does remove work ?
            * it gets the entire database from the read method
            * it then sorts out by the length of the database
            * if the line the user wants to remove is inside the entire length
            * it then removes that length from the array
            * and writes the array to the database
        */
        const data = this.read()
        const line = this.getUserInput('Line you want to remove: ')

        // if the line isn't a number
        if (!/^\d+$/.test(line)) {
            console.log('Line must be a number!')
            return
        }

        // if the line the user typed is greater than the database length
        if (data.length < line) {
            console.log('Invalid line!')
            return
        }

        data.splice(line, 1)

        fs.writeFileSync(this.databasePath, data.join('\n'))

        console.log('Successfully removed the line!')
    }

    update() {
        const data = this.read()

        const line = this.getUserInput('Line you want to update: ')
        const newData = this.getUserInput('New value: ')

        // Checking if the inputs are right
        if (!/^\d+$/.test(line)) {
            console.log('Line must be a number!');
            return
        }
        if (data.length < line) {
            console.log('Invalid line!')
            return
        }

        data[line] = newData

        fs.writeFileSync(this.databasePath, data.join('\n'))
    }

    getUserInput(question) {
        const input = PromptSync({ sigint: true })

        return input(question)
    }
}

export default Database