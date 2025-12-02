# Developer Directory App

A full-stack web application for managing and discovering talented developers. Built with React (frontend) and Node.js/Express (backend).

## Features

- ✅ Add developer details (Name, Role, Tech Stack, Experience)
- ✅ Edit developer information
- ✅ Delete developers
- ✅ View list of all developers in a clean, responsive UI
- ✅ Search developers by name or tech stack
- ✅ Filter developers by role (dynamic role list)
- ✅ Form validation with error messages
- ✅ Toast notifications for success/error feedback
- ✅ Responsive design with Tailwind CSS
- ✅ Professional UI with color-coded role badges

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
│   │   │   ├── DeveloperForm.jsx    # Form component (Add/Edit)
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
      "role": "Full-Stack Developer",
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
  "role": "Full-Stack Developer",
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
    "role": "Full-Stack Developer",
    "techStack": ["React", "Node.js", "MongoDB"],
    "experience": 5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT /developers/:id
Updates an existing developer.

**Request Body:**
```json
{
  "name": "John Doe",
  "role": "Full-Stack Developer",
  "techStack": "React, Node.js, MongoDB",
  "experience": 6
}
```

**Response:**
```json
{
  "success": true,
  "message": "Developer updated successfully",
  "data": {
    "id": "1234567890",
    "name": "John Doe",
    "role": "Full-Stack Developer",
    "techStack": ["React", "Node.js", "MongoDB"],
    "experience": 6,
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

### DELETE /developers/:id
Deletes a developer from the directory.

**Response:**
```json
{
  "success": true,
  "message": "Developer deleted successfully"
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

## Usage Guide

### Adding a Developer

1. Fill in the form on the left side with developer details:
   - **Name**: Enter the developer's full name
   - **Role**: Select from dropdown (Frontend, Backend, Full-Stack, DevOps, Mobile, QA, Data Scientist, UI/UX Designer, Product Manager, Tech Lead, or "Other" for custom roles)
   - **Tech Stack**: Enter technologies separated by commas (e.g., "React, Node.js, MongoDB")
   - **Experience**: Enter years of experience (can be decimal like 3.5)
2. Click "Add Developer" button
3. You'll see a success toast notification
4. The new developer appears in the list immediately

### Editing a Developer

1. Click the "Edit" button on any developer card
2. The form will populate with the developer's current information
3. Make your changes
4. Click "Update Developer" to save changes
5. Or click "Cancel" to exit edit mode without saving

### Deleting a Developer

1. Click the "Delete" button on any developer card
2. Confirm the deletion in the popup dialog
3. The developer will be removed from the directory
4. A success toast notification will appear

### Searching Developers

- **Search by Name**: Type in the search box to filter by developer name
- **Search by Tech Stack**: Type a technology name to find developers with that skill
- Search is case-insensitive and matches partial strings
- Example: Typing "react" finds developers with "React" in their tech stack

### Filtering by Role

- Use the role dropdown to filter developers by their role
- The dropdown dynamically shows all roles present in your database
- Select "All Roles" to show everyone
- Filter works in combination with search

### Role Badge Colors

Each role has a distinct color for easy identification:
- **Frontend** → Blue
- **Backend** → Green
- **Full-Stack** → Purple
- **DevOps** → Orange
- **Mobile** → Indigo
- **QA** → Yellow
- **Data Scientist** → Pink
- **UI/UX Designer** → Cyan
- **Product Manager** → Teal
- **Tech Lead** → Red
- **Security Engineer** → Rose
- **ML Engineer** → Violet
- **Blockchain Developer** → Amber
- **Other roles** → Gray

## Validation

The form includes client-side and server-side validation:
- **Name**: Required, cannot be empty
- **Role**: Required, must be selected from dropdown or entered as custom role
- **Tech Stack**: Required, cannot be empty
- **Experience**: Required, must be a non-negative number

## Data Storage

Developers are stored in a JSON file at `backend/data/developers.json`. The file is automatically created if it doesn't exist and is updated whenever a developer is added, updated, or deleted.

## Deployment

### Quick Deploy to Vercel (Recommended)

#### Backend
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to backend: `cd backend`
3. Run: `vercel`
4. Follow prompts and set root directory to `backend`

#### Frontend
1. Navigate to frontend: `cd frontend`
2. Run: `vercel`
3. Add environment variable: `VITE_API_URL` = your backend URL
4. Redeploy

### Other Hosting Options

- **Netlify** (Frontend) + **Railway** (Backend)
- **Render** (Both frontend & backend)
- **Heroku** (Backend only, paid)

For detailed deployment instructions, see the deployment section in your hosting platform's documentation.

## Development Notes

- The frontend uses React functional components with hooks (useState, useEffect)
- All API calls are made through the `api.js` service file
- Toast notifications provide user feedback for all operations
- The UI is fully responsive and works on mobile, tablet, and desktop
- Tailwind CSS is used for all styling
- Role filter dropdown dynamically populates from database
- Color-coded role badges for visual identification

## License

ISC
