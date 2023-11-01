/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Chat;
import com.example.proyecto.models.Usuario;
import java.util.List;

/**
 *
 * @author owen1
 */
public interface serviceChat {
    
    public Chat save(Chat chat);
    
    public void delete(int id);
    
    public Chat findById(int id);
    
    public List<Chat> findAll();
    
    public List<Usuario> obtenerUsuariosEnChat(int chatId);
}
