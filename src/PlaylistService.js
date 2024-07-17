const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistById(playlistId){
        const queryPlaylist = {
            text: 'SELECT id, name FROM playlists WHERE id = $1',
            values: [playlistId],
        }

        const result = await this._pool.query(queryPlaylist);

        if(!result.rowCount) {
            throw new NotFoundError('playlist tidak ditemukan');
        }

        const playlist = result.rows[0];

        const querySongsInPlaylist = {
            text: 'SELECT song_id FROM playlist_songs WHERE playlist_id = $1',
            values: [playlist.id]
        }

        const song = await this._pool.query(querySongsInPlaylist);

        const querySongs = {
            text: 'SELECT id, title, performer FROM songs WHERE id = $1',
            values: [song.rows[0].id]
        }

        const resultSong = await this.Pool.query(querySongs);

        playlist.songs = resultSong.rows;

        return playlist
    }
}

module.exports = PlaylistsService;