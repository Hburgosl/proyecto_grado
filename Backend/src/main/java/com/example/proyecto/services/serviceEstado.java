/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Estado;
import java.util.List;

/**
 *
 * @author owen1
 */
public interface serviceEstado {
    
    public Estado save(Estado estado);

    public void delete(int id);

    public Estado findById(int id);

    public List<Estado> findAll();
}
