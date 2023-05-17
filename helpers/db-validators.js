import { RoleSchema } from "../models/rol.js";
import { UsuarioSchema } from "../models/usuario.js";

const esRoleValido = async (rol = "") => {
  const existeRol = await RoleSchema.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El error ${rol} no esta registrado en la DB`);
  }
};

const existeEmail = async (correo) => {
  const existeE = await UsuarioSchema.findOne({ correo });
  if (existeE) {
    throw new Error(`El error ${correo} ya esta registrado en la DB`);
  }

};

const existeUsuario = async (id) => {
  const existe = await UsuarioSchema.findById(id);
  if (!existe) {
    throw new Error(`Error ${Usuario} no esta registrado en la DB`);
  }

};

export { esRoleValido, existeEmail, existeUsuario };
