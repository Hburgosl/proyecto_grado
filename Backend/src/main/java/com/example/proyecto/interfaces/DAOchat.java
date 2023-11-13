/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.Chat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author owen1
 */
public interface DAOchat extends JpaRepository<Chat, Integer> {

    @Query(
            value = "SELECT * "
                    + "FROM chat WHERE id_existe = 4",
            nativeQuery = true
    )
    List<Chat> findAll();

    @Query(
            value = "SELECT chat.*, usuario.nombre_completo FROM chat "
                    + "JOIN usuarios_chat ON chat.id_chat = usuarios_chat.id_chat "
                    + "JOIN usuario ON usuario.documento_usuario = usuarios_chat.documento_usuario "
                    + "WHERE usuario.documento_usuario = :documento_usuario AND chat.id_existe = '4';",
            nativeQuery = true
    )
    List<Chat> findChatUsuario(@Param("documento_usuario") int doc);
    
}
