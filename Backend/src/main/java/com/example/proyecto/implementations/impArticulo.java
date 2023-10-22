/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOarticulo;
import com.example.proyecto.models.Articulo;
import com.example.proyecto.services.serviceArticulo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impArticulo implements serviceArticulo {

    @Autowired
    private DAOarticulo daoarticulo;

    @Override
    @Transactional(readOnly = false)
    public Articulo save(Articulo art) {
        return daoarticulo.save(art);
    }

    @Override
    @Transactional(readOnly = false)
    public void eliminarArticulo(int id) {
        daoarticulo.eliminarArticulo(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Articulo findById(int id) {
        return daoarticulo.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Articulo> findAll() {
        return (List<Articulo>) daoarticulo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Articulo> traerTodosConPaginacion(Pageable pageable) {
        return daoarticulo.traerTodosConPaginacion(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Articulo> traerArticulosUsuario(int doc, Pageable pageable) {
        return daoarticulo.traerArticulosUsuario(doc, pageable);
    }

}
