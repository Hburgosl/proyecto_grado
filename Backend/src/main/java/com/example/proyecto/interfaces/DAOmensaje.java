/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.Mensaje;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author owen1
 */
public interface DAOmensaje extends JpaRepository<Mensaje, Integer>{
    
    @Query(
            value="SELECT * FROM mensajes WHERE id_existe = 4",
            nativeQuery = true
    )
    List<Mensaje> findAll();
    
    @Query(
            value="SELECT * FROM mensajes WHERE id_existe = '4' AND id_chat = :id_chat",
            nativeQuery = true
    )
    List<Mensaje> findByChat(@Param("id_chat") int chat);
}
