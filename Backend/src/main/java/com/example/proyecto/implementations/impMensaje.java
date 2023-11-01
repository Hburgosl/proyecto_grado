/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOmensaje;
import com.example.proyecto.models.Mensaje;
import com.example.proyecto.services.serviceMensaje;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impMensaje implements serviceMensaje {

    @Autowired
    private DAOmensaje daomensaje;

    @Override
    @Transactional(readOnly = false)
    public Mensaje save(Mensaje mensaje) {
        return daomensaje.save(mensaje);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(int id) {
        daomensaje.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Mensaje findById(int id) {
        return daomensaje.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Mensaje> findAll() {
        return (List<Mensaje>) daomensaje.findAll();
    }

}
