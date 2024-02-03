-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-02-2024 a las 04:40:34
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbproyectogrado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE `articulo` (
  `id_articulo` int(11) NOT NULL,
  `nombre_articulo` varchar(50) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `imagen_articulo` varchar(200) DEFAULT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `documento_usuario` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `id_entrega` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_existe` int(11) NOT NULL,
  `id_estado_articulo` int(10) NOT NULL,
  `ultima_modificacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulo`
--

INSERT INTO `articulo` (`id_articulo`, `nombre_articulo`, `descripcion`, `imagen_articulo`, `fecha_publicacion`, `documento_usuario`, `id_estado`, `id_entrega`, `id_categoria`, `id_existe`, `id_estado_articulo`, `ultima_modificacion`) VALUES
(9, 'Televisor LG', 'Televisor LG con la pantalla rota', '43fa4214-71b8-4358-b956-938ceaea4809_tv.png', '2023-10-26 21:36:30', 1234197828, 5, 5, 6, 4, 1, '2024-01-14 22:49:45'),
(10, 'Plancha de ropa', 'plancha de ropa solo tiene el enchufe malo', 'c8ead453-1ca3-4d74-8e2d-56594bba7dac_plancha.jfif', '2023-10-26 22:01:48', 1234197828, 5, 5, 3, 5, 2, '2024-02-03 03:25:21'),
(11, 'Mesa de noche', 'Mesa de noche, está un poco deteriorada pero aún funciona', '1be660f9-5cfc-4a2f-9408-4e1aed07a4e7_mesadenoche.jpg', '2023-11-13 16:48:35', 1234197186, 5, 5, 3, 4, 1, '2024-01-13 21:36:58'),
(12, 'Comedor', 'Comedor con 4 sillas, está en buen estado solo le falta un poco de pintura.', 'b98073be-0a4a-44e5-830a-fdb846319533_comedor.jfif', '2024-01-14 22:54:18', 1234197828, 5, 5, 3, 4, 1, '2024-01-14 22:54:18'),
(13, 'Multiusos', 'Multiusos esta un poco deteriorado pero aún sirve', '905a2512-83b4-4027-879d-5ef33141f330_multiusos.jfif', '2024-01-25 23:49:38', 1234197187, 5, 5, 3, 4, 1, '2024-01-25 23:50:02'),
(14, 'Teclado', 'Teclado funcional, todas las teclas sirven, aún se puede utilizar', '5a8b849b-2477-43d5-b729-78f209fd4631_teclado.jfif', '2024-02-01 01:11:55', 1234567893, 5, 5, 6, 4, 1, '2024-02-01 01:11:55'),
(16, 'Teclado', 'Teclado en buen uso', 'dcfe18d5-3940-45b3-aa90-2a1569e2b280_teclado.jfif', '2024-02-03 03:21:33', 45454554, 5, 5, 6, 4, 1, '2024-02-03 03:21:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_cat` varchar(50) DEFAULT NULL,
  `descripcion_cat` varchar(300) DEFAULT NULL,
  `id_existe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_cat`, `descripcion_cat`, `id_existe`) VALUES
(3, 'Artículos del hogar', 'Esta categoria es para todos aquellos articulos del hogar', 4),
(4, 'Articulos para vehiculos', 'Categoría para todo tipo de artículos para vehículos. ', 4),
(5, 'Herramienta', NULL, 4),
(6, 'Tecnologia', NULL, 4),
(7, 'Cocina', 'Articulos para la cocina', 4),
(8, 'Artículos para mascotas', 'Esta categoría es para los artículos exclusivos de las mascotas.', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `id_chat` int(11) NOT NULL,
  `nombre_chat` varchar(200) DEFAULT NULL,
  `id_existe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`id_chat`, `nombre_chat`, `id_existe`) VALUES
(57, 'Howen Burgos & Yesenia B', 4),
(59, 'Julio Maquinhos & Howen Burgos', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id_estado`, `estado`) VALUES
(5, 'Disponible'),
(6, 'No disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_articulo`
--

CREATE TABLE `estado_articulo` (
  `id_estado_articulo` int(10) NOT NULL,
  `estado_articulo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_articulo`
--

INSERT INTO `estado_articulo` (`id_estado_articulo`, `estado_articulo`) VALUES
(1, 'Buen estado'),
(2, 'Mal estado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_entrega`
--

CREATE TABLE `estado_entrega` (
  `id_entrega` int(11) NOT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_entrega`
--

INSERT INTO `estado_entrega` (`id_entrega`, `estado`) VALUES
(4, 'Entregado'),
(5, 'No entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `existe`
--

CREATE TABLE `existe` (
  `id_existe` int(11) NOT NULL,
  `valor` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `existe`
--

INSERT INTO `existe` (`id_existe`, `valor`) VALUES
(4, 'Existe'),
(5, 'No existe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id_mensaje` int(11) NOT NULL,
  `texto` text NOT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `tipo` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `id_chat` int(11) DEFAULT NULL,
  `documento_usuario` int(11) DEFAULT NULL,
  `id_existe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id_mensaje`, `texto`, `fecha_envio`, `tipo`, `color`, `id_chat`, `documento_usuario`, `id_existe`) VALUES
(296, '¡Hola, estoy interesad@ en uno de tus artículos!', '2024-01-25 03:57:24', 'NUEVO_USUARIO', 'red', 57, 1234197828, 4),
(297, 'Hola', '2024-01-25 03:57:28', 'MENSAJE', 'red', 57, 1234197828, 4),
(298, 'Hola', '2024-01-25 03:57:49', 'MENSAJE', 'red', 57, 1234197186, 4),
(302, '¡Hola, estoy interesad@ en uno de tus artículos!', '2024-02-03 03:23:12', 'NUEVO_USUARIO', 'red', 59, 45454554, 4),
(303, 'Hola buenas', '2024-02-03 03:24:42', 'MENSAJE', 'red', 59, 1234197828, 4),
(304, 'como estas?', '2024-02-03 03:24:48', 'MENSAJE', 'red', 59, 45454554, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id_notificacion` int(11) NOT NULL,
  `texto` text NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `documento_usuario` int(11) DEFAULT NULL,
  `id_existe` int(11) NOT NULL,
  `id_chat` int(11) DEFAULT NULL,
  `leido` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(10) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaccion`
--

CREATE TABLE `transaccion` (
  `id_transaccion` int(11) NOT NULL,
  `id_articulo` int(11) DEFAULT NULL,
  `documento_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `documento_usuario` int(11) NOT NULL,
  `nombre_completo` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `pais` varchar(30) DEFAULT NULL,
  `ciudad` varchar(30) DEFAULT NULL,
  `direccion` varchar(30) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `imagen_usuario` varchar(200) DEFAULT NULL,
  `contrasenha` varchar(200) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_estado` int(11) DEFAULT NULL,
  `id_existe` int(11) DEFAULT NULL,
  `ultima_modificacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`documento_usuario`, `nombre_completo`, `fecha_nacimiento`, `pais`, `ciudad`, `direccion`, `email`, `imagen_usuario`, `contrasenha`, `fecha_creacion`, `id_estado`, `id_existe`, `ultima_modificacion`) VALUES
(45454554, 'Julio Maquinhos', '2024-01-30', 'Colombia', 'Cali', 'Call39#12-13', 'julio@gmail.com', '35d269e6-2653-4f66-8739-fd18ca41e663_R.png', '$2a$10$prCjeR/Y5VbxE3.6MK9msuw8qPoTqsO7fhK17/f4bOyAEl2OZ97Zq', '2024-02-03 03:20:32', 5, 4, '2024-02-03 03:20:32'),
(1234197186, 'Yesenia B', '2023-11-15', 'Venezuela', 'Caracas', 'Calle 34#15-27', 'yesenia@gmail.com', '3cad03e7-8e0b-40be-b566-f5125e9f8c51_R.png', '$2a$10$9/rfZKnJtZVfMIPvSTLVXuqAKywai126Z3QrfMy2CEaHuVU4WLoie', '2023-11-13 16:47:25', 5, 4, '2023-11-13 16:47:25'),
(1234197187, 'Johan Andres Lopez C', '2024-01-10', 'Colombia', 'Cali', 'Calle54a#14-65', 'johan@gmail.com', NULL, '$2a$10$cpQGczyLmhLCiq69Ih68Yu21vJvXxqe8MlyAft8cssQDZtjk2/P2S', '2024-01-25 23:48:02', 5, 4, '2024-01-25 23:50:14'),
(1234197828, 'Howen Burgos', '1999-10-26', 'Colombia', 'Cali', 'Colombia', 'howenburgos@gmail.com', '103219bd-81bb-4a55-999d-4c1fe5de05e5_R.png', '$2a$10$hP7Z8WJYcbETxBn5D006KuqcpVA5a3v/3I3eQUMTB3M0K4CCNceaS', '2023-10-21 22:34:15', 5, 4, '2024-02-03 03:26:37'),
(1234567893, 'Andres rios', '2023-10-19', 'Colombia', 'Cali', 'Calle 33e#17-28', 'andres@gmail.com', '3db9a1d3-a06a-4cb0-81b5-3fb03807f985_R.png', '$2a$10$s9t32b7rZ2xCFRzrXT14Pexw1ldnqVCp6tINzYo5QQHV4nV2bOu3S', '2023-10-24 18:05:41', 5, 4, '2024-02-02 18:12:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_chat`
--

CREATE TABLE `usuarios_chat` (
  `documento_usuario` int(11) DEFAULT NULL,
  `id_chat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios_chat`
--

INSERT INTO `usuarios_chat` (`documento_usuario`, `id_chat`) VALUES
(1234197186, 57),
(1234197828, 57),
(1234197828, 59),
(45454554, 59);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_roles`
--

CREATE TABLE `usuario_roles` (
  `documento_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_roles`
--

INSERT INTO `usuario_roles` (`documento_usuario`, `id_rol`) VALUES
(45454554, 2),
(1234197186, 2),
(1234197187, 2),
(1234197828, 1),
(1234567893, 2),
(1234567894, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`id_articulo`),
  ADD KEY `documento_usuario` (`documento_usuario`,`id_estado`,`id_entrega`,`id_categoria`,`id_existe`,`id_estado_articulo`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_entrega` (`id_entrega`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_existe` (`id_existe`),
  ADD KEY `id_estado_articulo` (`id_estado_articulo`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD KEY `id_existe` (`id_existe`);

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `fk_existe` (`id_existe`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `estado_articulo`
--
ALTER TABLE `estado_articulo`
  ADD PRIMARY KEY (`id_estado_articulo`);

--
-- Indices de la tabla `estado_entrega`
--
ALTER TABLE `estado_entrega`
  ADD PRIMARY KEY (`id_entrega`);

--
-- Indices de la tabla `existe`
--
ALTER TABLE `existe`
  ADD PRIMARY KEY (`id_existe`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `id_chat` (`id_chat`),
  ADD KEY `documento_usuario` (`documento_usuario`),
  ADD KEY `fk_existe1` (`id_existe`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id_notificacion`),
  ADD KEY `documento_usuario` (`documento_usuario`),
  ADD KEY `fk_existe2` (`id_existe`),
  ADD KEY `fk_notificaciones_chat` (`id_chat`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD PRIMARY KEY (`id_transaccion`),
  ADD KEY `documento_usuario` (`documento_usuario`),
  ADD KEY `id_articulo` (`id_articulo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`documento_usuario`),
  ADD KEY `id_existe` (`id_existe`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `usuarios_chat`
--
ALTER TABLE `usuarios_chat`
  ADD KEY `documento_usuario` (`documento_usuario`),
  ADD KEY `id_chat` (`id_chat`);

--
-- Indices de la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  ADD UNIQUE KEY `UK137ev9wp1wu4uou52x8o44lag` (`documento_usuario`,`id_rol`),
  ADD KEY `FKo74ec96jhrl0qnl41u14osa2b` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `id_articulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `estado_articulo`
--
ALTER TABLE `estado_articulo`
  MODIFY `id_estado_articulo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estado_entrega`
--
ALTER TABLE `estado_entrega`
  MODIFY `id_entrega` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `existe`
--
ALTER TABLE `existe`
  MODIFY `id_existe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=305;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id_notificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  MODIFY `id_transaccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD CONSTRAINT `articulo_ibfk_1` FOREIGN KEY (`documento_usuario`) REFERENCES `usuario` (`documento_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articulo_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE CASCADE,
  ADD CONSTRAINT `articulo_ibfk_3` FOREIGN KEY (`id_entrega`) REFERENCES `estado_entrega` (`id_entrega`) ON DELETE CASCADE,
  ADD CONSTRAINT `articulo_ibfk_4` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE,
  ADD CONSTRAINT `articulo_ibfk_5` FOREIGN KEY (`id_existe`) REFERENCES `existe` (`id_existe`) ON DELETE CASCADE,
  ADD CONSTRAINT `articulo_ibfk_6` FOREIGN KEY (`id_estado_articulo`) REFERENCES `estado_articulo` (`id_estado_articulo`) ON DELETE CASCADE;

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`id_existe`) REFERENCES `existe` (`id_existe`);

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_existe` FOREIGN KEY (`id_existe`) REFERENCES `existe` (`id_existe`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `fk_existe1` FOREIGN KEY (`id_existe`) REFERENCES `existe` (`id_existe`),
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_chat`) REFERENCES `chat` (`id_chat`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`documento_usuario`) REFERENCES `usuario` (`documento_usuario`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_existe2` FOREIGN KEY (`id_existe`) REFERENCES `existe` (`id_existe`),
  ADD CONSTRAINT `fk_notificaciones_chat` FOREIGN KEY (`id_chat`) REFERENCES `chat` (`id_chat`) ON DELETE CASCADE,
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`documento_usuario`) REFERENCES `usuario` (`documento_usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_existe`) REFERENCES `existe` (`id_existe`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`);

--
-- Filtros para la tabla `usuarios_chat`
--
ALTER TABLE `usuarios_chat`
  ADD CONSTRAINT `usuarios_chat_ibfk_1` FOREIGN KEY (`documento_usuario`) REFERENCES `usuario` (`documento_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuarios_chat_ibfk_2` FOREIGN KEY (`id_chat`) REFERENCES `chat` (`id_chat`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
