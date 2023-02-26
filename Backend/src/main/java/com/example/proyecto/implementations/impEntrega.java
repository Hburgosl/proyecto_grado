/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOentrega;
import com.example.proyecto.models.Entrega;
import com.example.proyecto.services.serviceEntrega;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impEntrega implements serviceEntrega {

    @Autowired
    private DAOentrega daoentrega;

    @Override
    @Transactional(readOnly = false)
    public Entrega save(Entrega entrega) {
        return daoentrega.save(entrega);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(int id) {
        daoentrega.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Entrega findById(int id) {
        return daoentrega.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Entrega> findAll() {
        return (List<Entrega>) daoentrega.findAll();
    }

}
