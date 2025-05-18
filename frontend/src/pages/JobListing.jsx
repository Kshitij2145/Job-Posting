import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FilterPanel from '../components/job-listing/FilterPanel'
import JobCard from '../components/job-listing/JobCard'
import axios from 'axios'

const JobListing = () => {
  const location = useLocation()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  // Extract search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const searchFromUrl = queryParams.get('search')
    
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl)
    }
  }, [location.search])

  useEffect(() => {
    fetchJobs()
  }, [activeFilters, searchQuery])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      
      // Build query params for filtering
      const queryParams = new URLSearchParams()
      
      if (activeFilters.showOpenOnly) {
        queryParams.append('showOpenOnly', 'true')
      }
      
      if (activeFilters.opportunityType?.length > 0) {
        activeFilters.opportunityType.forEach(type => {
          queryParams.append('opportunityType', type)
        })
      }
      
      if (activeFilters.locations) {
        queryParams.append('locations', activeFilters.locations)
      }
      
      if (activeFilters.industry) {
        queryParams.append('industry', activeFilters.industry)
      }
      
      if (activeFilters.workplaceType?.length > 0) {
        activeFilters.workplaceType.forEach(type => {
          queryParams.append('workplaceType', type)
        })
      }
      
      if (searchQuery) {
        queryParams.append('search', searchQuery)
      }
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/jobs?${queryParams.toString()}`)
      
      // Sort jobs by posted date (newest first)
      const sortedJobs = response.data.sort((a, b) => {
        return new Date(b.postedAt) - new Date(a.postedAt)
      })
      
      setJobs(sortedJobs)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setLoading(false)
      
      // Fallback to sample data in case of API failure
      // This should be removed in production
      setJobs([])
    }
  }

  const handleFilterChange = (filters) => {
    setActiveFilters(filters)
  }
  
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Count active filters (for display)
  const countActiveFilters = () => {
    let count = 0;
    if (activeFilters.opportunityType?.length > 0) count += 1;
    if (activeFilters.workplaceType?.length > 0) count += 1;
    if (activeFilters.locations) count += 1;
    if (activeFilters.industry) count += 1;
    if (activeFilters.showOpenOnly) count += 1;
    return count;
  }

  return (
    <div className="container-custom py-6 bg-secondary fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel 
            onFilterChange={handleFilterChange} 
            activeFilters={activeFilters}
          />
        </div>
        
        {/* Job listings */}
        <div className="lg:col-span-3">
          <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-xl font-medium text-primary">
                Showing {jobs.length} opportunities
                {countActiveFilters() > 0 && (
                  <span className="ml-2 text-sm bg-primary text-light px-2 py-1 rounded-full">
                    {countActiveFilters()} active filters
                  </span>
                )}
              </h2>
              
              {searchQuery && (
                <div className="mt-2 md:mt-0 bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                  <span>Search: {searchQuery}</span>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-primary-dark"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div>
              {jobs.length > 0 ? (
                jobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-800">No jobs found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria to find more opportunities</p>
                  <button 
                    onClick={() => {
                      setActiveFilters({});
                      setSearchQuery('');
                    }}
                    className="btn btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobListing 