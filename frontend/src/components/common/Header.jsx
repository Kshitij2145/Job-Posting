import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to job listing page with search query
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="bg-primary text-white">
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">GLB.Connect</Link>
          </div>
          
          <div className="w-full md:w-auto flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search by name, location, company or department..."
                className="w-full py-2 px-4 pr-10 rounded-md text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <nav className="flex items-center space-x-6">
            <Link to="/" className="hover:underline">Jobs</Link>
            <Link to="/create" className="btn btn-primary bg-white text-primary hover:bg-gray-200">Post an Opportunity</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 