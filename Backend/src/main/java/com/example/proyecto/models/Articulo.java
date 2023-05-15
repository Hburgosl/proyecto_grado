/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.models;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author owen1
 */
@Entity
@Table(name = "articulo")
public class Articulo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_articulo")
    private int id_articulo;
    
    @Column(name = "nombre_articulo")
    private String nombre_articulo;
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @Column(name = "imagen_articulo")
    private String imagen_articulo;
    
    @ManyToOne
    @JoinColumn(name = "documento_usuario")
    private Usuario documento_usuario;
    
    @ManyToOne
    @JoinColumn(name = "id_estado")
    private Estado id_estado;
    
    @ManyToOne
    @JoinColumn(name = "id_entrega")
    private Entrega id_entrega;
    
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria id_categoria;
    
    @ManyToOne
    @JoinColumn(name = "id_existe")
    private Existe id_existe;
    
    @Column(name = "ultima_modificacion")
    @Temporal(TemporalType.DATE)
    private Date ultima_modificacion;
    
    @Column(name = "fecha_publicacion")
    @Temporal(TemporalType.DATE)
    private Date fecha_publicacion;

    @ManyToOne
    @JoinColumn(name = "id_estado_articulo")
    private EstadoArticulo id_estado_articulo;

    public EstadoArticulo getId_estado_articulo() {
        return id_estado_articulo;
    }

    public void setId_estado_articulo(EstadoArticulo id_estado_articulo) {
        this.id_estado_articulo = id_estado_articulo;
    }
    
    public void prePersist(){
        ultima_modificacion = new Date();
    }

    public int getId_articulo() {
        return id_articulo;
    }

    public void setId_articulo(int id_articulo) {
        this.id_articulo = id_articulo;
    }

    public String getNombre_articulo() {
        return nombre_articulo;
    }

    public void setNombre_articulo(String nombre_articulo) {
        this.nombre_articulo = nombre_articulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen_articulo() {
        return imagen_articulo;
    }

    public void setImagen_articulo(String imagen_articulo) {
        this.imagen_articulo = imagen_articulo;
    }

    public Usuario getDocumento_usuario() {
        return documento_usuario;
    }

    public void setDocumento_usuario(Usuario documento_usuario) {
        this.documento_usuario = documento_usuario;
    }

    public Estado getId_estado() {
        return id_estado;
    }

    public void setId_estado(Estado id_estado) {
        this.id_estado = id_estado;
    }

    public Entrega getId_entrega() {
        return id_entrega;
    }

    public void setId_entrega(Entrega id_entrega) {
        this.id_entrega = id_entrega;
    }

    public Categoria getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Categoria id_categoria) {
        this.id_categoria = id_categoria;
    }

    public Existe getId_existe() {
        return id_existe;
    }

    public void setId_existe(Existe id_existe) {
        this.id_existe = id_existe;
    }

    public Date getUltima_modificacion() {
        return ultima_modificacion;
    }

    public void setUltima_modificacion(Date ultima_modificacion) {
        this.ultima_modificacion = ultima_modificacion;
    }

    public Date getFecha_publicacion() {
        return fecha_publicacion;
    }

    public void setFecha_publicacion(Date fecha_publicacion) {
        this.fecha_publicacion = fecha_publicacion;
    }
}
