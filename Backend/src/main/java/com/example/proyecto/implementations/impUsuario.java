/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOusuario;
import com.example.proyecto.models.Usuario;
import com.example.proyecto.services.serviceUsuario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impUsuario implements serviceUsuario{
    
    @Autowired
    private DAOusuario daouser;

    @Override
    @Transactional(readOnly = false)
    public Usuario save(Usuario usu) {
        return daouser.save(usu);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(int id) {
        daouser.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario findById(int id) {
        return daouser.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> findAll() {
        return (List<Usuario>) daouser.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario findByEmail(String email) {
        return daouser.findByEmail(email);
    }
    
}
