import { Schema, model } from "mongoose"

const RoleSchema = model('roles', Schema({
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
}));

export {RoleSchema}