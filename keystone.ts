import { config } from '@keystone-6/core'
import 'dotenv/config'
import { lists } from './schema'

const getDatabaseUrl = (): string => {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable inside .env.local')
    }
    return process.env.DATABASE_URL
}

export default config({
  db: {
    provider: "postgresql",
    url: getDatabaseUrl(),
  },
  lists,
});
