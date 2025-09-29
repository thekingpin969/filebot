import { config } from 'dotenv'
import tgBot from './src/bot/bot'
import Database from './src/db/mongodb'
config({ path: './.env' })

const db = new Database()

await import('./src/db/redis')
await db.setDB()

tgBot.launch()
console.log('bot running')