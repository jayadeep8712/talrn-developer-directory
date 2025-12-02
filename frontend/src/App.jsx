import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import DeveloperForm from './components/DeveloperForm'
import DeveloperList from './components/DeveloperList'
import SearchFilter from './components/SearchFilter'
import { getDevelopers, deleteDeveloper } from './services/api'

function App() {
  const [developers, setDevelopers] = useState([])
  const [filteredDevelopers, setFilteredDevelopers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingDeveloper, setEditingDeveloper] = useState(null)

  useEffect(() => {
    fetchDevelopers()
  }, [])

  const fetchDevelopers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getDevelopers()
      if (response.success) {
        setDevelopers(response.data)
        setFilteredDevelopers(response.data)
      }
    } catch (error) {
      console.error('Error fetching developers:', error)
      setError('Failed to load developers. Please check if the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeveloperAdded = (newDeveloper) => {
    setDevelopers([...developers, newDeveloper])
    setFilteredDevelopers([...developers, newDeveloper])
  }

  const handleDeveloperUpdated = (updatedDeveloper) => {
    const updatedDevelopers = developers.map(dev =>
      dev.id === updatedDeveloper.id ? updatedDeveloper : dev
    )
    setDevelopers(updatedDevelopers)
    setFilteredDevelopers(updatedDevelopers)
    setEditingDeveloper(null)
  }

  const handleEdit = (developer) => {
    setEditingDeveloper(developer)
    // Scroll to form section
    document.querySelector('.lg\\:col-span-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCancelEdit = () => {
    setEditingDeveloper(null)
  }

  const handleDelete = async (developer) => {
    if (window.confirm(`Are you sure you want to delete ${developer.name}?`)) {
      try {
        const response = await deleteDeveloper(developer.id)
        if (response.success) {
          toast.success('Developer deleted successfully!')
          // Remove from developers array
          const updatedDevelopers = developers.filter(dev => dev.id !== developer.id)
          setDevelopers(updatedDevelopers)
          // Remove from filtered array
          setFilteredDevelopers(filteredDevelopers.filter(dev => dev.id !== developer.id))
          // Clear edit mode if deleting the developer being edited
          if (editingDeveloper && editingDeveloper.id === developer.id) {
            setEditingDeveloper(null)
          }
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to delete developer'
        toast.error(errorMessage)
      }
    }
  }

  const handleFilter = (filtered) => {
    setFilteredDevelopers(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '8px',
            padding: '14px 18px',
            background: '#fff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        }}
      />
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <header className="text-center mb-10 border-b border-gray-200 pb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-xl mb-4 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Developer Directory
          </h1>
          <p className="text-gray-600 text-base">
            Manage and discover talented developers in your organization
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-8 transition-shadow hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className={`w-9 h-9 ${editingDeveloper ? 'bg-blue-600' : 'bg-gray-900'} rounded-lg flex items-center justify-center`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {editingDeveloper ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    )}
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingDeveloper ? 'Edit Developer' : 'Add Developer'}
                </h2>
              </div>
              <DeveloperForm 
                onDeveloperAdded={handleDeveloperAdded}
                onDeveloperUpdated={handleDeveloperUpdated}
                editingDeveloper={editingDeveloper}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Developers
                    </h2>
                  </div>
                  <span className="px-3.5 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold border border-gray-200">
                    {filteredDevelopers.length} {filteredDevelopers.length === 1 ? 'developer' : 'developers'}
                  </span>
                </div>
                <SearchFilter
                  developers={developers}
                  onFilter={handleFilter}
                />
              </div>

              {error ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4 border border-red-100">
                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-red-600 font-semibold mb-3 text-sm">{error}</p>
                  <button
                    onClick={fetchDevelopers}
                    className="mt-4 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm hover:shadow"
                  >
                    Retry
                  </button>
                </div>
              ) : loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-3 border-gray-200 border-t-gray-900"></div>
                  <p className="mt-5 text-gray-600 text-sm font-medium">Loading developers...</p>
                </div>
              ) : filteredDevelopers.length === 0 ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-5 border border-gray-200">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mb-2 text-sm">
                    {developers.length === 0 
                      ? "No developers yet. Add one to get started." 
                      : "No developers match your search criteria."}
                  </p>
                  {developers.length === 0 && (
                    <p className="text-gray-500 text-xs">Use the form on the left to add your first developer.</p>
                  )}
                </div>
              ) : (
                <DeveloperList 
                  developers={filteredDevelopers} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

