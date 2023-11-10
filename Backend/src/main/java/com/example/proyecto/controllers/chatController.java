/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Chat;
import com.example.proyecto.models.Usuario;
import com.example.proyecto.services.serviceChat;
import com.example.proyecto.services.serviceUsuario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author owen1
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/chat")
public class chatController {

    @Autowired
    private serviceChat servicechat;

    @Autowired
    private serviceUsuario usuarioService;

    @PostMapping(value = "/")
    public ResponseEntity<Chat> add(@RequestBody Chat chat) {
        Chat obj = servicechat.save(chat);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Chat> delete(@PathVariable int id) {
        Chat obj = servicechat.findById(id);
        if (obj != null) {
            servicechat.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Chat> update(@RequestBody Chat chat) {
        Chat obj = servicechat.findById(chat.getId_chat());
        if (obj != null) {
            obj.setId_chat(chat.getId_chat());
            obj.setNombre_chat(chat.getNombre_chat());
            obj.setId_existe(chat.getId_existe());
            servicechat.save(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/list")
    public List<Chat> findAll() {
        return servicechat.findAll();
    }

    @GetMapping("/list/{id}")
    public Chat findById(@PathVariable int id) {
        return servicechat.findById(id);
    }

    // Endpoint para agregar un usuario a un chat
    @PostMapping("/agregar-usuario/{chatId}/{usuarioId}")
    public ResponseEntity<Chat> agregarUsuarioAChat(@PathVariable int chatId, @PathVariable int usuarioId) {
        Chat chat = servicechat.findById(chatId);
        Usuario usuario = usuarioService.findById(usuarioId); // Asegúrate de tener un servicio para los usuarios (usuarioService)
        if (chat != null && usuario != null) {
            chat.getUsuarios().add(usuario);
            servicechat.save(chat);
            return new ResponseEntity<>(chat, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(chat, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint para agregar dos usuarios a un chat
    @PostMapping("/agregar-usuarios/{chatId}/{usuarioId1}/{usuarioId2}")
    public ResponseEntity<Chat> agregarUsuariosAChat(@PathVariable int chatId, @PathVariable int usuarioId1, @PathVariable int usuarioId2) {
        Chat chat = servicechat.findById(chatId);
        Usuario usuario1 = usuarioService.findById(usuarioId1);
        Usuario usuario2 = usuarioService.findById(usuarioId2);

        if (chat != null && usuario1 != null && usuario2 != null) {
            chat.getUsuarios().add(usuario1);
            chat.getUsuarios().add(usuario2);
            servicechat.save(chat);
            return new ResponseEntity<>(chat, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(chat, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint para obtener la lista de usuarios en un chat
    @GetMapping("/usuarios-en-chat/{chatId}")
    public ResponseEntity<List<Usuario>> obtenerUsuariosEnChat(@PathVariable int chatId) {
        List<Usuario> usuarios = servicechat.obtenerUsuariosEnChat(chatId);
        if (usuarios != null) {
            return new ResponseEntity<>(usuarios, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
