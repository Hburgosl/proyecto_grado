/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author owen1
 */
public interface DAOusuario extends CrudRepository<Usuario, Integer>{
    
    @Query(
            value = "SELECT * FROM usuario WHERE usuario.email = :email AND id_existe = 4",
            nativeQuery = true
    )
    public Usuario findByEmail(@Param("email") String email);
}
