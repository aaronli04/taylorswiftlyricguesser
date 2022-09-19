import userEvent from '@testing-library/user-event';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


const router = express.Router();

// All routes in here start with /songs
// Load lyrics in database
router.get('/', (req, res) => {
    res.send('hello');
});

// Get artist ID through Axios

// Search for artist ID and album name, return album ID

// Take album ID, to get tracks

// Pick individual track, track.snippet.get

export default router;