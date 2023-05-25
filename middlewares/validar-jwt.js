import { request } from "express";
import jwt from "jsonwebtoken";
import { UsuarioSchema } from "../models/usuario.js";

const validarJWT = async (req = request, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
    req.usuario = await UsuarioSchema.findById(uid)


    if(!req.usuario){
      return res.status(401).json({
        msg: "User inexistente",
      });
    }

    if(!req.usuario.estado){
      return res.status(401).json({
        msg: "User false",
      });
    }

    req.uid = uid;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      msg: "Token invalido",
    });
  }
};

export { validarJWT };
