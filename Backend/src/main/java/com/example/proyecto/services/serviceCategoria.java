/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.proyecto.services;

import com.example.proyecto.models.Categoria;
import java.util.List;

/**
 *
 * @author owen1
 */
public interface serviceCategoria {
    
    public Categoria save(Categoria cat);

    public void delete(int id);

    public Categoria findById(int id);

    public List<Categoria> traerTodos();
}
