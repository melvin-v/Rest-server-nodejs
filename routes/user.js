import { Router } from "express";
import {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
} from "../controllers/usuarios.js";
import { check } from "express-validator";

import {
  esRoleValido,
  existeEmail,
  existeUsuario,
} from "../helpers/db-validators.js";

import {validarCampos, validarJWT, esAdminRole, tieneRol} from '../middlewares/index.js'

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuario),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("correo", "correo ya existente").custom(existeEmail),
    check("password", "Password debil").isLength({ min: 6 }),
    check("rol", "No es un rol valido").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuario),
  ],
  usuariosDelete
);

export { router };
