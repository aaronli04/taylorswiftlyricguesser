import express from "express";
import axios from "axios";

const app = express();
const PORT = 5002;
const BASE_URL = 'http://api.musixmatch.com/ws/1.1/';
const API_KEY = 'a2943de1ee91289dd09dcaefad5cab47';

// Change this based on option the user selects
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
function getAlbumID(id) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `artist.albums.get?apikey=${API_KEY}&artist_id=${id}`).then((response) => {
            for (let i = 0; i < response.data.message.body.album_list.length; i++) {
                if (response.data.message.body.album_list[i].album.album_name === `${albumName}`) {
                    var album_id = response.data.message.body.album_list[i].album.album_id;
                    resolve(album_id);
                }
            }
        });
    });
}

// Take album ID, return random track ID
function getTrackID(album_id) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `album.tracks.get?apikey=${API_KEY}&album_id=${album_id}`).then((response) => {
            let album_length = response.data.message.body.track_list.length;
            let random_track = Math.floor(Math.random() * album_length);
            var track_id = response.data.message.body.track_list[random_track].track.track_id;
            resolve(track_id);
        });
    });
}

// Gets snippet from previously randomly chosen track
function getSnippet(track_id) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `track.snippet.get?apikey=${API_KEY}&track_id=${track_id}`).then((response) => {
            var snippet = response.data.message.body.snippet.snippet_body;
            resolve(snippet);
        });
    });
}

app.get('/lyrics', async (req, res) => {
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id);
    var track_id = await getTrackID(album_id);
    var snippet = await getSnippet(track_id);
    res.send(snippet);
});

app.listen(PORT, () => console.log('Server running on port 5002'));