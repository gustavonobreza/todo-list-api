import { Database } from 'sqlite3'
import { promisify } from 'util'
import Todo from 'src/models/Todo'

export default class TodoRepository {
  static readonly queries = {
    all: 'SELECT * FROM todo ORDER BY updatedAt DESC;',
  }
  constructor(private readonly db: Database) {}

  async all(): Promise<Todo[]> {
    const all = promisify<string, Todo[]>(this.db.all).bind(this.db)
    const fetched = await all(TodoRepository.queries.all)

    return fetched.map(({ createdAt, updatedAt, ...rest }) => ({
      ...rest,
      createdAt: new Date(createdAt).toISOString(),
      updatedAt: new Date(updatedAt).toISOString(),
    }))
  }
}
