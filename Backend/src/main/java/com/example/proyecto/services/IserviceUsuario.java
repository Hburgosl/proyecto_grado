/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Usuario;

/**
 *
 * @author owen1
 */
public interface IserviceUsuario {
    
    public Usuario findByEmail(String email);
}
