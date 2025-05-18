import { Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import JobListing from './pages/JobListing'
import PostJob from './pages/PostJob'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<JobListing />} />
          <Route path="/create" element={<PostJob />} />
        </Routes>
      </main>
    </div>
  )
}

export default App 