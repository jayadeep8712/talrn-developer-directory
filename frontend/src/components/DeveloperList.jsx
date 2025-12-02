const DeveloperList = ({ developers, onEdit, onDelete }) => {
  const getRoleColor = (role) => {
    // Normalize role name for matching
    const normalizedRole = role.toLowerCase()
    
    if (normalizedRole.includes('frontend')) {
      return 'bg-blue-50 text-blue-800 border-blue-200'
    } else if (normalizedRole.includes('backend')) {
      return 'bg-green-50 text-green-800 border-green-200'
    } else if (normalizedRole.includes('full-stack') || normalizedRole.includes('fullstack')) {
      return 'bg-purple-50 text-purple-800 border-purple-200'
    } else if (normalizedRole.includes('devops')) {
      return 'bg-orange-50 text-orange-800 border-orange-200'
    } else if (normalizedRole.includes('mobile')) {
      return 'bg-indigo-50 text-indigo-800 border-indigo-200'
    } else if (normalizedRole.includes('qa') || normalizedRole.includes('quality')) {
      return 'bg-yellow-50 text-yellow-800 border-yellow-200'
    } else if (normalizedRole.includes('data') || normalizedRole.includes('scientist')) {
      return 'bg-pink-50 text-pink-800 border-pink-200'
    } else if (normalizedRole.includes('ui') || normalizedRole.includes('ux') || normalizedRole.includes('designer')) {
      return 'bg-cyan-50 text-cyan-800 border-cyan-200'
    } else if (normalizedRole.includes('product') || normalizedRole.includes('manager')) {
      return 'bg-teal-50 text-teal-800 border-teal-200'
    } else if (normalizedRole.includes('tech lead') || normalizedRole.includes('lead')) {
      return 'bg-red-50 text-red-800 border-red-200'
    } else if (normalizedRole.includes('security')) {
      return 'bg-rose-50 text-rose-800 border-rose-200'
    } else if (normalizedRole.includes('ml') || normalizedRole.includes('machine learning')) {
      return 'bg-violet-50 text-violet-800 border-violet-200'
    } else if (normalizedRole.includes('blockchain')) {
      return 'bg-amber-50 text-amber-800 border-amber-200'
    } else {
      // Default color for unknown roles
      return 'bg-gray-50 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-3">
      {developers.map((developer, index) => (
        <div
          key={developer.id}
          className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-md transition-all bg-white group"
          style={{
            animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
          }}
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-white text-base font-bold shadow-sm group-hover:shadow-md transition-shadow">
                {developer.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <h3 className="text-base font-semibold text-gray-900">
                  {developer.name}
                </h3>
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getRoleColor(
                    developer.role
                  )}`}
                >
                  {developer.role}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-xs font-medium text-gray-600 mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {developer.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-md text-xs font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-700">Experience:</span>{' '}
                    {developer.experience} year{developer.experience !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(developer)}
                      className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(developer)}
                      className="px-3 py-1.5 text-xs font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 hover:border-red-400 transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default DeveloperList

