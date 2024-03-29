/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Existe;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author owen1
 */
public interface serviceExiste {

    public Existe save(Existe existe);

    public void delete(int id);

    public Existe findById(int id);
    
    @Query("from Existe")
    public List<Existe> findAll();
}
