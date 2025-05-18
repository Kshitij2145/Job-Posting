import React, { useEffect } from 'react'

const ApplicationRequirementsForm = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    updateFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Set default application method if not already set
  useEffect(() => {
    if (!formData.applicationMethod) {
      updateFormData({
        ...formData,
        applicationMethod: 'website'
      })
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Ensure applicationMethod is set before proceeding
    if (!formData.applicationMethod) {
      updateFormData({
        ...formData,
        applicationMethod: 'website'
      })
    }
    
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-2 text-gray-600 text-sm">
        Fields marked <span className="text-red-500">*</span> are mandatory
      </div>

      <div className="space-y-4">
        {/* Required Skills */}
        <div>
          <label htmlFor="requiredSkills" className="block text-gray-700 font-medium mb-2">
            Required Skills
          </label>
          <input
            type="text"
            id="requiredSkills"
            name="requiredSkills"
            value={formData.requiredSkills || ''}
            onChange={handleChange}
            placeholder="Enter comma-separated skills"
            className="input-field"
          />
          <p className="text-sm text-gray-500 mt-1">Separate skills with commas (e.g. JavaScript, React, Node.js)</p>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Experience Level<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Minimum (years)</label>
              <input
                type="number"
                name="minExperience"
                value={formData.minExperience || ''}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Maximum (years)</label>
              <input
                type="number"
                name="maxExperience"
                value={formData.maxExperience || ''}
                onChange={handleChange}
                min="0"
                placeholder="5+"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <label htmlFor="education" className="block text-gray-700 font-medium mb-2">
            Education
          </label>
          <select
            id="education"
            name="education"
            value={formData.education || ''}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select education level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's Degree</option>
            <option value="Master's">Master's Degree</option>
            <option value="PhD">PhD</option>
            <option value="Not Required">Not Required</option>
          </select>
        </div>

        {/* Application Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-gray-700 font-medium mb-2">
            Application Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline || ''}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* Application Link - MANDATORY FIELD */}
        <div>
          <label htmlFor="applicationLink" className="block text-gray-700 font-medium mb-2">
            Application Link<span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="applicationLink"
            name="applicationLink"
            value={formData.applicationLink || ''}
            onChange={handleChange}
            placeholder="https://company.com/jobs/apply"
            className="input-field"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter the direct URL where candidates can apply for this position. This link will be used for the "Apply Now" button.
          </p>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button 
          type="button" 
          onClick={prevStep}
          className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Previous Step
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          Next Step
        </button>
      </div>
    </form>
  )
}

export default ApplicationRequirementsForm 