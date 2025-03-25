import express from "express";
import sql from "./database.js"
import { CompararHash, CriarHash } from "./utilits.js";

const routes = express.Router()

routes.post('/login', async (req, res) => {
    const { email, senha } = req.body

    let usuario = await sql`select 
    * from login where email=${email}
     and senha=${senha}`

    const teste = await CompararHash(senha, usuario[0].senha)

    if(teste) {
        return res.status(200).json('Deu certo')
    }
    else {
        return res.status(401).json('Usuario ou senha incorreto!')
    }

    if (usuario.length != 0)
        return res.status(200).json('cadastrado com sucesso')
    else
        res.status(400).json('Usuário não encontrado')
})

routes.post('/cadastrar', async (req, res) => {
    const { email, senha } = req.body

    const hash = await CriarHash(senha, 10)

    await sql`INSERT INTO login(email, senha, funcao) values (${email}, ${hash},'aluno')`
    return res.status(200).json('cadastrado com sucesso')
})

export default routes
