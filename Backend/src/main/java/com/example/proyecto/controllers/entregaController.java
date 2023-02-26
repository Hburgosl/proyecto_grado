/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Entrega;
import com.example.proyecto.services.serviceEntrega;
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
@RequestMapping("/entrega")
public class entregaController {
    
    @Autowired
    private serviceEntrega serviceE;
    
    @PostMapping(value = "/")
    public ResponseEntity<Entrega> add(@RequestBody Entrega entrega) {
        Entrega obj = serviceE.save(entrega);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Entrega> delete(@PathVariable int id) {
        Entrega obj = serviceE.findById(id);
        if (obj != null) {
            serviceE.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Entrega> update(@RequestBody Entrega entrega) {
        Entrega obj = serviceE.findById(entrega.getId_entrega());
        if (obj != null) {
            obj.setId_entrega(entrega.getId_entrega());
            obj.setEstado(entrega.getEstado());
            serviceE.save(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @GetMapping("/list")
    public List<Entrega> findAll() {
        return serviceE.findAll();
    }

    @GetMapping("/list/{id}")
    public Entrega findById(@PathVariable int id) {
        return serviceE.findById(id);
    }
}
