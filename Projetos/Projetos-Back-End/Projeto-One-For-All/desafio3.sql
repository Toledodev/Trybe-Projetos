SELECT
	usuarios.usuario AS usuario,
	COUNT(reproducoes.musica_id) AS qtde_musicas_ouvidas,
	FORMAT((SUM(musicas.duracao_segundos) / 60), 2) AS total_minutos
FROM
	SpotifyClone.usuarios AS usuarios
INNER JOIN
	SpotifyClone.reproducoes AS reproducoes
    ON usuarios.id = reproducoes.usuario_id
INNER JOIN
	SpotifyClone.musicas AS musicas
    ON reproducoes.musica_id = musicas.id
GROUP BY
	usuario
ORDER BY
	usuario;