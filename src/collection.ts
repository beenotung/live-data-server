import { Router } from 'express'
import { Collection } from 'live-data-sync'
import { db } from './db'

let routes = Router()
export default routes

export let collection = new Collection(db)

/* get all */
routes.get('/:table', (req, res) => {
  let table = req.params.table
  let data = collection.data as any
  let list = data[table] || {}

  let matches: any = {}

  for (let id in list) {
    let record = list[id]
    if (!record.delete_time) {
      matches[id] = record
    }
  }

  for (let field in req.query) {
    for (let id in matches) {
      let record = list[id]
      if (record[field] != req.query[field]) {
        delete matches[id]
      }
    }
  }

  res.json(matches)
})

/* get by id */
routes.get('/:table/:id', (req, res) => {
  let table = req.params.table
  let id = req.params.id
  let data = collection.data as any
  let list = data[table] || {}
  let record = list[id] || {}
  res.json(record)
})

/* create */
routes.post('/:table', (req, res) => {
  let table = req.params.table as any
  let id = collection.add(table, req.body)
  collection.update(table, id, { id })
  res.json(id)
})

/* update */
routes.patch('/:table/:id', (req, res) => {
  let table = req.params.table as any
  let id = req.params.id as any
  collection.update(table, id, req.body)
  res.json('updated')
})

/* delete by id */
routes.delete('/:table/:id', (req, res) => {
  let table = req.params.table
  let id = req.params.id as any
  collection.delete(table, id)
  res.json('deleted')
})
