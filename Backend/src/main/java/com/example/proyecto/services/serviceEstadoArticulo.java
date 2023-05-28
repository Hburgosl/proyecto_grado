/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.EstadoArticulo;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author owen1
 */
public interface serviceEstadoArticulo {
    
    public EstadoArticulo save(EstadoArticulo estado);

    public void delete(int id);

    public EstadoArticulo findById(int id);
    
    @Query("from EstadoArticulo")
    public List<EstadoArticulo> findAll();
}
