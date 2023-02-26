/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Articulo;
import com.example.proyecto.services.serviceArticulo;
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
@RequestMapping(value = "/articulo")
public class articuloController {

    @Autowired
    private serviceArticulo serviceArticulo;

    @PostMapping(value = "/")
    public ResponseEntity<Articulo> add(@RequestBody Articulo art) {
        Articulo obj = serviceArticulo.save(art);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Articulo> delete(@PathVariable int id) {
        Articulo obj = serviceArticulo.findById(id);
        if (obj != null) {
            serviceArticulo.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Articulo> update(@RequestBody Articulo art) {
        Articulo obj = serviceArticulo.findById(art.getId_articulo());
        if (obj != null) {
            obj.setNombre_articulo(art.getNombre_articulo());
            obj.setDescripcion(art.getDescripcion());
            obj.setImagen_articulo(art.getImagen_articulo());
            obj.setId_estado(art.getId_estado());
            obj.setId_entrega(art.getId_entrega());
            obj.setId_categoria(art.getId_categoria());
            obj.setId_existe(art.getId_existe());
            obj.setUltima_modificacion(art.getUltima_modificacion());
            serviceArticulo.save(art);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/list")
    public List<Articulo> findAll() {
        return serviceArticulo.findAll();
    }

    @GetMapping("/list/{id}")
    public Articulo findById(@PathVariable int id) {
        return serviceArticulo.findById(id);
    }
}
