/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Mensaje;
import java.util.List;

/**
 *
 * @author owen1
 */
public interface serviceMensaje {
    
    public Mensaje save(Mensaje chat);
    
    public void delete(int id);
    
    public Mensaje findById(int id);
    
    public List<Mensaje> findAll();
    
    public List<Mensaje> findByChat(int chat);
    
    public boolean hasMessages(int chatId);
}
