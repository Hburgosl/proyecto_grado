/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.Notificacion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author owen1
 */
public interface DAOnotificacion extends JpaRepository<Notificacion, Integer>{
    
    @Query(
            value="SELECT * FROM notificaciones WHERE id_existe = 4",
            nativeQuery = true
    )
    List<Notificacion> findAll();
}
