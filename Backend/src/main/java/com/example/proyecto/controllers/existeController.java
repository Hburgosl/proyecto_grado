/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Existe;
import com.example.proyecto.services.serviceExiste;
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
@RequestMapping("/existe")
public class existeController {

    @Autowired
    private serviceExiste serviceE;

    @PostMapping(value = "/")
    public ResponseEntity<Existe> add(@RequestBody Existe existe) {
        Existe obj = serviceE.save(existe);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Existe> delete(@PathVariable int id) {
        Existe obj = serviceE.findById(id);
        if (obj != null) {
            serviceE.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Existe> update(@RequestBody Existe existe) {
        Existe obj = serviceE.findById(existe.getId_existe());
        if (obj != null) {
            obj.setId_existe(existe.getId_existe());
            obj.setExiste(existe.getExiste());
            serviceE.save(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/list")
    public List<Existe> findAll() {
        return serviceE.findAll();
    }

    @GetMapping("/list/{id}")
    public Existe findById(@PathVariable int id) {
        return serviceE.findById(id);
    }
}
