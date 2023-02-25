/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Estado;
import com.example.proyecto.services.serviceEstado;
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
@RequestMapping("/estado")
public class estadoController {
    
    @Autowired
    private serviceEstado serviceE;
    
    @PostMapping("/")
    public ResponseEntity<Estado> add(@RequestBody Estado estado){
        Estado obj = serviceE.save(estado);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Estado> delete(@PathVariable int id) {
        Estado obj = serviceE.findById(id);
        if (obj != null) {
            serviceE.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Estado> update(@RequestBody Estado estado) {
        Estado obj = serviceE.findById(estado.getId_estado());
        if (obj != null) {
            obj.setId_estado(estado.getId_estado());
            obj.setEstado(estado.getEstado());
            serviceE.save(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @GetMapping("/list")
    public List<Estado> findAll() {
        return serviceE.findAll();
    }

    @GetMapping("/list/{id}")
    public Estado findById(@PathVariable int id) {
        return serviceE.findById(id);
    }
}
