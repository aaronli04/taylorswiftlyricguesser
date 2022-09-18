import express from "express";
import bodyParser from "body-parser";
import lyricsRoutes from "./routes/lyrics.js"

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

app.use('/lyrics', lyricsRoutes);

app.get('/', (req, res) => {
    res.send('Hello, homepage')
});

app.listen(PORT, () => console.log('Server running on port 5001'));