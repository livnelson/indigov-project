import { Router } from 'express'
import {
  getAllConstituents,
  getNewConstituents,
  createConstituent,
  exportConstituents,
  deleteConstituent,
} from '../controllers/ConstituentController'

const router = Router()

router.get('/', getAllConstituents) // Get all constituents
router.get('/new', getNewConstituents) // Get new constituents (last 7 days)
router.post('/', createConstituent) // Add a new constituent
router.get('/export', exportConstituents) // Export constituents to CSV
router.delete('/:id', deleteConstituent) // Delete a constituent by ID

export default router
