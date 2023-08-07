import express, { Router } from 'express'
import formidable from 'formidable'
import fs from 'fs'

let routes = Router()
export default routes

let counter = 0

let uploadDir = 'uploads'

fs.mkdirSync(uploadDir, { recursive: true })

routes.post('/', (req, res, next) => {
  let form = new formidable.Formidable({
    uploadDir,
    filename(name, ext, part, form): string {
      counter++
      let extname = part.mimetype?.split('/').pop()
      let time = Date.now()
      let filename = `${time}-${counter}.${extname}`
      return filename
    },
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    let file = files.file
    if (Array.isArray(file)) {
      let filenames = file.map(file => file.newFilename)
      res.json({ filenames })
    } else if (file) {
      let filenames = [file.newFilename]
      res.json({ filenames })
    } else {
      res.status(400).json({ error: 'Invalid format, missing file' })
    }
  })
})

routes.use('/', express.static('uploads'))
