import * as dotenv from 'dotenv'
dotenv.config()
export default {
  EMAIL: process.env.EMAIL ?? '',
  PASSWORD: process.env.PASSWORD ?? '',
}
