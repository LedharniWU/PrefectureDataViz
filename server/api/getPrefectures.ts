import axios from 'axios'
import { eventHandler } from 'h3'

export default eventHandler(async () => {
  try {
    const response = await axios.get(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      {
        headers: { 'X-API-KEY': process.env.RESAS_API_KEY }
      }
    )

    return response.data
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal Server Error' })
    }
  }
})
