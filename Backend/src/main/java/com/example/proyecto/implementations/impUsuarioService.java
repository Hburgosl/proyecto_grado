/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.implementations;

import com.example.proyecto.interfaces.DAOusuario;
import com.example.proyecto.models.Usuario;
import java.util.Collections;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author owen1
 */
@Service
public class impUsuarioService implements UserDetailsService{
    
    private Logger logger = LoggerFactory.getLogger(impUsuarioService.class);
    
    @Autowired
    private DAOusuario daoUser;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        Usuario usu = daoUser.encontrarPorEmail(email);
        
        if(usu == null){
            logger.error("No existe el usuario en el sistema");
            throw new UsernameNotFoundException("No existe el usuario en el sistema");
        }
        
        return new User(usu.getEmail(), usu.getPassword(), true, true, true, true, Collections.emptyList());
    }
    
}
