import express from 'express'
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js'

const router = express.Router()

// Route: /api/jobs
router.route('/')
  .get(getJobs)
  .post(createJob)

// Route: /api/jobs/:id
router.route('/:id')
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob)

export default router 