SELECT m.musica AS cancao,
COUNT(r.usuario_id) AS reproducoes
FROM
SpotifyClone.musicas AS m
INNER JOIN 
SpotifyClone.reproducoes AS r
ON m.id = r.musica_id
GROUP BY cancao
ORDER BY reproducoes DESC,
cancao LIMIT 2;