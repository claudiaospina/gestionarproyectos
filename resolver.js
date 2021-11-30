const ProyectoModel = require('./model/proyectoModel')
const UsuarioModel = require('./model/usuarioModel')
const InscripcionModel = require('./model/inscripcionModel')

var aes256 = require('aes256')


const listUsuarios=[
    {
        nombre: 'Pepe',
        identificacion: 123456789,
        estado: 'Activo',
        email: 'pepe@pepe.com',
        perfil: 'Estudiante'
    },
    {
        nombre: 'Clau',
        identificacion: 1152686727,
        estado: 'Activo',
        email: 'claudiaospina@outlook.com',
        perfil: 'Estudiante'
    },
    {
        nombre: 'Pupu',
        identificacion: 987654321,
        estado: 'Inactivo',
        email: 'pupu@pupu.com',
        perfil: 'Líder'
    }


]

const key = 'ClaveClaveClave'

const resolvers = {
    Query: {
        usuarios: () => listUsuarios,
        usuario: (parent, args, context, info) => {
            return listUsuarios.find(user => user.identificacion===args.identificacion)
        },
        proyectos: async() => await ProyectoModel.find({}),
        proyecto: async(parent, args, context, info) => await ProyectoModel.findOne({nombre:args.nombre}),
        buscarProyectoPorLider: async(parent, args, context, info) => { 
            return ProyectoModel.find({nombreLider: args.nombreLider} )
        },
        inscripcionesPendientes: async(parent, args, context, info) => { 
            return InscripcionModel.find({estadoInscripcion: "Pendiente"})
        },
    },
    Mutation: {
        createUser: (parent, args, context, info) =>{
            const {clave} = args.user;
            const nuevoUsuario = new UsuarioModel(args.user);
            const encryptedPlaintext = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlaintext;
            return nuevoUsuario.save()
                .then (u => "Usuario creado")
                .catch(err => "Falló la creación del usuario")
        },
        activateUser: (parent, args, context, info) =>{
            return UsuarioModel.updateOne({identificacion:args.identificacion}, {estado: "Activo"})
                .then (u => "Usuario activado")
                .catch(err => "Falló la activación del usuario")
        },
        deleteUser: (parent, args, context, info) =>{
            return UsuarioModel.deleteOne({identificacion: args.identificacion})
            .then (u => "Usuario eliminado")
            .catch(err => "Falló la eliminación del usuario")
        },
        crearProyecto: async (parent, args, context, info) =>{
            const nuevoProyecto = new ProyectoModel(args.proyecto);
            return nuevoProyecto.save()
                .then (u => "Proyecto creado")
                .catch(err => "Falló la creación del proyecto. Verifique la información ingresada.")
        },
        deleteProject: (parent, args, context, info) =>{
            return ProyectoModel.updateOne({nombre: args.nombreProyecto}, {activo: false})
            .then (u => "Proyecto 'eliminado'")
            .catch(err => "Falló la 'eliminación' del usuario")
        },
        actualizarProyecto: async(parent, args, context, info) =>{        
            const lider = await ProyectoModel.findOne({idLider: args.idLider})
            if(lider){
                const proyecto = await ProyectoModel.findOne({idProyecto: args.idProyecto})
                if (proyecto && proyecto.proyectoActivo===false){
                    return("El proyecto seleccionado no se encuentra activo.")
                }
                else{
                    const modificar = await ProyectoModel(args.proyecto)
                        await ProyectoModel.findOneAndUpdate({idLider: lider.idLider, idProyecto: proyecto.idProyecto}, { nombreProyecto: modificar.nombreProyecto, objetivosGenerales: modificar.objetivosGenerales, objetivosEspecificos: modificar.objetivosEspecificos, presupuesto: modificar.presupuesto},{upsert: false})
                        
                        return("Proyecto actualizado.")
                }                    
            }
            else{
                return("No fue posible actualizar el proyecto")
            }
        },
        insertUserToProject: async (parent, args, context, info) =>{
            const user = await UsuarioModel.findOne({identificacion: args.identificacion})

             if(user && user.estado === "Activo"){
                const proyecto = await ProyectoModel.findOne({nombre: args.nombreProyecto})
                if(proyecto && proyecto.activo) {
                    if(proyecto.integrantes.find(i => i == user.identificacion)){
                        return("El usuario ya se encuentra registrado en este proyecto")
                    }
                    else{
                        await ProyectoModel.updateOne({nombre: args.nombreProyecto}, {$push: {integrantes: user.identificacion}})
                    }
              }
                else {
                    return("Proyecto no válido para agregar un integrante.")
                }
            }
            else {
                return "Usuario no válido"
            } 
        }

    }
}

module.exports = resolvers
