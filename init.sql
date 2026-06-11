-- ============================================================
--  SCRIPT DE INICIALIZACION AUTOMATICA - PROGRESSFIT
--
--  Docker ejecuta este archivo automaticamente la PRIMERA VEZ
--  que arranca MySQL (cuando el volumen de datos esta vacio).
--
--  Crea las tablas (si no existen) y carga datos de ejemplo.
--  Como el backend usa ddl-auto=update, si las tablas ya
--  existieran no se duplican.
--
--  Credenciales de los usuarios de ejemplo:
--    test@hotmail.es   -> test12345  (USUARIO, con entrenamientos y graficas)
--    admin@hotmail.es  -> test12345  (ADMIN)
-- ============================================================

USE progressfit;

-- ------------------------------------------------------------
--  TABLAS (se crean solo si no existen)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario BIGINT NOT NULL AUTO_INCREMENT,
    altura FLOAT,
    avatar VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    fecha_registro DATETIME(6),
    is_active BIT,
    nivel_actividad ENUM ('ACTIVO','LIGERO','MODERADO','MUY_ACTIVO','SEDENTARIO'),
    nombre VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    peso_corporal FLOAT,
    peso_objetivo FLOAT,
    rol ENUM ('ADMIN','ENTRENADOR','USUARIO'),
    sexo ENUM ('HOMBRE','MUJER'),
    PRIMARY KEY (id_usuario),
    UNIQUE (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS musculos (
    id_musculo BIGINT NOT NULL AUTO_INCREMENT,
    descripcion TEXT,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_musculo)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ejercicios (
    id_ejercicio BIGINT NOT NULL AUTO_INCREMENT,
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    descripcion TEXT,
    dificultad ENUM ('AVANZADO','INTERMEDIO','PRINCIPIANTE'),
    nombre VARCHAR(100) NOT NULL,
    video_url VARCHAR(255),
    id_musculo BIGINT NOT NULL,
    PRIMARY KEY (id_ejercicio),
    CONSTRAINT FK_ejercicio_musculo FOREIGN KEY (id_musculo) REFERENCES musculos (id_musculo)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS entrenamientos (
    id_entrenamiento BIGINT NOT NULL AUTO_INCREMENT,
    comentario TEXT,
    fatigaPercibida INTEGER,
    fin DATETIME(6),
    inicio DATETIME(6) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    valoracion INTEGER,
    id_usuario BIGINT NOT NULL,
    PRIMARY KEY (id_entrenamiento),
    CONSTRAINT FK_entrenamiento_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS entrenamiento_ejercicios (
    id_entrenamiento_ejercicio BIGINT NOT NULL AUTO_INCREMENT,
    notas TEXT,
    orden INTEGER NOT NULL,
    id_ejercicio BIGINT NOT NULL,
    id_entrenamiento BIGINT NOT NULL,
    PRIMARY KEY (id_entrenamiento_ejercicio),
    CONSTRAINT FK_ee_ejercicio FOREIGN KEY (id_ejercicio) REFERENCES ejercicios (id_ejercicio),
    CONSTRAINT FK_ee_entrenamiento FOREIGN KEY (id_entrenamiento) REFERENCES entrenamientos (id_entrenamiento)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS series (
    id_serie BIGINT NOT NULL AUTO_INCREMENT,
    numero_serie INTEGER NOT NULL,
    peso FLOAT NOT NULL,
    repeticiones INTEGER NOT NULL,
    rir INTEGER,
    id_entrenamiento_ejercicio BIGINT NOT NULL,
    PRIMARY KEY (id_serie),
    CONSTRAINT FK_serie_ee FOREIGN KEY (id_entrenamiento_ejercicio) REFERENCES entrenamiento_ejercicios (id_entrenamiento_ejercicio)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS registros_peso (
    idRegistroPeso BIGINT NOT NULL AUTO_INCREMENT,
    fecha DATE NOT NULL,
    peso FLOAT NOT NULL,
    id_usuario BIGINT NOT NULL,
    PRIMARY KEY (idRegistroPeso),
    CONSTRAINT FK_registropeso_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
--  1. USUARIOS (contraseña cifrada en BCrypt = test12345)
-- ------------------------------------------------------------
INSERT INTO usuarios (id_usuario, nombre, email, password_hash, altura, peso_corporal, peso_objetivo, fecha_nacimiento, sexo, nivel_actividad, rol, is_active, fecha_registro, avatar) VALUES
(1, 'Test',  'test@hotmail.es',  '$2b$10$jXQJJx25kwUOLcwZ/hHa4exj3xIr5saV4Cuyy7Kbdd0/zMwVRhZsC', 1.90, 85, 100, '1998-11-25', 'HOMBRE', 'ACTIVO',   'USUARIO', 1, NOW(), 'masculino2'),
(2, 'Admin', 'admin@hotmail.es', '$2b$10$p68NI2dUAw9JTKYjHhXwfOTpSOjbPm1RZ0lUBBeZAwiGxXLOfo7Ta', 1.80, 80, 80,  '1990-01-15', 'HOMBRE', 'MODERADO', 'ADMIN',   1, NOW(), 'masculino1');

-- ------------------------------------------------------------
--  2. MUSCULOS
-- ------------------------------------------------------------
INSERT INTO musculos (id_musculo, nombre, descripcion) VALUES
(1, 'Pecho',   'Musculos pectorales, trabajados con press y aperturas.'),
(2, 'Espalda', 'Dorsales y trapecios, trabajados con dominadas y remos.'),
(3, 'Piernas', 'Cuadriceps, femoral y gemelos.'),
(4, 'Hombros', 'Deltoides anterior, lateral y posterior.'),
(5, 'Biceps',  'Musculo flexor del brazo.'),
(6, 'Triceps', 'Musculo extensor del brazo.'),
(7, 'Abdomen', 'Musculatura del core y abdominales.');

-- ------------------------------------------------------------
--  3. EJERCICIOS
-- ------------------------------------------------------------
INSERT INTO ejercicios (id_ejercicio, nombre, descripcion, dificultad, video_url, activo, id_musculo) VALUES
(1,  'Press de banca', 'Press con barra en banco plano.', 'INTERMEDIO', NULL, 1, 1),
(2,  'Press inclinado con mancuernas', 'Press en banco inclinado.', 'INTERMEDIO', NULL, 1, 1),
(3,  'Aperturas con mancuernas', 'Aperturas en banco plano.', 'PRINCIPIANTE', NULL, 1, 1),
(4,  'Fondos en paralelas', 'Fondos para pecho.', 'AVANZADO', NULL, 1, 1),
(5,  'Dominadas', 'Dominadas con peso corporal.', 'AVANZADO', NULL, 1, 2),
(6,  'Remo con barra', 'Remo inclinado con barra.', 'INTERMEDIO', NULL, 1, 2),
(7,  'Jalon al pecho', 'Jalon en polea alta.', 'PRINCIPIANTE', NULL, 1, 2),
(8,  'Remo con mancuerna', 'Remo a una mano.', 'PRINCIPIANTE', NULL, 1, 2),
(9,  'Sentadilla', 'Sentadilla con barra.', 'INTERMEDIO', NULL, 1, 3),
(10, 'Prensa de piernas', 'Prensa inclinada.', 'PRINCIPIANTE', NULL, 1, 3),
(11, 'Peso muerto', 'Peso muerto convencional.', 'AVANZADO', NULL, 1, 3),
(12, 'Zancadas', 'Zancadas con mancuernas.', 'INTERMEDIO', NULL, 1, 3),
(13, 'Press militar', 'Press de hombros con barra.', 'INTERMEDIO', NULL, 1, 4),
(14, 'Elevaciones laterales', 'Elevaciones con mancuernas.', 'PRINCIPIANTE', NULL, 1, 4),
(15, 'Pajaros', 'Elevaciones posteriores.', 'PRINCIPIANTE', NULL, 1, 4),
(16, 'Curl con barra', 'Curl de biceps con barra.', 'PRINCIPIANTE', NULL, 1, 5),
(17, 'Curl martillo', 'Curl con agarre neutro.', 'PRINCIPIANTE', NULL, 1, 5),
(18, 'Extension en polea', 'Extension de triceps en polea.', 'PRINCIPIANTE', NULL, 1, 6),
(19, 'Press frances', 'Press frances con barra Z.', 'INTERMEDIO', NULL, 1, 6),
(20, 'Crunch abdominal', 'Encogimientos abdominales.', 'PRINCIPIANTE', NULL, 1, 7),
(21, 'Plancha', 'Plancha isometrica.', 'PRINCIPIANTE', NULL, 1, 7);

-- ------------------------------------------------------------
--  4. REGISTROS DE PESO de Test (id_usuario 1)
-- ------------------------------------------------------------
INSERT INTO registros_peso (fecha, peso, id_usuario) VALUES
('2026-04-01', 82,   1),
('2026-04-15', 82.8, 1),
('2026-05-01', 83.5, 1),
('2026-05-15', 84,   1),
('2026-06-01', 84.7, 1),
('2026-06-10', 85,   1);

-- ------------------------------------------------------------
--  5. ENTRENAMIENTOS de Test (id_usuario 1)
-- ------------------------------------------------------------
INSERT INTO entrenamientos (id_entrenamiento, nombre, inicio, fin, comentario, valoracion, fatigaPercibida, id_usuario) VALUES
(1, 'Pecho y Triceps',  '2026-06-02 18:00:00', '2026-06-02 19:15:00', 'Buen entreno, con fuerza.', 4, 3, 1),
(2, 'Espalda y Biceps', '2026-06-04 18:00:00', '2026-06-04 19:10:00', 'Espalda fuerte hoy.',       5, 4, 1),
(3, 'Piernas',          '2026-06-06 17:30:00', '2026-06-06 18:50:00', 'Dia de pierna duro.',       3, 5, 1),
(4, 'Hombros',          '2026-06-09 18:00:00', '2026-06-09 19:00:00', 'Sesion de hombros.',        4, 2, 1);

-- ------------------------------------------------------------
--  6. EJERCICIOS DENTRO DE CADA ENTRENAMIENTO
-- ------------------------------------------------------------
INSERT INTO entrenamiento_ejercicios (id_entrenamiento_ejercicio, orden, notas, id_entrenamiento, id_ejercicio) VALUES
(1,  1, NULL, 1, 1),
(2,  2, NULL, 1, 2),
(3,  3, NULL, 1, 18),
(4,  1, NULL, 2, 5),
(5,  2, NULL, 2, 6),
(6,  3, NULL, 2, 16),
(7,  1, NULL, 3, 9),
(8,  2, NULL, 3, 10),
(9,  3, NULL, 3, 11),
(10, 1, NULL, 4, 13),
(11, 2, NULL, 4, 14);

-- ------------------------------------------------------------
--  7. SERIES
-- ------------------------------------------------------------
INSERT INTO series (numero_serie, repeticiones, peso, rir, id_entrenamiento_ejercicio) VALUES
(1,10,60,2,1),(2,8,70,1,1),(3,6,75,0,1),
(1,12,22,2,2),(2,10,24,1,2),(3,8,26,1,2),
(1,15,25,2,3),(2,12,30,1,3),(3,12,30,1,3),
(1,10,0,2,4),(2,8,0,1,4),(3,6,0,0,4),
(1,12,50,2,5),(2,10,55,1,5),(3,10,55,1,5),
(1,12,25,2,6),(2,10,30,1,6),(3,8,32,0,6),
(1,10,80,2,7),(2,8,90,1,7),(3,6,100,0,7),
(1,15,120,2,8),(2,12,140,1,8),(3,10,160,1,8),
(1,8,100,2,9),(2,6,110,1,9),(3,5,120,0,9),
(1,10,40,2,10),(2,8,45,1,10),(3,6,50,0,10),
(1,15,8,2,11),(2,12,10,1,11),(3,12,10,1,11);

-- ============================================================
--  FIN del script de inicializacion.
-- ============================================================