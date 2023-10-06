/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.aouth;

import com.example.proyecto.models.Usuario;
import com.example.proyecto.services.IserviceUsuario;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

/**
 *
 * @author owen1
 */
@Component
public class InfoAdicionalToken implements TokenEnhancer{
    
    @Autowired
    private IserviceUsuario serviceUsu;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oaat, OAuth2Authentication oaa) {
        Usuario usu = serviceUsu.findByEmail(oaa.getName());
        Map<String, Object> info = new HashMap<>();
        info.put("nombre_usuario", usu.getNombre_completo());
        info.put("documento_usuario", usu.getDocumento_usuario());
        info.put("email", usu.getEmail());
        info.put("pais", usu.getPais());
        info.put("ciudad", usu.getCiudad());
        info.put("direccion", usu.getDireccion());
        info.put("fecha_nacimiento", usu.getFecha_nacimiento());
        info.put("fecha_creacion", usu.getFecha_creacion());
        info.put("ultima_modificacion", usu.getUltima_modificacion());
        info.put("imagen_usuario", usu.getImagen_usuario());
        ((DefaultOAuth2AccessToken) oaat).setAdditionalInformation(info);
        return oaat;
    }

}
