import { response } from "express";
import { UsuarioSchema } from "../models/usuario.js";
import bcryptjs from "bcryptjs";

const usuariosGet = async (req, res = response) => {
  const {limite = 2, desde = 0} = req.query;
  const usuarios = UsuarioSchema.find({estado:true}).skip(desde).limit(limite);
  const total = UsuarioSchema.countDocuments({estado:true});
  const resp =  await Promise.all([usuarios, total])
  res.json({resp });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, correo, ...resto } = req.body;

  //Validar

  if (password) {
    //Encriptación
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await UsuarioSchema.findByIdAndUpdate(id, resto);
  res.json({id });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new UsuarioSchema({ nombre, correo, password, rol });

  //Encriptación
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();
  res.json({ usuario });
};

const usuariosDelete = async (req, res = response) => {
  const {id} = req.params;
  const usuario = await UsuarioSchema.findByIdAndUpdate(id, {estado:false})
  res.json({usuario});
};


export {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
