import express from 'express';

const router = express.Router();

// All routes in here start with /songs
router.get('/', (req, res) => {
    res.send('Hello!')
});

export default router;