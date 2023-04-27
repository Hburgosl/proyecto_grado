/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.interfaces;

import com.example.proyecto.models.Articulo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author owen1
 */
public interface DAOarticulo extends JpaRepository<Articulo, Integer>{
    
}
