import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { addDeveloper, updateDeveloper } from '../services/api'

const DeveloperForm = ({ onDeveloperAdded, onDeveloperUpdated, editingDeveloper, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    customRole: '',
    techStack: '',
    experience: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Populate form when editing
  useEffect(() => {
    if (editingDeveloper) {
      const standardRoles = ['Frontend', 'Backend', 'Full-Stack', 'DevOps', 'Mobile', 'QA', 'Data Scientist', 'UI/UX Designer', 'Product Manager', 'Tech Lead']
      const isStandardRole = standardRoles.includes(editingDeveloper.role)
      
      setFormData({
        name: editingDeveloper.name,
        role: isStandardRole ? editingDeveloper.role : 'Other',
        customRole: isStandardRole ? '' : editingDeveloper.role,
        techStack: editingDeveloper.techStack.join(', '),
        experience: editingDeveloper.experience.toString(),
      })
    } else {
      setFormData({
        name: '',
        role: '',
        customRole: '',
        techStack: '',
        experience: '',
      })
    }
  }, [editingDeveloper])

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.role) {
      newErrors.role = 'Role is required'
    } else if (formData.role === 'Other' && !formData.customRole.trim()) {
      newErrors.customRole = 'Please enter a custom role'
    }

    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required'
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience is required'
    } else if (isNaN(formData.experience) || parseFloat(formData.experience) < 0) {
      newErrors.experience = 'Experience must be a non-negative number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setSubmitting(true)

    try {
      const finalRole = formData.role === 'Other' ? formData.customRole.trim() : formData.role
      
      const developerData = {
        name: formData.name.trim(),
        role: finalRole,
        techStack: formData.techStack.trim(),
        experience: parseFloat(formData.experience),
      }

      if (editingDeveloper) {
        // Update existing developer
        const response = await updateDeveloper(editingDeveloper.id, developerData)
        if (response.success) {
          toast.success('Developer updated successfully!')
          setFormData({
            name: '',
            role: '',
            customRole: '',
            techStack: '',
            experience: '',
          })
          onDeveloperUpdated(response.data)
          if (onCancelEdit) onCancelEdit()
        }
      } else {
        // Add new developer
        const response = await addDeveloper(developerData)
        if (response.success) {
          toast.success('Developer added successfully!')
          setFormData({
            name: '',
            role: '',
            customRole: '',
            techStack: '',
            experience: '',
          })
          onDeveloperAdded(response.data)
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || (editingDeveloper ? 'Failed to update developer' : 'Failed to add developer')
      toast.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 ${
            errors.name 
              ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 bg-white focus:ring-gray-900 focus:border-gray-900 hover:border-gray-400'
          }`}
          placeholder="Enter developer name"
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.name}</p>
        )}
      </div>

      {/* Role Field */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Role <span className="text-red-500">*</span>
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 appearance-none bg-white ${
            errors.role 
              ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-gray-900 focus:border-gray-900 hover:border-gray-400'
          }`}
        >
          <option value="">Select a role</option>
          <option value="Frontend">Frontend Developer</option>
          <option value="Backend">Backend Developer</option>
          <option value="Full-Stack">Full-Stack Developer</option>
          <option value="DevOps">DevOps Engineer</option>
          <option value="Mobile">Mobile Developer</option>
          <option value="QA">QA Engineer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="Tech Lead">Tech Lead</option>
          <option value="Other">Other (Specify)</option>
        </select>
        {errors.role && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.role}</p>
        )}
        
        {/* Custom Role Input - Shows when "Other" is selected */}
        {formData.role === 'Other' && (
          <div className="mt-3">
            <label
              htmlFor="customRole"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Custom Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="customRole"
              name="customRole"
              value={formData.customRole}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.customRole 
                  ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 bg-white focus:ring-gray-900 focus:border-gray-900 hover:border-gray-400'
              }`}
              placeholder="Enter custom role (e.g., Security Engineer, ML Engineer)"
            />
            {errors.customRole && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.customRole}</p>
            )}
          </div>
        )}
      </div>

      {/* Tech Stack Field */}
      <div>
        <label
          htmlFor="techStack"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Tech Stack <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="techStack"
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 ${
            errors.techStack 
              ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 bg-white focus:ring-gray-900 focus:border-gray-900 hover:border-gray-400'
          }`}
          placeholder="e.g., React, Node.js, MongoDB"
        />
        <p className="mt-1.5 text-xs text-gray-500">Separate multiple technologies with commas</p>
        {errors.techStack && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.techStack}</p>
        )}
      </div>

      {/* Experience Field */}
      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Experience (years) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          min="0"
          step="0.5"
          className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 ${
            errors.experience 
              ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 bg-white focus:ring-gray-900 focus:border-gray-900 hover:border-gray-400'
          }`}
          placeholder="e.g., 3.5"
        />
        {errors.experience && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.experience}</p>
        )}
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex gap-3">
        {editingDeveloper && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={submitting}
            className="flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className={`${editingDeveloper ? 'flex-1' : 'w-full'} py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
            submitting
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 shadow-sm hover:shadow-md active:scale-[0.98]'
          }`}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {editingDeveloper ? 'Updating...' : 'Adding...'}
            </span>
          ) : (
            editingDeveloper ? 'Update Developer' : 'Add Developer'
          )}
        </button>
      </div>
    </form>
  )
}

export default DeveloperForm

