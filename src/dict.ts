import { Router } from 'express'
import { Dict } from 'live-data-sync'
import { db } from './db'

let routes = Router()
export default routes

export let dict = new Dict(db)

/* init by name */
routes.post('/:name', (req, res) => {
  let name = req.params.name
  let updatedFields = dict.init(name, req.body)
  res.json({ updatedFields })
})

/* get by name */
routes.get('/:name', (req, res) => {
  let name = req.params.name
  let record = dict.data[name]
  res.json(record)
})

/* update by name */
routes.patch('/:name', (req, res) => {
  let name = req.params.name
  dict.update(name, req.body)
  res.json('updated')
})

/* delete by name */
routes.delete('/:name', (req, res) => {
  let name = req.params.name
  dict.delete(name)
  res.json('deleted')
})
