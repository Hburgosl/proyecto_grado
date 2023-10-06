/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.Categoria;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
/**
 *
 * @author owen1
 */
public interface DAOcategoria extends JpaRepository<Categoria, Integer>{
    
    @Query(
            value="SELECT * FROM categoria WHERE id_existe = 4",
            nativeQuery = true
    )
    List<Categoria> traerTodos();
}
