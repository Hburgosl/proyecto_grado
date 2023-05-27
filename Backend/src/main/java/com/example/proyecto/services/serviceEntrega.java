/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Entrega;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author owen1
 */
public interface serviceEntrega {
    
    public Entrega save(Entrega entrega);

    public void delete(int id);

    public Entrega findById(int id);
    
    @Query("from Entrega")
    public List<Entrega> findAll();
}
