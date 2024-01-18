/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Notificacion;
import com.example.proyecto.services.serviceNotificacion;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
@RequestMapping("/notificacion")
public class notificacionController {

    @Autowired
    private serviceNotificacion servicenotificacion;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping(value = "/")
    public ResponseEntity<Notificacion> add(@RequestBody Notificacion notificacion) {
        Notificacion obj = null;
        notificacion.setFecha_creacion(new Date());
        servicenotificacion.save(notificacion);
        
        // Enviar la notificación a través de WebSockets
        String destino = "/chat/notificacion/" + notificacion.getId_chat();
        messagingTemplate.convertAndSend(destino, notificacion);
        
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @DeleteMapping(value = "/list/{id}")
    public ResponseEntity<Notificacion> delete(@PathVariable int id) {
        Notificacion obj = servicenotificacion.findById(id);
        if (obj != null) {
            servicenotificacion.delete(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PutMapping(value = "/list/{id}")
    public ResponseEntity<Notificacion> update(@RequestBody Notificacion notificacion) {
        Notificacion obj = servicenotificacion.findById(notificacion.getId_notificacion());
        if (obj != null) {
            obj.setId_notificacion(notificacion.getId_notificacion());
            obj.setTexto(notificacion.getTexto());
            obj.setFecha_creacion(notificacion.getFecha_creacion());
            obj.setDocumento_usuario(notificacion.getDocumento_usuario());
            obj.setId_existe(notificacion.getId_existe());
            obj.setId_chat(notificacion.getId_chat());
            obj.setLeido(notificacion.isLeido());
            servicenotificacion.save(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/list")
    public List<Notificacion> findAll() {
        return servicenotificacion.findAll();
    }

    @GetMapping("/list/{id}")
    public Notificacion findById(@PathVariable int id) {
        return servicenotificacion.findById(id);
    }
}
