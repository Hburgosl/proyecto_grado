/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.Usuario;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author owen1
 */
public interface DAOusuario extends CrudRepository<Usuario, Integer>{
    
    @Query(value="SELECT email FROM usuarios WHERE email = ?1")
    public Usuario encontrarPorEmail(String email);
}
