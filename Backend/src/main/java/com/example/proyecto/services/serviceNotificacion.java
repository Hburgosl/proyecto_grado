/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Notificacion;
import java.util.List;

/**
 *
 * @author owen1
 */
public interface serviceNotificacion {
    
     public Notificacion save(Notificacion chat);
    
    public void delete(int id);
    
    public Notificacion findById(int id);
    
    public List<Notificacion> findAll();
}
