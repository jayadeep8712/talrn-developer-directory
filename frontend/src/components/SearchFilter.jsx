import { useState, useEffect, useMemo } from 'react'

const SearchFilter = ({ developers, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  // Get all unique roles from developers
  const uniqueRoles = useMemo(() => {
    const roles = developers.map(dev => dev.role)
    return [...new Set(roles)].sort()
  }, [developers])

  useEffect(() => {
    let filtered = [...developers]

    // Filter by search term (name or tech stack)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (dev) =>
          dev.name.toLowerCase().includes(term) ||
          dev.techStack.some((tech) =>
            tech.toLowerCase().includes(term)
          )
      )
    }

    // Filter by role
    if (roleFilter) {
      filtered = filtered.filter((dev) => dev.role === roleFilter)
    }

    onFilter(filtered)
  }, [searchTerm, roleFilter, developers, onFilter])

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search Input */}
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by name or tech stack..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 hover:border-gray-400 transition-all"
        />
      </div>

      {/* Role Filter */}
      <div className="sm:w-44">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 appearance-none bg-white hover:border-gray-400 transition-all"
        >
          <option value="">All Roles</option>
          {uniqueRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      {(searchTerm || roleFilter) && (
        <button
          onClick={() => {
            setSearchTerm('')
            setRoleFilter('')
          }}
          className="px-4 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm font-medium border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow"
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default SearchFilter

