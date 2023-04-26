/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Articulo;
import com.example.proyecto.services.serviceArticulo;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
    public ResponseEntity<?> add(@RequestBody Articulo art) {
        Articulo obj = null;
        Map<String, Object> response = new HashMap<>();

        try {
            obj = serviceArticulo.save(art);
        } catch (DataAccessException e) {
            response.put("Mensaje", "Error al insertar en la base de datos");
            response.put("Error", e.getMessage() + ": " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("Mensaje", "El articulo ha sido creado con exito");
        response.put("Articulo", obj);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {

        Map<String, Object> response = new HashMap<>();
        Articulo obj = serviceArticulo.findById(id);

        if (obj != null) {
            try {
                response.put("Mensaje", "El articulo ha sido eliminado con exito");
                serviceArticulo.delete(id);
            } catch (DataAccessException e) {
                response.put("Mensaje", "Error al insertar en la base de datos");
                response.put("Error", e.getMessage() + ": " + e.getMostSpecificCause().getMessage());
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            response.put("Mensaje", "El articulo con ID " + id + " no existe");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping(value = "/list/{id}")
    public ResponseEntity<?> update(@RequestBody Articulo art) {

        Articulo obj = serviceArticulo.findById(art.getId_articulo());
        Map<String, Object> response = new HashMap<>();

        if (obj != null) {
            try {
                obj.setId_articulo(art.getId_articulo());
                obj.setNombre_articulo(art.getNombre_articulo());
                obj.setDescripcion(art.getDescripcion());
                obj.setImagen_articulo(art.getImagen_articulo());
                obj.setDocumento_usuario(art.getDocumento_usuario());
                obj.setId_estado(art.getId_estado());
                obj.setId_entrega(art.getId_entrega());
                obj.setId_categoria(art.getId_categoria());
                obj.setId_existe(art.getId_existe());
                obj.setUltima_modificacion(art.getUltima_modificacion());
                obj.setFecha_publicacion(art.getFecha_publicacion());
                obj.setId_estado_articulo(art.getId_estado_articulo());
                serviceArticulo.save(obj);
                response.put("Mensaje", "El articulo ha sido actualizado con exito");
                response.put("Articulo", obj);
            } catch (DataAccessException e) {
                response.put("Mensaje", "Error al actualizar en la base de datos");
                response.put("Error", e.getMessage() + ": " + e.getMostSpecificCause().getMessage());
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            response.put("Mensaje", "El articulo con ID " + art.getId_articulo() + " no existe");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public List<Articulo> findAll() {
        return serviceArticulo.findAll();
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<?> findById(@PathVariable int id) {

        Articulo articulo = null;
        Map<String, Object> response = new HashMap<>();

        try {
            articulo = serviceArticulo.findById(id);
        } catch (DataAccessException e) {
            response.put("Mensaje", "Error al realizar la consulta en la base de datos");
            response.put("Error", e.getMessage() + ": " + e.getMostSpecificCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (articulo == null) {
            response.put("Mensaje", "El articulo con ID " + id + " no existe");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(articulo, HttpStatus.OK);
    }
}
