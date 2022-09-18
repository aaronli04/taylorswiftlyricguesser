import express from "express";
import bodyParser from "body-parser";
import songsRoutes from "./routes/songs.js"

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

app.use('/songs', songsRoutes);

app.get('/', (req, res) => {
    res.send('Hello, homepage')
});

app.listen(PORT, () => console.log('Server running on port 5001'));