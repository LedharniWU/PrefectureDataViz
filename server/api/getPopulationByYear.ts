import axios from 'axios'
import { eventHandler, getQuery } from 'h3'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const prefCode = query.prefCode

  try {
    const response = await axios.get(
      'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
      {
        params: {
          prefCode
        },
        headers: { 'X-API-KEY': process.env.RESAS_API_KEY }
      }
    )

    return response.data.result.data.find((i:any) => i.label === '総人口').data
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal Server Error' })
    }
  }
})
