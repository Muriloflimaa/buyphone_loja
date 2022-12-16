import { NextApiRequest, NextApiResponse } from 'next'
import superagent from 'superagent'
const { parseCookies, destroyCookie } = require('nookies')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { '@BuyPhone:Token': token } = parseCookies({ req })
  const { body, method } = req
  const { api }: any = req.query
  const UrlRequest = api.join('/')

  if (method === 'POST') {
    try {
      const URL = `${process.env.API_URL}/${UrlRequest}`
      const response = await superagent
        .post(URL)
        .send(body) // sends a JSON post body
        // .set('X-API-Key', 'foobar') para adicionar key api
        .set('Content-Type', 'Application/json')
        .set('Authorization', `Bearer ${token}`)
      res.status(response.status).json(JSON.parse(response.text))
    } catch (err: any) {
      if (err.status === 401) {
        destroyCookie({ req }, '@BuyPhone:Token')
      }
      res.status(err.status).json(JSON.parse(err.response.text))
      // return err
    }
  } else if (method === 'GET') {
    try {
      const URL = `${process.env.API_URL}/${UrlRequest}`
      const response = await superagent
        .get(URL)
        .send(body)
        // .set('X-API-Key', 'foobar') para adicionar key api
        .set('Content-Type', 'Application/json')
        .set('Authorization', `Bearer ${token}`)
      res.status(response.status).json(JSON.parse(response.text))
    } catch (err: any) {
      if (err.status === 401) {
        destroyCookie({ req }, '@BuyPhone:Token')
      }
      res.status(err.status).json(JSON.parse(err.response.text))
    }
  } else if (method === 'DELETE') {
    try {
      const URL = `${process.env.API_URL}/${UrlRequest}`
      const response = await superagent
        .delete(URL)
        .send(body)
        // .set('X-API-Key', 'foobar') para adicionar key api
        .set('Content-Type', 'Application/json')
        .set('Authorization', `Bearer ${token}`)
      res.status(response.status).json(JSON.parse(response.text))
    } catch (err: any) {
      if (err.status === 401) {
        destroyCookie({ req }, '@BuyPhone:Token')
      }
      res.status(err.status).json(JSON.parse(err.response.text))
    }
  } else if (method === 'PUT') {
    try {
      const URL = `${process.env.API_URL}/${UrlRequest}`
      const response = await superagent
        .put(URL)
        .send(body)
        // .set('X-API-Key', 'foobar') para adicionar key api
        .set('Content-Type', 'Application/json')
        .set('Authorization', `Bearer ${token}`)
      res.status(response.status).json(JSON.parse(response.text))
    } catch (err: any) {
      if (err.status === 401) {
        destroyCookie({ req }, '@BuyPhone:Token')
      }
      res.status(err.status).json(JSON.parse(err.response.text))
    }
  }
}
