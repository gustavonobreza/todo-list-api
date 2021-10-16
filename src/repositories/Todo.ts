import { Database } from 'sqlite3'
import Todo from 'src/models/Todo'

export default class TodoRepository {
  private readonly queries = {
    all: 'SELECT * FROM todo;',
  }
  constructor(private readonly db: Database) {}

  async all(): Promise<Todo[]> {
    return new Promise((res, rej) => {
      this.db.all(this.queries.all, (err, row /*: Todo[]*/) => {
        if (err) {
          console.error(err)
          rej(err)
          return
        }
        console.log(row)
        res(row)
      })
    })
  }
}
