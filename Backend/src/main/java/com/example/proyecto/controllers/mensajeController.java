/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Mensaje;
import com.example.proyecto.services.serviceMensaje;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/mensaje")
public class mensajeController {
    
    @Autowired
    private serviceMensaje servicemensaje;
    
    @PostMapping(value = "/")
    public ResponseEntity<Mensaje> add(@RequestBody Mensaje mensaje){
        Mensaje obj = null;
        mensaje.setFecha_envio(new Date());
        servicemensaje.save(mensaje);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Mensaje> delete(@PathVariable int id){
        Mensaje obj = servicemensaje.findById(id);
        if(obj != null){
            servicemensaje.delete(id);
        }else{
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Mensaje> update(@RequestBody Mensaje mensaje){
        Mensaje obj = servicemensaje.findById(mensaje.getId_mensaje());
        if(obj != null){
            obj.setId_chat(mensaje.getId_chat());
            obj.setTexto(mensaje.getTexto());
            obj.setFecha_envio(mensaje.getFecha_envio());
            obj.setDocumento_usuario(mensaje.getDocumento_usuario());
            obj.setId_existe(mensaje.getId_existe());
            servicemensaje.save(obj);
        }else{
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @GetMapping("/list")
    public List<Mensaje> findAll() {
        return servicemensaje.findAll();
    }

    @GetMapping("/list/{id}")
    public Mensaje findById(@PathVariable int id) {
        return servicemensaje.findById(id);
    }
}
