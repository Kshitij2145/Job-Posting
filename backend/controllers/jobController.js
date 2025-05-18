import prisma from '../config/db.js'

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    const {
      showOpenOnly,
      opportunityType,
      locations,
      industry,
      workplaceType,
      salary,
      skills,
      experience,
      search
    } = req.query

    // Build filter conditions
    const filters = {}

    // Add open status filter
    if (showOpenOnly === 'true') {
      filters.isOpen = true
    }

    // Add opportunity type filter
    if (opportunityType && opportunityType.length > 0) {
      filters.opportunityType = {
        in: Array.isArray(opportunityType) ? opportunityType : [opportunityType]
      }
    }

    // Add location filter (fuzzy search)
    if (locations) {
      filters.locations = {
        contains: locations,
        mode: 'insensitive'
      }
    }

    // Add industry filter (fuzzy search)
    if (industry) {
      filters.industry = {
        contains: industry,
        mode: 'insensitive'
      }
    }

    // Add workplace type filter
    if (workplaceType && workplaceType.length > 0) {
      filters.workplaceType = {
        in: Array.isArray(workplaceType) ? workplaceType : [workplaceType]
      }
    }

    // Add search query across multiple fields
    if (search) {
      filters.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
        { locations: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Advanced filters for salary and experience would go here
    // These would be more complex and involve relations

    const jobs = await prisma.job.findMany({
      where: filters,
      include: {
        salary: true,
        requirements: true
      },
      orderBy: {
        postedAt: 'desc'
      }
    })

    res.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        salary: true,
        requirements: true
      }
    })

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.json(job)
  } catch (error) {
    console.error('Error fetching job:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Create a new job posting
// @route   POST /api/jobs
// @access  Private
export const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      companyWebsite,
      companyDescription,
      contactName,
      contactEmail,
      contactPhone,
      description,
      locations,
      industry,
      workplaceType,
      opportunityType,
      salaryCurrency,
      salaryType,
      salaryMin,
      salaryMax,
      requiredSkills,
      minExperience,
      maxExperience,
      education,
      deadline,
      applicationMethod,
      applicationEmail,
      applicationUrl,
      applicationLink,
      applicationInPersonDetails
    } = req.body

    // Validate required fields
    if (!applicationLink) {
      return res.status(400).json({ message: 'Application link is required' });
    }

    // Create job with nested relations
    const job = await prisma.job.create({
      data: {
        title,
        companyName,
        companyWebsite,
        companyDescription,
        contactName,
        contactEmail,
        contactPhone,
        description,
        locations,
        industry,
        workplaceType,
        opportunityType,
        salary: {
          create: {
            currency: salaryCurrency || 'INR',
            type: salaryType || 'per year',
            minAmount: salaryMin ? parseFloat(salaryMin) : null,
            maxAmount: salaryMax ? parseFloat(salaryMax) : null
          }
        },
        requirements: {
          create: {
            skills: requiredSkills,
            minExperience: minExperience ? parseInt(minExperience) : null,
            maxExperience: maxExperience ? parseInt(maxExperience) : null,
            education,
            applicationDeadline: deadline ? new Date(deadline) : null,
            applicationMethod: applicationMethod || 'website',
            applicationEmail,
            applicationUrl,
            applicationLink,
            applicationInPersonDetails
          }
        }
      },
      include: {
        salary: true,
        requirements: true
      }
    })

    res.status(201).json(job)
  } catch (error) {
    console.error('Error creating job:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc    Update a job posting
// @route   PUT /api/jobs/:id
// @access  Private
export const updateJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      companyWebsite,
      companyDescription,
      contactName,
      contactEmail,
      contactPhone,
      description,
      locations,
      industry,
      workplaceType,
      opportunityType,
      salaryCurrency,
      salaryType,
      salaryMin,
      salaryMax,
      requiredSkills,
      minExperience,
      maxExperience,
      education,
      deadline,
      applicationMethod,
      applicationEmail,
      applicationUrl,
      applicationLink,
      applicationInPersonDetails,
      isOpen
    } = req.body

    const jobId = parseInt(req.params.id)

    // Validate required fields
    if (!applicationLink) {
      return res.status(400).json({ message: 'Application link is required' });
    }

    // Update job and its relations
    const job = await prisma.job.update({
      where: {
        id: jobId
      },
      data: {
        title,
        companyName,
        companyWebsite,
        companyDescription,
        contactName,
        contactEmail,
        contactPhone,
        description,
        locations,
        industry,
        workplaceType,
        opportunityType,
        isOpen,
        salary: {
          update: {
            currency: salaryCurrency,
            type: salaryType,
            minAmount: salaryMin ? parseFloat(salaryMin) : null,
            maxAmount: salaryMax ? parseFloat(salaryMax) : null
          }
        },
        requirements: {
          update: {
            skills: requiredSkills,
            minExperience: minExperience ? parseInt(minExperience) : null,
            maxExperience: maxExperience ? parseInt(maxExperience) : null,
            education,
            applicationDeadline: deadline ? new Date(deadline) : null,
            applicationMethod: applicationMethod || 'website',
            applicationEmail,
            applicationUrl,
            applicationLink,
            applicationInPersonDetails
          }
        }
      },
      include: {
        salary: true,
        requirements: true
      }
    })

    res.json(job)
  } catch (error) {
    console.error('Error updating job:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Delete a job posting
// @route   DELETE /api/jobs/:id
// @access  Private
export const deleteJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id)

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: {
        id: jobId
      }
    })

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    // Delete job (cascade will handle relations)
    await prisma.job.delete({
      where: {
        id: jobId
      }
    })

    res.json({ message: 'Job removed' })
  } catch (error) {
    console.error('Error deleting job:', error)
    res.status(500).json({ message: 'Server error' })
  }
} 