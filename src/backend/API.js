import express from "express";
import lyricsRoutes from "./routes/lyrics.js"
import axios from "axios";

const app = express();
const PORT = 5002;
const BASE_URL = 'http://api.musixmatch.com/ws/1.1/';
const API_KEY = 'a2943de1ee91289dd09dcaefad5cab47';
var albumName = "Fearless (Taylor's Version)";

// Search for Taylor Swift
function getTaylorSwiftID() {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `artist.search?apikey=${API_KEY}&q_artist=Taylor%20Swift&page_size=1`).then((response) => {
            var id = response.data.message.body.artist_list[0].artist.artist_id;
            resolve(id);
        });
    });
}

// Get album ID by album name
function getAlbumID() {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `artist.albums.get?apikey=${API_KEY}&artist_id=259675`).then((response) => {
            for (let i = 0; i < response.data.message.body.album_list.length; i++) {
                if (response.data.message.body.album_list[i].album.album_name === `${albumName}`) {
                    var album_id = response.data.message.body.album_list[i].album.album_id;
                    console.log(album_id)
                    resolve(album_id);
                }
            }
        });
    });
}

// Search for artist ID and album name, return album ID

// Take album ID, to get tracks

// Pick individual track, track.snippet.get


app.get('/lyrics', async (req, res) => {
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID();
    res.json(album_id);
});

app.listen(PORT, () => console.log('Server running on port 5002'));