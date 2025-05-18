import React, { useState, useEffect } from 'react'

const CompanyDetailsForm = ({ formData, updateFormData, prevStep, submitForm, isSubmitting: parentIsSubmitting, submitError }) => {
  const [localIsSubmitting, setLocalIsSubmitting] = useState(false)
  
  // Use the parent isSubmitting state if provided, otherwise use local state
  const isSubmitting = parentIsSubmitting !== undefined ? parentIsSubmitting : localIsSubmitting

  const handleChange = (e) => {
    const { name, value } = e.target
    updateFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Only set local submitting state if parent isn't controlling it
    if (parentIsSubmitting === undefined) {
      setLocalIsSubmitting(true)
    }
    
    try {
      await submitForm()
      // Success is handled in the parent component
    } catch (error) {
      console.error('Error submitting form:', error)
      // Only manage local state if parent isn't controlling it
      if (parentIsSubmitting === undefined) {
        setLocalIsSubmitting(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-2 text-gray-600 text-sm">
        Fields marked <span className="text-red-500">*</span> are mandatory
      </div>

      {/* Display error if present */}
      {submitError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200 mb-4">
          <p className="font-medium">Submission Error</p>
          <p className="text-sm">{submitError}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">
            Company Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName || ''}
            onChange={handleChange}
            placeholder="Enter company name"
            className="input-field"
            required
          />
        </div>

        {/* Company Website */}
        <div>
          <label htmlFor="companyWebsite" className="block text-gray-700 font-medium mb-2">
            Company Website
          </label>
          <input
            type="url"
            id="companyWebsite"
            name="companyWebsite"
            value={formData.companyWebsite || ''}
            onChange={handleChange}
            placeholder="https://example.com"
            className="input-field"
          />
        </div>

        {/* Company Logo */}
        <div>
          <label htmlFor="companyLogo" className="block text-gray-700 font-medium mb-2">
            Company Logo
          </label>
          <input
            type="file"
            id="companyLogo"
            name="companyLogo"
            accept="image/*"
            className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-blue-700"
          />
          <p className="text-sm text-gray-500 mt-1">Maximum file size: 2MB. Recommended dimensions: 200x200px</p>
        </div>

        {/* Company Description */}
        <div>
          <label htmlFor="companyDescription" className="block text-gray-700 font-medium mb-2">
            Company Description
          </label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            value={formData.companyDescription || ''}
            onChange={handleChange}
            placeholder="Enter a brief description of your company"
            className="input-field"
            rows="4"
          />
        </div>

        {/* Contact Person */}
        <div>
          <label htmlFor="contactName" className="block text-gray-700 font-medium mb-2">
            Contact Person<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName || ''}
            onChange={handleChange}
            placeholder="Enter contact person's name"
            className="input-field"
            required
          />
        </div>

        {/* Contact Email */}
        <div>
          <label htmlFor="contactEmail" className="block text-gray-700 font-medium mb-2">
            Contact Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail || ''}
            onChange={handleChange}
            placeholder="Enter contact email"
            className="input-field"
            required
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label htmlFor="contactPhone" className="block text-gray-700 font-medium mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone || ''}
            onChange={handleChange}
            placeholder="Enter contact phone number"
            className="input-field"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button 
          type="button" 
          onClick={prevStep}
          className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
          disabled={isSubmitting}
        >
          Previous Step
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Post Opportunity'
          )}
        </button>
      </div>
    </form>
  )
}

export default CompanyDetailsForm 