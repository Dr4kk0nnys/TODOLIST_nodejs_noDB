import PromptSync from 'prompt-sync'
import Database from './modules/database.js'


const input = PromptSync({ sigint: true })
const database = new Database('.database.txt')

let flag = true
while (flag) {
    const userInput = input('> ')

    switch (userInput) {
        case 'read':
            const data = database.read()
            for (let i = 0; i < data.length; i++) {
                console.log(`TODO ${i}: ${data[i]}`)
            }
            break

        case 'add':
            database.add()
            break

        case 'remove':
            database.remove()
            break

        case 'update':
            database.update()
            break

        case 'exit':
            flag = false
            break
    }
}