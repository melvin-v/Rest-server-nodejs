import { Router } from "express";
import {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
} from "../controllers/usuarios.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
  esRoleValido,
  existeEmail,
  existeUsuario,
} from "../helpers/db-validators.js";

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
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuario),
  ],
  usuariosDelete
);

export { router };
