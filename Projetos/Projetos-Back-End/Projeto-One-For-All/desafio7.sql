SELECT
ar.artista AS artista,
al.album AS album,
COUNT(*) AS seguidores
FROM
SpotifyClone.artistas AS ar
INNER JOIN
SpotifyClone.albuns AS al
ON al.artista_id = ar.id
INNER JOIN
SpotifyClone.seguidores AS s
ON s.artista_id = ar.id
GROUP BY album
ORDER BY
seguidores DESC,
artista,
album; 