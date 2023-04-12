/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.models;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author owen1
 */
@Entity
@Table(name = "estado_articulo")
public class EstadoArticulo implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado_articulo")
    private int id_estado_articulo;
    
    @Column(name = "estado_articulo")
    private String estado_articulo;

    public int getId_estado_articulo() {
        return id_estado_articulo;
    }

    public void setId_estado_articulo(int id_estado_articulo) {
        this.id_estado_articulo = id_estado_articulo;
    }

    public String getEstado_articulo() {
        return estado_articulo;
    }

    public void setEstado_articulo(String estado_articulo) {
        this.estado_articulo = estado_articulo;
    }
    
}
