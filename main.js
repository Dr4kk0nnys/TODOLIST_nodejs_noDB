import PromptSync from 'prompt-sync'
import Database from './modules/database.js'


const input = PromptSync({ sigint: true })
const database = new Database('.database.txt')

let flag = true
while (flag) {
    const userInput = input('> ')

    switch (userInput) {
        case 'read':
            console.log(database.read())
            break

        case 'add':
            database.add()
            break

        case 'exit':
            flag = false
            break
    }
}