# Developer Directory App

A full-stack web application for managing and discovering talented developers. Built with React (frontend) and Node.js/Express (backend).

## Features

- ✅ Add developer details (Name, Role, Tech Stack, Experience)
- ✅ View list of all developers in a clean, responsive UI
- ✅ Search developers by name or tech stack
- ✅ Filter developers by role (Frontend, Backend, Full-Stack)
- ✅ Form validation with error messages
- ✅ Toast notifications for success/error feedback
- ✅ Responsive design with Tailwind CSS
- ✅ Modern, clean UI with gradient backgrounds

## Tech Stack

### Frontend
- **React 18** - UI library with functional components and hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Hot Toast** - Toast notification library
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **CORS** - Cross-origin resource sharing middleware
- **Body Parser** - Request body parsing middleware
- **JSON File Storage** - Simple file-based data persistence

## Project Structure

```
H-GEMINIAPI/
├── backend/
│   ├── data/
│   │   └── developers.json      # JSON database file
│   ├── server.js                # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeveloperForm.jsx    # Form component
│   │   │   ├── DeveloperList.jsx    # List display component
│   │   │   └── SearchFilter.jsx     # Search/filter component
│   │   ├── services/
│   │   │   └── api.js               # API service functions
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
# Development mode (with nodemon for auto-restart)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Build for Production

To build the frontend for production:
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## API Endpoints

### GET /developers
Returns a list of all developers.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1234567890",
      "name": "John Doe",
      "role": "Full-Stack",
      "techStack": ["React", "Node.js", "MongoDB"],
      "experience": 5,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /developers
Adds a new developer to the directory.

**Request Body:**
```json
{
  "name": "John Doe",
  "role": "Full-Stack",
  "techStack": "React, Node.js, MongoDB",
  "experience": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Developer added successfully",
  "data": {
    "id": "1234567890",
    "name": "John Doe",
    "role": "Full-Stack",
    "techStack": ["React", "Node.js", "MongoDB"],
    "experience": 5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

## Usage

1. **Add a Developer:**
   - Fill in the form on the left side with developer details
   - Select a role from the dropdown (Frontend, Backend, or Full-Stack)
   - Enter tech stack as comma-separated values (e.g., "React, Node.js, MongoDB")
   - Enter experience in years (can be a decimal like 3.5)
   - Click "Add Developer" button

2. **View Developers:**
   - All developers are displayed in the list on the right side
   - Each developer card shows name, role badge, tech stack tags, and experience

3. **Search Developers:**
   - Use the search box to filter by name or tech stack
   - The search is case-insensitive and matches partial strings

4. **Filter by Role:**
   - Use the role dropdown to filter developers by their role
   - Select "All Roles" to show everyone

5. **Clear Filters:**
   - Click "Clear Filters" button to reset search and role filters

## Validation

The form includes client-side and server-side validation:
- **Name:** Required, cannot be empty
- **Role:** Required, must be one of: Frontend, Backend, Full-Stack
- **Tech Stack:** Required, cannot be empty
- **Experience:** Required, must be a non-negative number

## Data Storage

Developers are stored in a JSON file at `backend/data/developers.json`. The file is automatically created if it doesn't exist and is updated whenever a new developer is added.

## Development Notes

- The frontend uses React functional components with hooks (useState, useEffect)
- All API calls are made through the `api.js` service file
- Toast notifications provide user feedback for all operations
- The UI is fully responsive and works on mobile, tablet, and desktop
- Tailwind CSS is used for all styling

## License

ISC

