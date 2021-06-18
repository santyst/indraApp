CREATE TABLE IF NOT EXISTS Users(
userId INTEGER PRIMARY KEY AUTOINCREMENT,
firstName TEXT,
lastName TEXT,
tipoDoc TEXT,
documento TEXT,
aceptaTerminos TEXT,
ssno TEXT,
imageUrl TEXT,
metadatos TEXT,
empresa NUMERIC,
regional NUMERIC,
instalacion NUMERIC,
origen NUMERIC,
step_enrol NUMERIC);


CREATE TABLE IF NOT EXISTS Usuarios(
    user TEXT UNIQUE, pass TEXT UNIQUE, nombre TEXT UNIQUE
);

INSERT or IGNORE INTO Usuarios(user, pass, nombre) VALUES ('usuario1', 'S0p0rt31', 'Usuario1');
INSERT or IGNORE INTO Usuarios(user, pass, nombre) VALUES ('usuario2', 'S0p0rt32', 'Usuario2');
INSERT or IGNORE INTO Usuarios(user, pass, nombre) VALUES ('usuario3', 'S0p0rt33', 'Usuario3');
INSERT or IGNORE INTO Usuarios(user, pass, nombre) VALUES ('usuario4', 'S0p0rt34', 'Usuario4');
INSERT or IGNORE INTO Usuarios(user, pass, nombre) VALUES ('usuario5', 'S0p0rt35', 'Usuario5');
