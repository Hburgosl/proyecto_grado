/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Usuario;
import com.example.proyecto.services.IUploadArticuloFileSercive;
import com.example.proyecto.services.serviceUsuario;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.logging.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

/**
 *
 * @author owen1
 */
@RestController
@CrossOrigin("*")
@RequestMapping(value = "/usuario")
public class usuarioController {

    @Autowired
    private serviceUsuario serviceUsu;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private IUploadArticuloFileSercive uploadService;

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping(value = "/")
    public ResponseEntity<?> add(@RequestBody Usuario usu) {
        Usuario existingUser = serviceUsu.findById(usu.getDocumento_usuario());
        Usuario existingUserByEmail = serviceUsu.findByEmail(usu.getEmail());
        Map<String, Object> response = new HashMap<>();

        if (existingUser != null) {
            response.put("Mensaje", "Ya existe un usuario con el mismo número de documento.");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        if (existingUserByEmail != null) {
            response.put("Mensaje", "Ya existe un usuario con el mismo email.");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            String psw = usu.getPassword();
            String hashedPsw = passwordEncoder.encode(psw);
            usu.setPassword(hashedPsw);
            Usuario newUser = serviceUsu.save(usu);
            response.put("Mensaje", "El usuario ha sido creado con éxito.");
            response.put("Usuario", newUser);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (DataAccessException e) {
            response.put("Mensaje", "Error al insertar en la base de datos.");
            response.put("Error", e.getMessage() + ": " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Usuario> delete(@PathVariable int id) {
        Usuario obj = serviceUsu.findById(id);
        if (obj != null) {
            serviceUsu.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Usuario> update(@RequestBody Usuario usu) {
        Usuario obj = serviceUsu.findById(usu.getDocumento_usuario());
        if (obj != null) {
            obj.setDocumento_usuario(usu.getDocumento_usuario());
            obj.setNombre_completo(usu.getNombre_completo());
            obj.setFecha_nacimiento(usu.getFecha_nacimiento());
            obj.setPais(usu.getPais());
            obj.setCiudad(usu.getCiudad());
            obj.setDireccion(usu.getDireccion());
            obj.setEmail(usu.getEmail());
            String psw = usu.getPassword();
            String hashedPsw = passwordEncoder.encode(psw);
            obj.setPassword(hashedPsw);
            obj.setFecha_creacion(usu.getFecha_creacion());
            obj.setId_estado(usu.getId_estado());
            obj.setId_existe(usu.getId_existe());
            obj.setUltima_modificacion(new Date());
            serviceUsu.save(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/list")
    public List<Usuario> findAll() {
        return serviceUsu.findAll();
    }

    @GetMapping("/list/{id}")
    public Usuario findById(@PathVariable int id) {
        return serviceUsu.findById(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("documento_usuario") int documento_usuario) {
        Map<String, Object> response = new HashMap<>();

        Usuario usu = serviceUsu.findById(documento_usuario);

        if (!archivo.isEmpty()) {

            String nombreArchivo = null;

            try {
                nombreArchivo = uploadService.copiar(archivo);
            } catch (IOException e) {
                e.printStackTrace();
                response.put("Mensaje", "Error al subir la imagen en la base de datos");
                response.put("Error", e.getMessage());
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String nombreFotoAnterior = usu.getImagen_usuario();

            uploadService.eliminar(nombreFotoAnterior);

            usu.setImagen_usuario(nombreArchivo);
            serviceUsu.save(usu);
            response.put("Usuario", usu);
            response.put("Mensaje", "Has subido la imagen correctamente " + nombreArchivo);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("uploads/img/{nombreFoto:.+}")
    public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {

        Resource recurso = null;

        try {
            recurso = uploadService.cargar(nombreFoto);
        } catch (MalformedURLException ex) {
            java.util.logging.Logger.getLogger(usuarioController.class.getName()).log(Level.SEVERE, null, ex);
        }

        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");

        return new ResponseEntity<>(recurso, cabecera, HttpStatus.OK);
    }

    @GetMapping("/list/email/{email}")
    public Usuario findByEmail(@PathVariable String email) {
        return serviceUsu.findByEmail(email);
    }

    @PostMapping("/enviar-correo/{correoDestino}")
    public ResponseEntity<String> enviarCorreo(@PathVariable String correoDestino) {
        // Verificar si el usuario con el correo existe en la base de datos
        Usuario usuario = serviceUsu.findByEmail(correoDestino);
        if (usuario == null) {
            // El usuario no existe, retorna un mensaje de error
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontró un usuario con el correo: " + correoDestino);
        } else {
            String psw = generarContraseña();
            String hashedPsw = passwordEncoder.encode(psw);
            usuario.setPassword(hashedPsw);
            usuario.setUltima_modificacion(new Date());
            serviceUsu.save(usuario);
            // El usuario existe, procede a enviar el correo
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setTo(correoDestino);
            mensaje.setSubject("Recuperación contraseña");
            mensaje.setText("Su nueva contraseña es " + psw + " recuerde cambiar nuevamente su contrseña.");

            javaMailSender.send(mensaje);

            return ResponseEntity.ok("Correo enviado con éxito a " + correoDestino);
        }
    }
    
    public static String generarContraseña() {
        // Define los caracteres posibles para la contraseña
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Inicializa el generador de números aleatorios
        Random random = new Random();

        // Crea una cadena para almacenar la contraseña generada
        StringBuilder contraseñaGenerada = new StringBuilder();

        // Genera la contraseña de 5 caracteres
        for (int i = 0; i < 5; i++) {
            // Obtiene un índice aleatorio dentro del rango de caracteres
            int indice = random.nextInt(caracteres.length());

            // Agrega el carácter correspondiente al índice a la contraseña
            contraseñaGenerada.append(caracteres.charAt(indice));
        }

        // Devuelve la contraseña generada como una cadena
        return contraseñaGenerada.toString();
    }
}
