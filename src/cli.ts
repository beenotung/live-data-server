import { startServer } from './server'

startServer(+process.argv[2] || +process.env.PORT! || 0)
