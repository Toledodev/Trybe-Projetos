SELECT u.usuario,
  IF(
		MAX(r.data_reproducao) >= '2021-01-01 00:00:00'
        AND MAX(r.data_reproducao) <= '2021-12-31 23:59:59',
        'Usuário ativo',
        'Usuário inativo'
    ) AS condicao_usuario
FROM SpotifyClone.usuarios AS u
JOIN SpotifyClone.reproducoes AS r
WHERE u.id = r.usuario_id
GROUP BY u.usuario
ORDER BY u.usuario;
