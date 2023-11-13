/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOchat;
import com.example.proyecto.models.Chat;
import com.example.proyecto.models.Usuario;
import com.example.proyecto.services.serviceChat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impChat implements serviceChat {

    @Autowired
    private DAOchat daochat;

    @Override
    @Transactional(readOnly = false)
    public Chat save(Chat chat) {
        return daochat.save(chat);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(int id) {
        daochat.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Chat findById(int id) {
        return daochat.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Chat> findAll() {
        return (List<Chat>) daochat.findAll();
    }

    // Método para agregar un usuario a un chat
    @Transactional(readOnly = false)
    public Chat agregarUsuarioAChat(int chatId, Usuario usuario) {
        Optional<Chat> optionalChat = daochat.findById(chatId);
        if (optionalChat.isPresent()) {
            Chat chat = optionalChat.get();
            chat.getUsuarios().add(usuario);
            return daochat.save(chat);
        }
        return null; // Manejo de errores, puedes lanzar una excepción en lugar de retornar null.
    }

    // Método para obtener la lista de usuarios en un chat
    @Override
    @Transactional(readOnly = true)
    public List<Usuario> obtenerUsuariosEnChat(int chatId) {
        Optional<Chat> optionalChat = daochat.findById(chatId);
        if (optionalChat.isPresent()) {
            Chat chat = optionalChat.get();
            // Convierte el conjunto de usuarios en una lista
            List<Usuario> usuarios = new ArrayList<>(chat.getUsuarios());
            return usuarios;
        }
        return null; // Manejo de errores, puedes lanzar una excepción en lugar de retornar null.
    }

    @Override
    @Transactional(readOnly = true)
    public List<Chat> findChatUsuario(int doc) {
        return (List<Chat>) daochat.findChatUsuario(doc);
    }
}
