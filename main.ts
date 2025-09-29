import { config } from 'dotenv'
import Database from './src/db/mongodb'
import routes from './src/routes/routes'
import { serve } from 'bun'
config({ path: './.env' })

const db = new Database()

await import('./src/db/redis')
await db.setDB()

serve({
    fetch: routes.fetch,
    port: 3000,
    idleTimeout: 30,
})