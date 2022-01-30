import express, { Router } from 'express'
import multer from 'multer'

let routes = Router()
export default routes

let counter = 0

let disk = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    counter++
    let ext = file.mimetype.split('/').pop()
    let time = Date.now()
    let filename = `${time}-${counter}.${ext}`
    cb(null, filename)
  },
})

let upload = multer({ storage: disk })

routes.post('/', upload.array('file'), (req, res) => {
  if (Array.isArray(req.files)) {
    let filenames = req.files.map(file => file.filename)
    res.json({ filenames })
  } else {
    res
      .status(400)
      .json({ error: 'Invalid format, should have req.files array' })
  }
})

routes.use('/', express.static('uploads'))
