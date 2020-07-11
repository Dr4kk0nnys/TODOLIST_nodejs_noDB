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

        fs.appendFileSync(this.databasePath, '\n' + data)

        console.log('Successfully passed the data to the database!')
    }

    getUserInput() {
        const input = PromptSync({ sigint: true })

        return input('> ')
    }
}

export default Database