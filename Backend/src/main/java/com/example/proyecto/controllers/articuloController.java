/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Articulo;
import com.example.proyecto.services.serviceArticulo;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
    
    private final Logger log = LoggerFactory.getLogger(articuloController.class);

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

                String nombreFotoAnterior = obj.getImagen_articulo();

                if (nombreFotoAnterior != null && nombreFotoAnterior.length() > 0) {
                    Path rutaFotoAnterior = Paths.get("C:\\Users\\owen1\\Desktop\\img").resolve(nombreFotoAnterior).toAbsolutePath();
                    File archivoFotoAnterior = rutaFotoAnterior.toFile();

                    if (archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
                        archivoFotoAnterior.delete();
                    }
                }

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

    @GetMapping("/list/page/{page}")
    public Page<Articulo> findAll(@PathVariable Integer page) {
        Pageable pageable = PageRequest.of(page, 3);
        return serviceArticulo.findAll(pageable);
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

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") int id) {
        Map<String, Object> response = new HashMap<>();

        Articulo articulo = serviceArticulo.findById(id);

        if (!archivo.isEmpty()) {
            String nombreArchivo = UUID.randomUUID().toString() + "_" + archivo.getOriginalFilename().replace(" ", "");
            Path rutaArchivo = Paths.get("C:\\Users\\owen1\\Desktop\\img").resolve(nombreArchivo).toAbsolutePath();
            log.info(rutaArchivo.toString());
            
            try {
                Files.copy(archivo.getInputStream(), rutaArchivo);
            } catch (IOException e) {
                e.printStackTrace();
                response.put("Mensaje", "Error al subir la imagen en la base de datos");
                response.put("Error", e.getMessage());
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String nombreFotoAnterior = articulo.getImagen_articulo();

            if (nombreFotoAnterior != null && nombreFotoAnterior.length() > 0) {
                Path rutaFotoAnterior = Paths.get("C:\\Users\\owen1\\Desktop\\img").resolve(nombreFotoAnterior).toAbsolutePath();
                File archivoFotoAnterior = rutaFotoAnterior.toFile();

                if (archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
                    archivoFotoAnterior.delete();
                }
            }

            articulo.setImagen_articulo(nombreArchivo);
            serviceArticulo.save(articulo);
            response.put("Articulo", articulo);
            response.put("Mensaje", "Has subido la imagen correctamente " + nombreArchivo);
        }

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @GetMapping("uploads/img/{nombreFoto:.+}")
    public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto){
        
        Path rutaArchivo = Paths.get("C:\\Users\\owen1\\Desktop\\img").resolve(nombreFoto).toAbsolutePath();
        log.info(rutaArchivo.toString());
        Resource recurso = null;
        
        try {
            recurso = new UrlResource(rutaArchivo.toUri());
        } catch (MalformedURLException ex) {
            ex.printStackTrace();
        }
        
        if(!recurso.exists() && !recurso.isReadable()){
            throw new RuntimeException("Error no se pudo cargar la imagen "+nombreFoto);
        }
        
        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+recurso.getFilename()+"\"");
        
        return new ResponseEntity<>(recurso, cabecera, HttpStatus.OK);
    }
}
