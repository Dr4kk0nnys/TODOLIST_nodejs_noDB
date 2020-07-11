import fs from 'fs'
import PromptSync from 'prompt-sync'

class Database {
    constructor(database_path) {
        console.log('Database called!')

        this.databasePath = database_path
    }

    read() {
        const data = fs.readFileSync(this.databasePath, 'UTF-8', (err) => {
            throw err
        })

        return data
    }

    add() {
        const data = this.getUserInput()

        /*
            * If the database is empty, there is no need
            * to add a '\n' at the start
            * so it just write the entire database
        */
        const dbRead = this.read().split('\n')
        if (dbRead[0] === '' && dbRead.length === 1) {
            fs.writeFileSync(this.databasePath, data)
            return
        }

        fs.appendFileSync(this.databasePath, '\n' + data)

        console.log('Successfully passed the data to the database!')
    }

    getUserInput() {
        const input = PromptSync({ sigint: true })

        return input('> ')
    }
}

export default Database