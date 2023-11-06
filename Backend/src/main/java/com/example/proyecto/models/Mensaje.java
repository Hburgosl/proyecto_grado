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
import org.springframework.format.annotation.DateTimeFormat;

/**
 *
 * @author owen1
 */
@Entity
@Table(name = "mensajes")
public class Mensaje implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mensaje")
    private int id_mensaje;
    @Column(name = "texto")
    private String texto;
    @Column(name = "fecha_envio")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date fecha_envio;
    @Column(name = "tipo")
    private String tipo;
    @ManyToOne
    @JoinColumn(name = "id_chat")
    private Chat id_chat;
    @ManyToOne
    @JoinColumn(name = "documento_usuario")
    private Usuario documento_usuario;
    @ManyToOne
    @JoinColumn(name = "id_existe")
    private Existe id_existe;

    public int getId_mensaje() {
        return id_mensaje;
    }

    public void setId_mensaje(int id_mensaje) {
        this.id_mensaje = id_mensaje;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Date getFecha_envio() {
        return fecha_envio;
    }

    public void setFecha_envio(Date fecha_envio) {
        this.fecha_envio = fecha_envio;
    }

    public Chat getId_chat() {
        return id_chat;
    }

    public void setId_chat(Chat id_chat) {
        this.id_chat = id_chat;
    }

    public Usuario getDocumento_usuario() {
        return documento_usuario;
    }

    public void setDocumento_usuario(Usuario documento_usuario) {
        this.documento_usuario = documento_usuario;
    }

    public Existe getId_existe() {
        return id_existe;
    }

    public void setId_existe(Existe id_existe) {
        this.id_existe = id_existe;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

}
