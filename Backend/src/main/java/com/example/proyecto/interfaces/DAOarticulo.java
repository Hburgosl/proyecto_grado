/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.Articulo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author owen1
 */
public interface DAOarticulo extends JpaRepository<Articulo, Integer>{
    
    @Query(
            value = "SELECT * FROM articulo WHERE id_existe = 4 and id_estado = 5", 
            countQuery = "SELECT count(*) FROM articulo WHERE id_existe = 4 and id_estado = 5", 
            nativeQuery = true
    )
    Page<Articulo> traerTodosConPaginacion(Pageable pageable);
    
    @Modifying
    @Query(
            value = "UPDATE `articulo` SET `id_existe` = '5' WHERE articulo.id_articulo = :id", 
            nativeQuery = true
    )
    public void eliminarArticulo(@Param("id") int id);
    
    @Query(
            value = "SELECT * FROM articulo WHERE articulo.documento_usuario = :doc AND id_existe = 4",
            nativeQuery = true
    )
    Page<Articulo> traerArticulosUsuario(@Param("doc") int doc, Pageable pageable);
    
}
