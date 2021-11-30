require('./infraestructura/conectionDB')

//*Express
const express = require('express')
// const api = express();

//*Apollo Server
const {gql, ApolloServer} = require('apollo-server-express')


//*Types
const typeDefs = require('./typeDef')

//*Resolvers
const resolvers = require('./resolver')

//*Iniciar servidor
const iniciarServidor = async() =>{
    const api = express();
    const apollo = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    })
   await apollo.start()
    apollo.applyMiddleware({app: api})
    api.use((request, response) =>{
        response.send("Holi")
    })
    api.listen('9092', () => console.log("Servidor iniciado"));

}
iniciarServidor();