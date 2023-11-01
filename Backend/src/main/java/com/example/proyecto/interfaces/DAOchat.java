/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.Chat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author owen1
 */
public interface DAOchat extends JpaRepository<Chat, Integer>{
    
    @Query(
            value="SELECT * FROM chat WHERE id_existe = 4",
            nativeQuery = true
    )
    List<Chat> findAll();
}
