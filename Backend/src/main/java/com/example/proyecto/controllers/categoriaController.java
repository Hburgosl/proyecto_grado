/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Categoria;
import com.example.proyecto.services.serviceCategoria;
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
@RequestMapping("/categoria")
public class categoriaController {
    
    @Autowired
    private serviceCategoria serviceCat;
    
    @PostMapping(value = "/")
    public ResponseEntity<Categoria> add(@RequestBody Categoria cat) {
        Categoria obj = serviceCat.save(cat);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Categoria> delete(@PathVariable int id) {
        Categoria obj = serviceCat.findById(id);
        if (obj != null) {
            serviceCat.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Categoria> update(@RequestBody Categoria cat) {
        Categoria obj = serviceCat.findById(cat.getId_categoria());
        if (obj != null) {
            obj.setId_categoria(cat.getId_categoria());
            obj.setNombre_cat(cat.getNombre_cat());
            obj.setDescripcion_cat(cat.getDescripcion_cat());
            obj.setId_existe(cat.getId_existe());
            serviceCat.save(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @GetMapping("/list")
    public List<Categoria> findAll() {
        return serviceCat.findAll();
    }

    @GetMapping("/list/{id}")
    public Categoria findById(@PathVariable int id) {
        return serviceCat.findById(id);
    }
}
