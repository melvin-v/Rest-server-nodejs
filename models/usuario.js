import { Schema, model } from "mongoose";

const u = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    require: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligartoria es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
u.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};
const UsuarioSchema = model("Usuario", u);

export { UsuarioSchema };
