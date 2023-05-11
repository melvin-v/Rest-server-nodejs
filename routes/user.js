import { Router } from "express";
import { usuariosGet, usuariosDelete, usuariosPatch, usuariosPost, usuariosPut } from "../controllers/usuarios.js";

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);


export {router};