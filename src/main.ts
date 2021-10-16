import { config } from 'dotenv'
import './repositories/database'
import Application from './app'

config()
const app = Application()

app.listen(3000, () => console.log('App is running in http://localhost:3000'))
