/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOestado;
import com.example.proyecto.models.Estado;
import com.example.proyecto.services.serviceEstado;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impEstado implements serviceEstado {

    @Autowired
    private DAOestado daoestado;

    @Override
    @Transactional(readOnly = false)
    public Estado save(Estado estado) {
        return daoestado.save(estado);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(int id) {
        daoestado.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Estado findById(int id) {
        return daoestado.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Estado> findAll() {
        return (List<Estado>) daoestado.findAll();
    }

}
