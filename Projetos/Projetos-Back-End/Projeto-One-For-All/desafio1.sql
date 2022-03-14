DROP DATABASE IF EXISTS SpotifyClone;
CREATE DATABASE SpotifyClone;

CREATE TABLE SpotifyClone.planos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plano VARCHAR(20) NOT NULL UNIQUE,
    valor_plano DOUBLE NOT NULL
) ENGINE = InnoDB;

CREATE TABLE SpotifyClone.artistas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    artista VARCHAR(30) NOT NULL UNIQUE
) ENGINE = InnoDB;

CREATE TABLE SpotifyClone.albuns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    album VARCHAR(30) NOT NULL UNIQUE,
    artista_id INT,
    ano_lancamento SMALLINT NOT NULL,
    FOREIGN KEY (artista_id) REFERENCES SpotifyClone.artistas(id)
) ENGINE = InnoDB;

CREATE TABLE SpotifyClone.usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(30) NOT NULL,
    idade TINYINT NOT NULL,
    plano_id INT,
    data_assinatura DATE NOT NULL,
    FOREIGN KEY (plano_id) REFERENCES SpotifyClone.planos(id)
) ENGINE = InnoDB;

CREATE TABLE SpotifyClone.musicas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    musica VARCHAR(50) NOT NULL,
    album_id INT,
    artista_id INT,
    duracao_segundos INT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES SpotifyClone.albuns(id),
    FOREIGN KEY (artista_id) REFERENCES SpotifyClone.artistas(id)
) ENGINE = InnoDB;

CREATE TABLE SpotifyClone.seguidores (
    usuario_id INT,
    artista_id INT,
    FOREIGN KEY (usuario_id) REFERENCES SpotifyClone.usuarios(id),
    FOREIGN KEY (artista_id) REFERENCES SpotifyClone.artistas(id),
    PRIMARY KEY (usuario_id, artista_id)
) ENGINE = InnoDB;

CREATE TABLE SpotifyClone.reproducoes (
    usuario_id INT,
    musica_id INT,
    data_reproducao DATETIME NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES SpotifyClone.usuarios(id),
    FOREIGN KEY (musica_id) REFERENCES SpotifyClone.musicas(id),
    PRIMARY KEY (usuario_id, musica_id)
) ENGINE = InnoDB;

INSERT INTO SpotifyClone.planos(plano, valor_plano)
VALUES
	('gratuito', 0),
    ('universitário', 5.99),
    ('pessoal', 6.99),
    ('familiar', 7.99);

INSERT INTO SpotifyClone.artistas(artista)
VALUES
	('Walter Phoenix'),
    ('Peter Strong'),
    ('Lance Day'),
    ('Freedie Shannon'),
    ('Tyler Isle'),
    ('Fog');

INSERT INTO SpotifyClone.albuns(album, artista_id, ano_lancamento)
VALUES
	('Envious', 1, 1990),
    ('Exuberant', 1, 1993),
    ('Hallowed Steam', 2, 1995),
    ('Incandescent', 3, 1998),
    ('Temporary Culture', 4, 2001),
    ('Library of liberty', 4, 2003),
    ('Chained Down', 5, 2007),
    ('Cabinet of fools', 5, 2012),
    ('No guarantees', 5, 2015),
    ('Apparatus', 6, 2015);

INSERT INTO SpotifyClone.usuarios(usuario, idade, plano_id, data_assinatura)
VALUES
	('Thati', 23, 1, '2019-10-20'),
    ('Cintia', 35, 4, '2017-12-30'),
    ('Bill', 20, 2, '2019-06-05'),
    ('Roger', 45, 3, '2020-05-13'),
    ('Norman', 58, 3, '2017-02-17'),
    ('Patrick', 33, 4, '2017-01-06'),
    ('Vivian', 26, 2, '2018-01-05'),
    ('Carol', 19, 2, '2018-02-14'),
    ('Angelina', 42, 4, '2018-04-29'),
    ('Paul', 46, 4, '2017-01-17');

INSERT INTO SpotifyClone.musicas(musica, album_id, artista_id, duracao_segundos)
VALUES
	('Soul For Us', 1, 1, 200),
    ('Reflections Of Magic', 1, 1, 163),
    ('Dance With Her Own', 1, 1, 116),
    ('Troubles Of My Inner Fire', 2, 1, 203),
    ('Time Fireworks', 2, 1, 152),
    ('Magic Circus', 3, 2, 105),
    ('Honey, So Do I', 3, 2, 207),
    ("Sweetie, Let's Go Wild", 3, 2, 139),
    ('She Knows', 3, 2, 244),
    ('Fantasy For Me', 4, 3, 100),
    ('Celebration Of More', 4, 3, 146),
    ('Rock His Everything', 4, 3, 223),
    ('Home Forever', 4, 3, 231),
    ('Diamond Power', 4, 3, 241),
    ("Let's Be Silly", 4, 3, 132),
    ('Thang Of Thunder', 5, 4, 240),
    ('Words Of Her Life', 5, 4, 185),
    ('Without My Streets', 5, 4, 176),
    ('Need Of The Evening', 6, 4, 190),
    ('History Of My Roses', 6, 4, 222),
    ('Without My Love', 6, 4, 111),
    ('Walking And Game', 6, 4, 123),
    ('Young And Father', 6, 4, 197),
    ('Finding My Traditions', 7, 5, 179),
    ('Walking And Man', 7, 5, 229),
    ('Hard And Time', 7, 5, 135),
    ("Honey, I'm A Lone Wolf", 7, 5, 150),
    ("She Thinks I Won't Stay Tonight", 8, 5, 166),
    ("He Heard You're Bad For Me", 8, 5, 154),
    ("He Hopes We Can't Stay", 8, 5, 210),
    ('I Know I Know', 8, 5, 117),
    ("He's Walking Away", 9, 5, 159),
    ("He's Trouble", 9, 5, 138),
    ('I Heard I Want To Bo Alone', 9, 5, 120),
    ('I Ride Alone', 9, 5, 151),
    ('Honey', 10, 6, 79),
    ('You Cheated On Me', 10, 6, 95),
    ("Wouldn't It Be Nice", 10, 6, 213),
    ('Baby', 10, 6, 136),
    ('You Make Me Feel So..', 10, 6, 83);

INSERT INTO SpotifyClone.seguidores(usuario_id, artista_id)
VALUES
	(1, 1),
    (1, 4),
    (1, 3),
    (2, 1),
    (2, 3),
    (3, 2),
    (3, 1),
    (4, 4),
    (5, 5),
    (5, 6),
    (6, 6),
    (6, 3),
    (6, 1),
    (7, 2),
    (7, 5),
    (8, 1),
    (8, 5),
    (9, 6),
    (9, 4),
    (9, 3),
    (10, 2),
    (10, 6);

INSERT INTO SpotifyClone.reproducoes(usuario_id, musica_id, data_reproducao)
VALUES
	(1, 36, '2020-02-28 10:45:55'),
    (1, 25, '2020-05-02 05:30:35'),
    (1, 23, '2020-03-06 11:22:33'),
    (1, 14, '2020-08-05 08:05:17'),
    (1, 15, '2020-09-14 16:32:22'),
    (2, 34, '2020-01-02 07:40:33'),
	(2, 24, '2020-05-16 06:16:22'),
	(2, 21, '2020-10-09 12:27:48'),
	(2, 39, '2020-09-21 13:14:46'),
	(3, 6, '2020-11-13 16:55:13'),
	(3, 3, '2020-12-05 18:38:30'),
	(3, 26, '2020-07-30 10:00:00'),
	(4, 2, '2021-08-15 17:10:10'),
	(4, 35, '2021-07-10 15:20:30'),
	(4, 27, '2021-01-09 01:44:33'),
	(5, 7, '2020-07-03 19:33:28'),
	(5, 12, '2017-02-24 21:14:22'),
	(5, 14, '2020-08-06 15:23:43'),
	(5, 1, '2020-11-10 13:52:27'),
	(6, 38, '2019-02-07 20:33:48'),
	(6, 29, '2017-01-24 00:31:17'),
	(6, 30, '2017-10-12 12:35:20'),
	(6, 22, '2018-05-29 14:56:41'),
	(7, 5, '2018-05-09 22:30:49'),
	(7, 4, '2020-07-27 12:52:58'),
	(7, 11, '2018-01-16 18:40:43'),
	(8, 39, '2018-03-21 16:56:40'),
	(8, 40, '2020-10-18 13:38:05'),
	(8, 32, '2019-05-25 08:14:03'),
	(8, 33, '2021-08-15 21:37:09'),
	(9, 16, '2021-05-24 17:23:45'),
	(9, 17, '2018-12-07 22:48:52'),
	(9, 8, '2021-03-14 06:14:26'),
	(9, 9, '2020-04-01 03:36:00'),
	(10, 20, '2017-02-06 08:21:34'),
	(10, 21, '2017-12-04 05:33:43'),
	(10, 12, '2017-07-27 05:24:49'),
	(10, 13, '2017-12-25 01:03:57');

  -- Usei como base o pull request do lucas peres, pois da forma como estava fazendo as tabelas historico (history) e seguidores (followers) não estavam sendo criadas. Estou certo de que era erro de sintaxe.