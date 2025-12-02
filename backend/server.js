const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'developers.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to read developers from file
const readDevelopers = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write developers to file
const writeDevelopers = (developers) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(developers, null, 2));
};

// GET /developers - Return list of all developers
app.get('/developers', (req, res) => {
  try {
    const developers = readDevelopers();
    res.json({ success: true, data: developers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching developers', error: error.message });
  }
});

// POST /developers - Save developer details
app.post('/developers', (req, res) => {
  try {
    const { name, role, techStack, experience } = req.body;

    // Validation
    if (!name || !role || !techStack || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, role, techStack, experience'
      });
    }

    if (typeof experience !== 'number' || experience < 0) {
      return res.status(400).json({
        success: false,
        message: 'Experience must be a non-negative number'
      });
    }

    // Allow any role (including custom roles)
    // No need to restrict roles anymore

    const developers = readDevelopers();
    const newDeveloper = {
      id: Date.now().toString(),
      name: name.trim(),
      role,
      techStack: typeof techStack === 'string' ? techStack.split(',').map(tech => tech.trim()).filter(tech => tech) : techStack,
      experience: Number(experience),
      createdAt: new Date().toISOString()
    };

    developers.push(newDeveloper);
    writeDevelopers(developers);

    res.status(201).json({
      success: true,
      message: 'Developer added successfully',
      data: newDeveloper
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding developer',
      error: error.message
    });
  }
});

// PUT /developers/:id - Update developer details
app.put('/developers/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, techStack, experience } = req.body;

    // Validation
    if (!name || !role || !techStack || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, role, techStack, experience'
      });
    }

    if (typeof experience !== 'number' || experience < 0) {
      return res.status(400).json({
        success: false,
        message: 'Experience must be a non-negative number'
      });
    }

    // Allow any role (including custom roles)
    // No need to restrict roles anymore

    const developers = readDevelopers();
    const developerIndex = developers.findIndex(dev => dev.id === id);

    if (developerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    // Update developer
    developers[developerIndex] = {
      ...developers[developerIndex],
      name: name.trim(),
      role,
      techStack: typeof techStack === 'string' ? techStack.split(',').map(tech => tech.trim()).filter(tech => tech) : techStack,
      experience: Number(experience),
      updatedAt: new Date().toISOString()
    };

    writeDevelopers(developers);

    res.json({
      success: true,
      message: 'Developer updated successfully',
      data: developers[developerIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating developer',
      error: error.message
    });
  }
});

// DELETE /developers/:id - Delete a developer
app.delete('/developers/:id', (req, res) => {
  try {
    const { id } = req.params;

    const developers = readDevelopers();
    const developerIndex = developers.findIndex(dev => dev.id === id);

    if (developerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    // Remove developer
    developers.splice(developerIndex, 1);
    writeDevelopers(developers);

    res.json({
      success: true,
      message: 'Developer deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting developer',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

