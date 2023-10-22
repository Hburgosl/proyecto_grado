/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Usuario;
import java.util.List;

/**
 *
 * @author owen1
 */
public interface serviceUsuario {
    
    public Usuario save(Usuario usu);

    public void delete(int id);

    public Usuario findById(int id);

    public List<Usuario> findAll();
    
    Usuario findByEmail(String email);
    
}
