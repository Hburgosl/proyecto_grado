/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.proyecto.models;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author owen1
 */
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable{
    
    @Id
    @Column(name = "documento_usuario")
    private int documento_usuario;
    @Column(name = "nombre_completo")
    private String nombre_completo;
    @Column(name = "fecha_nacimiento")
    private String fecha_nacimiento;
    @Column(name = "edad")
    private int edad;
    @Column(name = "pais")
    private String pais;
    @Column(name = "ciudad")
    private String ciudad;
    @Column(name = "direccion")
    private String direccion;
    @Column(name = "email")
    private String email;
    @Column(name = "contrasenha")
    private String password;
    @Column(name = "fecha_creacion")
    private String fecha_creacion;
    @ManyToOne
    @JoinColumn(name = "id_estado")
    private Estado id_estado;
    @ManyToOne
    @JoinColumn(name = "id_existe")
    private Existe id_existe;
    @Column(name = "ubicacion")
    private String ubicacion;

    public int getDocumento_usuario() {
        return documento_usuario;
    }

    public void setDocumento_usuario(int documento_usuario) {
        this.documento_usuario = documento_usuario;
    }

    public String getNombre_completo() {
        return nombre_completo;
    }

    public void setNombre_completo(String nombre_completo) {
        this.nombre_completo = nombre_completo;
    }

    public String getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public void setFecha_nacimiento(String fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(String fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public Estado getId_estado() {
        return id_estado;
    }

    public void setId_estado(Estado id_estado) {
        this.id_estado = id_estado;
    }

    public Existe getId_existe() {
        return id_existe;
    }

    public void setId_existe(Existe id_existe) {
        this.id_existe = id_existe;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
    
}
