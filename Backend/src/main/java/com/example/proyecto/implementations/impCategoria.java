/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOcategoria;
import com.example.proyecto.models.Categoria;
import com.example.proyecto.services.serviceCategoria;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impCategoria implements serviceCategoria {

    @Autowired
    private DAOcategoria daocat;

    @Override
    @Transactional(readOnly = false)
    public Categoria save(Categoria cat) {
        return daocat.save(cat);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(int id) {
        daocat.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Categoria findById(int id) {
        return daocat.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Categoria> traerTodos() {
        return (List<Categoria>) daocat.traerTodos();
    }

}
