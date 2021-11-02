import { createConnection } from 'typeorm'

createConnection().then(() => console.log("Conectado com Sucesso")).catch(e => console.log(e))
