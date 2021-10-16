import db from './database'
import { getMigrations } from './migrations/run'

async function runMigrations() {
  const migrations = await getMigrations()
  db.exec(migrations.join(''), (err) => {
    if (err != null) {
      console.error(err)
      process.exit(1)
    }
  })
}
runMigrations().then(() =>
  console.log('The migrations was executed successfully'),
)
