/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.EstadoArticulo;
import com.example.proyecto.services.serviceEstadoArticulo;
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
@RequestMapping("/estado_articulo")
public class estadoArticuloController {

    @Autowired
    private serviceEstadoArticulo serviceEstadoArticulo;

    @PostMapping("/")
    public ResponseEntity<EstadoArticulo> add(@RequestBody EstadoArticulo estado) {
        EstadoArticulo obj = serviceEstadoArticulo.save(estado);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<EstadoArticulo> delete(@PathVariable int id) {
        EstadoArticulo obj = serviceEstadoArticulo.findById(id);
        if (obj != null) {
            serviceEstadoArticulo.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping(value = "/list/{id}")
    public ResponseEntity<EstadoArticulo> update(@RequestBody EstadoArticulo estado) {
        EstadoArticulo obj = serviceEstadoArticulo.findById(estado.getId_estado_articulo());
        if (obj != null) {
            obj.setId_estado_articulo(estado.getId_estado_articulo());
            obj.setEstado_articulo(estado.getEstado_articulo());
            serviceEstadoArticulo.save(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/list")
    public List<EstadoArticulo> findAll() {
        return serviceEstadoArticulo.findAll();
    }

    @GetMapping("/list/{id}")
    public EstadoArticulo findById(@PathVariable int id) {
        return serviceEstadoArticulo.findById(id);
    }
}
