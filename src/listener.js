class Listener {
    constructor(playlistService, mailSender) {
        this._playlistService = playlistService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message){
        try{
            const { playlist, targetEmail } = JSON.parse(message.content.toString());

            const playlistId = playlist.id;

            const playlists = await this._playlistService.getPlaylistById(playlistId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlists));
            console.log(result);
        } catch(error) {
            console.error(error)
        }
    }
}

module.exports = Listener;