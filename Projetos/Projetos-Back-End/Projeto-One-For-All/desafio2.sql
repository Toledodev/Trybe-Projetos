SELECT
COUNT(DISTINCT musicas.musica) AS cancoes,
COUNT(DISTINCT artistas.artista) AS artistas,
COUNT(DISTINCT albuns.album) AS albuns
FROM 
SpotifyClone.musicas AS musicas,
SpotifyClone.artistas AS artistas,
SpotifyClone.albuns AS albuns;