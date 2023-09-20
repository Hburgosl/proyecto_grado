/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Usuario;
import com.example.proyecto.services.serviceUsuario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author owen1
 */
@RestController
@CrossOrigin("*")
@RequestMapping(value = "/usuario")
public class usuarioController {
    
    @Autowired
    private serviceUsuario serviceUsu;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @PostMapping(value = "/")
    public ResponseEntity<Usuario> add(@RequestBody Usuario usu) {
        String psw = usu.getPassword();
        String hashedPsw = passwordEncoder.encode(psw);
        usu.setPassword(hashedPsw);
        
        Usuario obj = serviceUsu.save(usu);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Usuario> delete(@PathVariable int id) {
        Usuario obj = serviceUsu.findById(id);
        if (obj != null) {
            serviceUsu.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Usuario> update(@RequestBody Usuario usu) {
        Usuario obj = serviceUsu.findById(usu.getDocumento_usuario());
        if (obj != null) {
            obj.setDocumento_usuario(usu.getDocumento_usuario());
            obj.setNombre_completo(usu.getNombre_completo());
            obj.setFecha_nacimiento(usu.getFecha_nacimiento());
            obj.setPais(usu.getPais());
            obj.setCiudad(usu.getCiudad());
            obj.setDireccion(usu.getDireccion());
            obj.setEmail(usu.getEmail());
            obj.setPassword(usu.getPassword());
            obj.setFecha_creacion(usu.getFecha_creacion());
            obj.setId_estado(usu.getId_estado());
            obj.setId_existe(usu.getId_existe());
            obj.setUltima_modificacion(usu.getUltima_modificacion());
            serviceUsu.save(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @GetMapping("/list")
    public List<Usuario> findAll() {
        return serviceUsu.findAll();
    }

    @GetMapping("/list/{id}")
    public Usuario findById(@PathVariable int id) {
        return serviceUsu.findById(id);
    }
    
}
