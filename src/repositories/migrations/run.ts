import { readdir, readFile } from 'fs/promises'
import { resolve } from 'path'
import { Database } from 'sqlite3'

export async function getMigrations(path = __dirname): Promise<string[]> {
  const queries: string[] = []
  try {
    const files = await readdir(path)
    for await (const file of files) {
      if (file.endsWith('.sql') || file.endsWith('.SQL')) {
        const fullPath = resolve(path, file)
        let fullFile = await readFile(fullPath, { encoding: 'utf8' })
        fullFile = fullFile.replaceAll('\n', '')

        fullFile.split(';').forEach((sql) => queries.push(sql + ';'))
      }
    }
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  return queries
}
