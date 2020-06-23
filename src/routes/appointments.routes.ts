import { Router } from 'express'
import { uuid } from 'uuidv4'

const router = Router()

let appointments = []

router.post('/', (request, response) => {
  const { provider, date } = request.body
  const appointment = { id: uuid(), provider, date }

  appointments = [...appointments, appointment]

  return response.json({ appointment })
})

export default router
