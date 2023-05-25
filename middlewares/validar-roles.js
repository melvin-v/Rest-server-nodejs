const esAdminRole = (req, res, next) => {
    if(!req.usuario){
        return res.status(500).json({msg:"Se quiere validar el rol, sin token"})
    }
    const {rol,nombre} = req.usuario;
    if (!rol !== 'ADMIN_ROLE'){
        return res.status(401).json({msg:"Rol invalido"})
    }
  next();
};

const tieneRol = (...roles) => {
    return (req, res, next) => {
        if(roles.includes(req.usuario.rol)){
            return res.status(401).json({msg:"Rol invalido"})
        }
        next();
    }
};

export { esAdminRole, tieneRol };
