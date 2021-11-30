//*Graph QL - Apollo Server
const {gql} = require('apollo-server-express')

const typeDefs = gql`
    scalar Date

    type Usuario{
        nombre: String
        identificacion: Int
        estado: String
        email: String
        perfil: String
    }
    type Proyecto{
        idProyecto: Int
        nombreProyecto: String
        objetivosGenerales: String
        objetivosEspecificos: String
        presupuesto: Int
        fechaInicio: Date
        fechaTerminacion: Date
        nombreLider: String
        idLider: Int
        facultad: String
        proyectoActivo: Boolean
        faseProyecto: String
        integrantes: [Int]
    }
    type Inscripcion{
        idInscripcion: String
        idProyecto: String
        identificacion: Int
        estadoInscripcion: String
        fechaIngreso: Date
        fechaEgreso: Date
    }
    type Query{
        usuarios: [Usuario]
        usuario(identificacion: Int): Usuario
        proyectos: [Proyecto]
        proyecto(nombre: String): Proyecto
        buscarProyectoPorLider(nombreLider: String): [Proyecto]
        buscar(nombreLider: String, nombreProyecto:String): [Proyecto]
        inscripcionesPendientes(estadoInscripcion: String): [Inscripcion]
    }
    input UserInput{
        nombre: String
        identificacion: Int
        clave: String
        perfil: String
    }
    input datosProyecto{
        idProyecto: Int
        nombreProyecto: String
        objetivosGenerales: String
        objetivosEspecificos: String
        presupuesto: Int
        fechaInicio: String
        fechaTerminacion: String
        nombreLider: String
        idLider: Int
        facultad: String
        proyectoActivo: Boolean
        faseProyecto: String
        integrantes: Int
    }
    input datosActualizarProyecto{
        nombreProyecto: String
        objetivosGenerales: String
        objetivosEspecificos: String
        presupuesto: Int
    }
    type Mutation{
        createUser(user: UserInput): String
        activateUser(identificacion: Int): String
        deleteUser(identificacion: Int): String
        deleteProject(nombreProyecto: String): String
        insertUserToProject(identificacion: Int, nombreProyecto: String): String
        crearProyecto(proyecto: datosProyecto): String
        actualizarProyecto(idLider: Int, idProyecto: Int, proyecto: datosActualizarProyecto): String
    }
`

module.exports = typeDefs