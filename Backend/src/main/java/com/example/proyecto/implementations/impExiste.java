/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOexiste;
import com.example.proyecto.models.Existe;
import com.example.proyecto.services.serviceExiste;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impExiste implements serviceExiste {

    @Autowired
    private DAOexiste daoExiste;

    @Override
    @Transactional(readOnly = false)
    public Existe save(Existe existe) {
        return daoExiste.save(existe);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(int id) {
        daoExiste.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Existe findById(int id) {
        return daoExiste.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Existe> findAll() {
        return (List<Existe>) daoExiste.findAll();
    }

}
