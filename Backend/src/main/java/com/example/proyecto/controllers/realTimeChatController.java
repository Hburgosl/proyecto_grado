/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Mensaje;
import com.example.proyecto.services.serviceMensaje;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 *
 * @author owen1
 */
@Controller
public class realTimeChatController {
    
    @Autowired
    private serviceMensaje servicemensaje;
    
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Mensaje sendMessage(Mensaje mensaje){
        
        mensaje.setFecha_envio(new Date());
        servicemensaje.save(mensaje);
        return mensaje;
    }
}
