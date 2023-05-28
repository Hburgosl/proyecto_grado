/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.EstadoArticulo;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author owen1
 */
public interface DAOestadoArticulo extends CrudRepository<EstadoArticulo, Integer>{
    
}
