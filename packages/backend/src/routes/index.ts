import { Router } from 'express'
import constituentRoutes from './constituents'
// import messageRoutes from './messages'; //Future Feature

const router = Router()

router.use('/constituents', constituentRoutes)
// router.use('/', messageRoutes); //Future Feature

export default router
