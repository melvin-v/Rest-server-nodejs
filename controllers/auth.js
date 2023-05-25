import { response } from "express";
import { UsuarioSchema } from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generarJWT.js";

const login = async (req, resp = response) => {
  const { correo, password } = req.body;
  try {
    const usuario = await UsuarioSchema.findOne({ correo });
    if (!usuario) {
      return resp
        .status(400)
        .json({ msg: "Usuario / password no son correctos" });
    }
    if (!usuario.estado) {
      return resp
        .status(400)
        .json({ msg: "Usuario / password no son correctos" });
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return resp
        .status(400)
        .json({ msg: "Usuario / password no son correctos" });
    }

    const token = await generarJWT(usuario.id);

    resp.json({ usuario, token });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

export { login };
