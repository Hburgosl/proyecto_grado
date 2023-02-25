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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author owen1
 */
@Entity
@Table(name = "categoria")
public class Categoria implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private int id_categoria;
    @Column(name = "nombre_cat")
    private String nombre_cat;
    @Column(name = "descripcion_cat")
    private String descripcion_cat;
    @ManyToOne
    @JoinColumn(name = "id_existe")
    private Existe id_existe;

    public int getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(int id_categoria) {
        this.id_categoria = id_categoria;
    }

    public String getNombre_cat() {
        return nombre_cat;
    }

    public void setNombre_cat(String nombre_cat) {
        this.nombre_cat = nombre_cat;
    }

    public String getDescripcion_cat() {
        return descripcion_cat;
    }

    public void setDescripcion_cat(String descripcion_cat) {
        this.descripcion_cat = descripcion_cat;
    }

    public Existe getId_existe() {
        return id_existe;
    }

    public void setId_existe(Existe id_existe) {
        this.id_existe = id_existe;
    }
    
}
