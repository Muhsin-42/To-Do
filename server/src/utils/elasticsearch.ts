import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  cloud: {
    id: process.env.CLOUD_ID || ''
  },
  auth: {
    username: process.env.ELASTIC_USERNAME || '',
    password: process.env.ELASTIC_PASSWORD || ''
  }
})

export default client;