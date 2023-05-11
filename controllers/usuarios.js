import { response } from "express";

const usuariosGet = (req, res =response) => {
    const {q, nombre, apikey} = req.query;
    res.json({msg:"get API", q, nombre, apikey});
};

const usuariosPut = (req, res =response) => {
    const { id } = req.params;
    res.json({msg:"put", id});
};

const usuariosPost = (req, res =response) => {
    const body = req.body;
    res.json({msg:"post", body});
};

const usuariosDelete = (req, res =response) => {
    res.json({msg:"delete"});
};

const usuariosPatch = (req, res =response) => {
    res.json({msg:"patch"});
};

export {usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch}