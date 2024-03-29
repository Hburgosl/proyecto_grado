/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.controllers;

import com.example.proyecto.models.Mensaje;
import com.example.proyecto.models.Usuario;
import com.example.proyecto.services.serviceMensaje;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
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

    private String colores[] = {"red", "blue"};
    
    // Map para almacenar colores asociados con los nombres de usuario
    private Map<Usuario, String> coloresUsuarios = new HashMap<>();

    @MessageMapping("/chat")
    @SendTo("/chat/mensaje")
    public Mensaje sendMessage(Mensaje mensaje) {

//        if (mensaje.getTipo().equals("NUEVO_USUARIO")) {
//            mensaje.setTexto("¡Hola, estoy interesad@ en uno de tus artículos!");
//            mensaje.setColor(colores[0]);
//            mensaje.setFecha_envio(new Date());
//            servicemensaje.save(mensaje);
//        }else if(mensaje.getColor() == null && mensaje.getTipo().equals("MENSAJE")){
//            mensaje.setColor(colores[1]);
//            mensaje.setFecha_envio(new Date());
//            servicemensaje.save(mensaje);
//        }else if(mensaje.getColor() != null && mensaje.getTipo().equals("MENSAJE")){
//            mensaje.setColor(mensaje.getColor());
//            mensaje.setFecha_envio(new Date());
//            servicemensaje.save(mensaje);
//        }
        if (mensaje.getTipo().equals("NUEVO_USUARIO")) {
            // Asignar un nuevo color al usuario y almacenarlo en el mapa
            String nuevoColor = coloresUsuarios.getOrDefault(mensaje.getDocumento_usuario(), colores[0]);
            coloresUsuarios.put(mensaje.getDocumento_usuario(), nuevoColor);

            mensaje.setTexto("¡Hola, estoy interesad@ en uno de tus artículos!");
            mensaje.setColor(nuevoColor);
            mensaje.setFecha_envio(new Date());
            servicemensaje.save(mensaje);
        } else if (mensaje.getTipo().equals("MENSAJE")) {
            // Obtener el color del usuario desde el mapa y establecerlo en el mensaje
            String colorUsuario = coloresUsuarios.getOrDefault(mensaje.getDocumento_usuario(), colores[0]);
            mensaje.setColor(colorUsuario);
            mensaje.setFecha_envio(new Date());
            servicemensaje.save(mensaje);
        }

        return mensaje;
    }
}
