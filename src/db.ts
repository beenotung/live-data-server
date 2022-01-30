import { newDB } from 'better-sqlite3-schema'

export let db = newDB({
  path: 'state.db',
  migrate: false,
})
