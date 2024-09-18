import { config, list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text } from '@keystone-6/core/fields'
import 'dotenv/config'

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
  lists: {
    User: list({
      access: allowAll,
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ isIndexed: "unique", validation: { isRequired: true } }),
      },
    }),
  },
});
