/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOnotificacion;
import com.example.proyecto.models.Notificacion;
import com.example.proyecto.services.serviceNotificacion;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impNotificacion implements serviceNotificacion {

    @Autowired
    private DAOnotificacion daonotificacion;

    @Override
    @Transactional(readOnly = false)
    public Notificacion save(Notificacion notificacion) {
        return daonotificacion.save(notificacion);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(int id) {
        daonotificacion.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Notificacion findById(int id) {
        return daonotificacion.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Notificacion> findAll() {
        return (List<Notificacion>) daonotificacion.findAll();
    }

}
