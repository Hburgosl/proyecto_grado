/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOestadoArticulo;
import com.example.proyecto.models.EstadoArticulo;
import com.example.proyecto.services.serviceEstadoArticulo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impEstadoArticulo implements serviceEstadoArticulo {

    @Autowired
    private DAOestadoArticulo daoestadoarticulo;

    @Override
    @Transactional(readOnly = false)
    public EstadoArticulo save(EstadoArticulo estado) {
        return daoestadoarticulo.save(estado);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(int id) {
        daoestadoarticulo.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public EstadoArticulo findById(int id) {
        return daoestadoarticulo.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EstadoArticulo> findAll() {
        return (List<EstadoArticulo>) daoestadoarticulo.findAll();
    }

}
