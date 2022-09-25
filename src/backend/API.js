import express, { response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5002;
const BASE_URL = 'http://api.musixmatch.com/ws/1.1/';
const API_KEY = 'b2ac0fd6d9f658afe0bf2c4489e36def';

// Search for Taylor Swift's artist ID
function getTaylorSwiftID() {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `artist.search?apikey=${API_KEY}&q_artist=Taylor%20Swift&page_size=1`).then((response) => {
            var id = response.data.message.body.artist_list[0].artist.artist_id;
            resolve(id);
        });
    });
}

// Get the precise Taylor Swift album ID based on album the user selected
function getAlbumID(id, albumName) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `artist.albums.get?apikey=${API_KEY}&artist_id=${id}`).then((response) => {
            for (var i = 0; i < response.data.message.body.album_list.length; i++) {
                if (response.data.message.body.album_list[i].album.album_name === `${albumName}`) {
                    var album_id = response.data.message.body.album_list[i].album.album_id;
                    resolve(album_id);
                }
            }
        })
    });
}

// Takes the album ID and return random track ID from the selected album
var getTrackTry = 0;
function getTrackID(album_id) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `album.tracks.get?apikey=${API_KEY}&album_id=${album_id}&f_has_lyrics=true`).then((response) => {
                var album_length = response.data.message.body.track_list.length;
                var random_track = Math.floor(Math.random() * album_length);
                var track_id = response.data.message.body.track_list[random_track].track.track_id;
                resolve(track_id)
            })
    });
}

// Takes the track ID and gets the song name
function getTrackFromID(track_id) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `track.get?apikey=${API_KEY}&track_id=${track_id}`).then((response) => {
            var trackName = response.data.message.body.track.track_name;
            resolve(trackName);
        });
    });
}

// Gets snippet from previously randomly chosen track
var count = 0;
var lastSnippet;
function getSnippet(track_id, album_id, albumName) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + `track.snippet.get?apikey=${API_KEY}&track_id=${track_id}`).then((response) => {
            if (response.data.message.body.snippet === null || response.data.message.body.snippet === undefined) {
                count++;
                if (count < 5) {
                    getSnippet(track_id);
                }
                else {
                    var id = getTaylorSwiftID();
                    var album_id = getAlbumID(id, albumName)
                    var newTrack = getTrackID(album_id);
                    getSnippet(newTrack);
                    count = 0;
                }
            }
            else if (response.data.message.body.snippet.snippet_body !== lastSnippet) {
                var snippet = response.data.message.body.snippet.snippet_body;
                lastSnippet = snippet
                resolve(snippet);
            }
        });
    });
}

app.use(cors());


// Individual album calls/posts to make the backend easy for the frontend to interact with

// You All Over Me (feat. Maren Morris) (Taylor's Version) (From The Vault)
app.get('/lyrics/1', async (req, res) => {
    var albumName = 'You All Over Me (feat. Maren Morris) (Taylor\u2019s Version) (From The Vault)';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

// 1989
app.get('/lyrics/2', async (req, res) => {
    var albumName = '1989';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

// Lover
app.get('/lyrics/3', async (req, res) => {
    var albumName = 'Lover';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

// ...Ready For It?
app.get('/lyrics/4', async (req, res) => {
    var albumName = '...Ready For It?';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

// reputation
app.get('/lyrics/5', async (req, res) => {
    var albumName = 'reputation';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

// Red (Taylor's Version)
app.get('/lyrics/6', async (req, res) => {
    var albumName = 'Red (Taylor\'s Version)';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

// Mr. Perfectly Fine (Taylor\u2019s Version) (From The Vault)
app.get('/lyrics/7', async (req, res) => {
    var albumName = 'Mr. Perfectly Fine (Taylor\u2019s Version) (From The Vault)';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

// folklore
app.get('/lyrics/8', async (req, res) => {
    var albumName = 'folklore';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

// Fearless (Taylor's Version)
app.get('/lyrics/9', async (req, res) => {
    var albumName = 'Fearless (Taylor\'s Version)';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

// The Archer
app.get('/lyrics/10', async (req, res) => {
    var albumName = 'The Archer';
    var id = await getTaylorSwiftID();
    var album_id = await getAlbumID(id, albumName);
    var track_id = await getTrackID(album_id);
    var trackName = await getTrackFromID(track_id);
    var snippet = await getSnippet(track_id, album_id, albumName);
    var trackAndLyric = [trackName, snippet];
    var JSONTrackAndLyric = JSON.stringify(trackAndLyric);
    res.send(JSONTrackAndLyric)
});

app.listen(PORT, () => console.log('Server running on port 5002'));
