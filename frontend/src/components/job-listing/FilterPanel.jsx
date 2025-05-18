import { useState, useEffect } from 'react'

const FilterPanel = ({ onFilterChange, activeFilters }) => {
  const [filters, setFilters] = useState({
    showOpenOnly: false,
    opportunityType: [],
    locations: '',
    industry: '',
    workplaceType: [],
    salary: {
      currency: 'INR',
      type: 'per year',
      min: '',
      max: ''
    },
    skills: [],
    experience: null // 'Fresher' or 'Experienced'
  })
  
  // Merge the provided activeFilters with the default state
  useEffect(() => {
    if (activeFilters) {
      // Ensure all array properties exist and are arrays
      const safeActiveFilters = {
        ...activeFilters,
        opportunityType: Array.isArray(activeFilters.opportunityType) ? activeFilters.opportunityType : [],
        workplaceType: Array.isArray(activeFilters.workplaceType) ? activeFilters.workplaceType : [],
        skills: Array.isArray(activeFilters.skills) ? activeFilters.skills : [],
        salary: {
          currency: activeFilters.salary?.currency || 'INR',
          type: activeFilters.salary?.type || 'per year',
          min: activeFilters.salary?.min || '',
          max: activeFilters.salary?.max || ''
        }
      }
      setFilters(safeActiveFilters)
    }
  }, [activeFilters])
  
  // State for managing dropdown visibility
  const [openDropdowns, setOpenDropdowns] = useState({
    opportunityType: true, // Open by default
    locations: false,
    industry: false,
    workplaceType: false,
    salary: false,
    skills: false,
    experience: false
  })

  const handleCheckboxChange = (filterType, value) => {
    const updatedFilters = { ...filters }
    
    if (filterType === 'showOpenOnly') {
      updatedFilters.showOpenOnly = !updatedFilters.showOpenOnly
    } else if (Array.isArray(updatedFilters[filterType])) {
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value)
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value]
      }
    }
    
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleTextInputChange = (filterType, value) => {
    const updatedFilters = { ...filters }
    // If clicking the same value again, clear it
    if (updatedFilters[filterType] === value) {
      updatedFilters[filterType] = ''
    } else {
    updatedFilters[filterType] = value
    }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleSalaryChange = (field, value) => {
    const updatedFilters = { 
      ...filters,
      salary: {
        ...filters.salary,
        [field]: value
      }
    }
    setFilters(updatedFilters)
    // Trigger filter update immediately for real-time filtering
    onFilterChange(updatedFilters)
  }

  const handleExperienceChange = (value) => {
    const updatedFilters = { ...filters, experience: value }
    setFilters(updatedFilters)
    // Trigger filter update immediately for real-time filtering
    onFilterChange(updatedFilters)
  }
  
  const toggleDropdown = (dropdown) => {
    setOpenDropdowns({
      ...openDropdowns,
      [dropdown]: !openDropdowns[dropdown]
    })
  }

  // Clear all filters
  const clearAllFilters = () => {
    const resetFilters = {
      showOpenOnly: false,
      opportunityType: [],
      locations: '',
      industry: '',
      workplaceType: [],
      salary: {
        currency: 'INR',
        type: 'per year',
        min: '',
        max: ''
      },
      skills: [],
      experience: null
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }
  
  // Common locations for dropdown
  const commonLocations = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 
    'Pune', 'Kolkata', 'Ahmedabad', 'Kochi', 'Pan India'
  ]
  
  // Common industries
  const commonIndustries = [
    'Information Technology', 'Banking & Finance', 'Healthcare', 
    'Manufacturing', 'Retail', 'Education', 'Marketing & Advertising',
    'Consulting', 'E-commerce', 'Transportation & Logistics'
  ]
  
  // Common skills
  const commonSkills = [
    'React', 'JavaScript', 'Python', 'Java', 'Node.js', 
    'SQL', 'Project Management', 'Marketing', 'Data Analysis', 
    'Communication', 'Leadership', 'Sales'
  ]

  // Ensure arrays exist to prevent "cannot read property 'includes' of undefined" errors
  const safeOpportunityType = Array.isArray(filters.opportunityType) ? filters.opportunityType : []
  const safeWorkplaceType = Array.isArray(filters.workplaceType) ? filters.workplaceType : []
  const safeSkills = Array.isArray(filters.skills) ? filters.skills : []

  // Handle skill selection with immediate filtering
  const handleSkillSelection = (skill) => {
    const updatedSkills = safeSkills.includes(skill)
      ? safeSkills.filter(s => s !== skill)
      : [...safeSkills, skill]
    
    const updatedFilters = {
      ...filters,
      skills: updatedSkills
    }
    
    setFilters(updatedFilters)
    // Trigger filter update immediately for real-time filtering
    onFilterChange(updatedFilters)
  }

  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.showOpenOnly || 
           safeOpportunityType.length > 0 || 
           filters.locations || 
           filters.industry || 
           safeWorkplaceType.length > 0 ||
           safeSkills.length > 0 ||
           filters.experience;
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        {hasActiveFilters() && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="border-t border-b border-gray-100 py-4">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={filters.showOpenOnly}
            onChange={() => handleCheckboxChange('showOpenOnly')}
            className="w-4 h-4 rounded text-primary focus:ring-primary transition-colors duration-200"
          />
          <span className={`text-gray-700 group-hover:text-primary transition-colors duration-200 ${filters.showOpenOnly ? 'font-medium text-primary' : ''}`}>
            Show open opportunities only
          </span>
        </label>
      </div>

      {/* Opportunity type filter */}
      <div className="filter-section">
        <div 
          className="flex justify-between items-center cursor-pointer group" 
          onClick={() => toggleDropdown('opportunityType')}
        >
          <h3 className={`font-medium text-gray-800 group-hover:text-primary transition-colors duration-200 ${safeOpportunityType.length > 0 ? 'text-primary' : ''}`}>
            Opportunity type
            {safeOpportunityType.length > 0 && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                {safeOpportunityType.length}
              </span>
            )}
          </h3>
          <svg 
            className={`w-5 h-5 transition-all duration-200 ${openDropdowns.opportunityType ? 'transform rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        {openDropdowns.opportunityType && (
          <div className="mt-3 space-y-2 pl-2 border-l-2 border-primary fade-in">
          {['Full Time', 'Internship', 'Contractual / Freelance work', 'Volunteer'].map((type) => (
              <label key={type} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                  checked={safeOpportunityType.includes(type)}
                onChange={() => handleCheckboxChange('opportunityType', type)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary transition-colors duration-200"
              />
                <span className={`text-gray-700 group-hover:text-primary transition-colors duration-200 ${safeOpportunityType.includes(type) ? 'font-medium text-primary' : ''}`}>
                  {type}
                </span>
            </label>
          ))}
        </div>
        )}
      </div>

      {/* Locations filter */}
      <div className="filter-section">
        <div className="flex justify-between items-center cursor-pointer group" onClick={() => toggleDropdown('locations')}>
          <h3 className={`font-medium text-gray-800 group-hover:text-primary transition-colors duration-200 ${filters.locations ? 'text-primary' : ''}`}>
            Locations
            {filters.locations && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                1
              </span>
            )}
          </h3>
          <svg 
            className={`w-5 h-5 transition-all duration-200 ${openDropdowns.locations ? 'transform rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        <div className={`${openDropdowns.locations ? 'mt-3 fade-in' : 'hidden'}`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search location"
              value={filters.locations || ''}
            onChange={(e) => handleTextInputChange('locations', e.target.value)}
              className="input-field focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2 pl-2 border-l-2 border-primary">
            {commonLocations.map((location) => (
              <div 
                key={location} 
                className={`text-sm cursor-pointer py-2 px-3 rounded-lg transition-all duration-200 ${
                  filters.locations === location 
                    ? 'bg-primary text-white shadow-md' 
                    : 'hover:bg-gray-50 hover:text-primary'
                }`}
                onClick={() => handleTextInputChange('locations', location)}
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry filter */}
      <div className="filter-section">
        <div className="flex justify-between items-center cursor-pointer group" onClick={() => toggleDropdown('industry')}>
          <h3 className={`font-medium text-gray-800 group-hover:text-primary transition-colors duration-200 ${filters.industry ? 'text-primary' : ''}`}>
            Industry
            {filters.industry && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                1
              </span>
            )}
          </h3>
          <svg 
            className={`w-5 h-5 transition-all duration-200 ${openDropdowns.industry ? 'transform rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        <div className="relative mt-3">
          <input
            type="text"
            placeholder="Search industry"
            value={filters.industry || ''}
            onChange={(e) => handleTextInputChange('industry', e.target.value)}
            className="input-field focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        
        {openDropdowns.industry && (
          <div className="mt-3 grid grid-cols-1 gap-2 pl-2 border-l-2 border-primary">
            {commonIndustries.map((industry) => (
              <div 
                key={industry} 
                className={`text-sm cursor-pointer py-2 px-3 rounded-lg transition-all duration-200 ${
                  filters.industry === industry 
                    ? 'bg-primary text-white shadow-md' 
                    : 'hover:bg-gray-50 hover:text-primary'
                }`}
                onClick={() => handleTextInputChange('industry', industry)}
              >
                {industry}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workplace type filter */}
      <div className="filter-section">
        <div 
          className="flex justify-between items-center cursor-pointer group" 
          onClick={() => toggleDropdown('workplaceType')}
        >
          <h3 className={`font-medium text-gray-800 group-hover:text-primary transition-colors duration-200 ${safeWorkplaceType.length > 0 ? 'text-primary' : ''}`}>
            Workplace type
            {safeWorkplaceType.length > 0 && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                {safeWorkplaceType.length}
              </span>
            )}
          </h3>
          <svg 
            className={`w-5 h-5 transition-all duration-200 ${openDropdowns.workplaceType ? 'transform rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        {openDropdowns.workplaceType && (
          <div className="mt-3 space-y-2 pl-2 border-l-2 border-primary fade-in">
          {['On-site / Work from office', 'Remote / Work from home', 'Hybrid'].map((type) => (
              <label key={type} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                  checked={safeWorkplaceType.includes(type)}
                onChange={() => handleCheckboxChange('workplaceType', type)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary transition-colors duration-200"
              />
                <span className={`text-gray-700 group-hover:text-primary transition-colors duration-200 ${safeWorkplaceType.includes(type) ? 'font-medium text-primary' : ''}`}>
                  {type}
                </span>
            </label>
          ))}
        </div>
        )}
      </div>

      {/* Salary filter */}
      <div className="filter-section">
        <div 
          className="flex justify-between items-center cursor-pointer group" 
          onClick={() => toggleDropdown('salary')}
        >
          <h3 className={`font-medium text-gray-800 group-hover:text-primary transition-colors duration-200 ${filters.salary?.min || filters.salary?.max ? 'text-primary' : ''}`}>
            Salary
            {filters.salary?.min || filters.salary?.max && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </h3>
          <svg 
            className={`w-5 h-5 transition-all duration-200 ${openDropdowns.salary ? 'transform rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        {openDropdowns.salary && (
          <div className="mt-3 pl-2 border-l-2 border-primary">
            <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select 
                  value={filters.salary?.currency || 'INR'}
              onChange={(e) => handleSalaryChange('currency', e.target.value)}
                  className="input-field focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary type</label>
            <select 
                  value={filters.salary?.type || 'per year'}
              onChange={(e) => handleSalaryChange('type', e.target.value)}
                  className="input-field focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            >
              <option value="per year">per year</option>
              <option value="per month">per month</option>
              <option value="per hour">per hour</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Min salary"
                  value={filters.salary?.min || ''}
              onChange={(e) => handleSalaryChange('min', e.target.value)}
                  className="input-field focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>
          <div className="flex items-center">
                <span className="mr-2 text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max salary"
                  value={filters.salary?.max || ''}
              onChange={(e) => handleSalaryChange('max', e.target.value)}
                  className="input-field focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>
        </div>
          </div>
        )}
      </div>

      {/* Skills filter */}
      <div className="filter-section">
        <div 
          className="flex justify-between items-center cursor-pointer group" 
          onClick={() => toggleDropdown('skills')}
        >
          <h3 className={`font-medium text-gray-800 group-hover:text-primary transition-colors duration-200 ${safeSkills.length > 0 ? 'text-primary' : ''}`}>
            Skills
            {safeSkills.length > 0 && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                {safeSkills.length} selected
              </span>
            )}
          </h3>
          <svg 
            className={`w-5 h-5 transition-all duration-200 ${openDropdowns.skills ? 'transform rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
      </div>

        {openDropdowns.skills && (
          <div className="mt-3 pl-2 border-l-2 border-primary">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by skills name"
                className="input-field focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2">
              {commonSkills.map((skill) => (
                <div 
                  key={skill} 
                  className="text-sm cursor-pointer group"
                  onClick={() => handleSkillSelection(skill)}
                >
                  <div className="flex items-center py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-50">
                    <div className={`w-3 h-3 rounded-full mr-2 transition-all duration-200 ${safeSkills.includes(skill) ? 'bg-primary' : 'bg-gray-200 group-hover:bg-gray-300'}`}></div>
                    <span className={`transition-colors duration-200 ${safeSkills.includes(skill) ? 'text-primary font-medium' : 'text-gray-700 group-hover:text-primary'}`}>
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Work experience filter */}
      <div className="filter-section">
        <div 
          className="flex justify-between items-center cursor-pointer group" 
          onClick={() => toggleDropdown('experience')}
        >
          <h3 className={`font-medium text-gray-800 group-hover:text-primary transition-colors duration-200 ${filters.experience ? 'text-primary' : ''}`}>
            Work experience
            {filters.experience && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                {filters.experience}
              </span>
            )}
          </h3>
          <svg 
            className={`w-5 h-5 transition-all duration-200 ${openDropdowns.experience ? 'transform rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
        {openDropdowns.experience && (
          <div className="mt-3 space-y-2 pl-2 border-l-2 border-primary">
            <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="radio" 
              name="experience"
              checked={filters.experience === 'Fresher'}
              onChange={() => handleExperienceChange('Fresher')}
                className="w-4 h-4 text-primary focus:ring-primary transition-colors duration-200"
            />
              <span className={`text-gray-700 group-hover:text-primary transition-colors duration-200 ${filters.experience === 'Fresher' ? 'font-medium text-primary' : ''}`}>
                Fresher
              </span>
          </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="radio" 
              name="experience"
              checked={filters.experience === 'Experienced'}
              onChange={() => handleExperienceChange('Experienced')}
                className="w-4 h-4 text-primary focus:ring-primary transition-colors duration-200"
            />
              <span className={`text-gray-700 group-hover:text-primary transition-colors duration-200 ${filters.experience === 'Experienced' ? 'font-medium text-primary' : ''}`}>
                Experienced
              </span>
          </label>
        </div>
        )}
      </div>
    </div>
  )
}

export default FilterPanel 