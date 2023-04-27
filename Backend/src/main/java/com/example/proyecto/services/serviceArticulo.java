/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Articulo;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 *
 * @author owen1
 */
public interface serviceArticulo {

    public Articulo save(Articulo art);

    public void delete(int id);

    public Articulo findById(int id);

    public List<Articulo> findAll();
    
    public Page<Articulo> findAll(Pageable pageable);
}
