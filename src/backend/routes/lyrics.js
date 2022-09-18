import userEvent from '@testing-library/user-event';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const lyrics = [
    {
        songTitle: "You Belong With Me",
        lyrics: "You're on the phone with your girlfriend, she's upset"
    }
]

// All routes in here start with /songs
// Load lyrics in database
router.get('/', (req, res) => {
    res.send(lyrics);
});

// Add lyrics to database from POST requests - find way to pull from Musixmatch API
router.post('/', (req, res) => {

    const lyric = req.body;

    // Create unique ID for each lyric
    const lyricWithId = {...lyric, id: uuidv4()}
    lyrics.push(lyricWithId);

    res.send(`Lyrics: ${lyricWithId.lyrics} from song ${lyricWithId.songTitle} added to the database.`);
});

export default router;