import db from "#db/client";

export async function createPlaylist(name, description, userId) {
  const sql = `
  INSERT INTO playlists
    (name, description, user_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description, userId]);
  return playlist;
}

export async function getPlaylists() {
  const sql = `
  SELECT *
  FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

export async function getPlaylistsByUserId(userId) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE user_id = $1
  `;
  const { rows: playlists } = await db.query(sql, [userId]);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getPlaylistsByUserIdAndTrackId(userId, trackId) {
  const sql = `
  SELECT DISTINCT playlists.*
  FROM playlists
  JOIN playlists_tracks ON playlists.id = playlists_tracks.playlist_id
  WHERE playlists.user_id = $1 AND playlists_tracks.track_id = $2
  `;
  const { rows: playlists } = await db.query(sql, [userId, trackId]);
  return playlists;
}
