import cors from 'cors'
import express from 'express'
import { print } from 'listening-on'
import collectionRoutes, { collection } from './collection'
import dictRoutes, { dict } from './dict'
import fileRoutes from './file'

export let app = express()

app.use(cors())
app.use(express.json())

app.use('/files', fileRoutes)
app.use('/collection', collectionRoutes)
app.use('/dict', dictRoutes)

app.post('/compact', (req, res) => {
  collection.compact()
  dict.compact()
  res.json('compacted')
})

export function startServer(port: number) {
  let server = app.listen(port, () => {
    print(port || (server.address() as any).port)
  })
  return server
}
