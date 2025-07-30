import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await db.query(`DELETE FROM playlists_tracks`);
  await db.query(`DELETE FROM playlists`);
  await db.query(`DELETE FROM tracks`);
  await db.query(`DELETE FROM users`);

  const tracks = [];
  for (let i = 1; i <= 20; i++) {
    const track = await createTrack("Track " + i, i * 50000);
    tracks.push(track);
  }

  const user1 = await createUser("heartseeker@lo.ve", "cupid123");
  const user2 = await createUser("druid@forest.tree", "bear!");

  const playlists = [];
  for (let i = 1; i <= 20; i++) {
    const playlist = await createPlaylist(
      "Playlist " + i,
      "lorem ipsum playlist description",
      user1.id
    );
    playlists.push(playlist);
  }

  for (let i = 0; i < 15; i++) {
    const playlistIndex = Math.floor(i / 2);
    if (playlistIndex < playlists.length) {
      await createPlaylistTrack(playlists[playlistIndex].id, tracks[i].id);
    }
  }

  const user1Playlist = await createPlaylist(
    "User1 Playlist",
    "lorem ipsum playlist description",
    user1.id
  );
  for (let i = 0; i < 5; i++) {
    await createPlaylistTrack(user1Playlist.id, tracks[i].id);
  }

  const user2Playlist = await createPlaylist(
    "User2 Playlist",
    "lorem ipsum playlist description",
    user2.id
  );
  for (let i = 0; i < 5; i++) {
    await createPlaylistTrack(user2Playlist.id, tracks[i + 5].id);
  }
}
