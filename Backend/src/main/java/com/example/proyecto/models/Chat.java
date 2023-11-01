/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author owen1
 */
@Entity
@Table(name = "chat")
public class Chat implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_chat")
    private int id_chat;
    
    @Column(name = "nombre_chat")
    private String nombre_chat;
    
    @ManyToOne
    @JoinColumn(name = "id_existe")
    private Existe id_existe;
    
    @ManyToMany
    @JoinTable(
        name = "usuarios_chat",
        joinColumns = @JoinColumn(name = "id_chat"),
        inverseJoinColumns = @JoinColumn(name = "documento_usuario")
    )
    private Set<Usuario> usuarios = new HashSet<>();

    public int getId_chat() {
        return id_chat;
    }

    public void setId_chat(int id_chat) {
        this.id_chat = id_chat;
    }

    public String getNombre_chat() {
        return nombre_chat;
    }

    public void setNombre_chat(String nombre_chat) {
        this.nombre_chat = nombre_chat;
    }

    public Existe getId_existe() {
        return id_existe;
    }

    public void setId_existe(Existe id_existe) {
        this.id_existe = id_existe;
    }

    public Set<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
    }
}
