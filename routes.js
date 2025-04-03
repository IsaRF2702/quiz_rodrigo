//ESSA AQUI É DEDICADA AOS USUÁRIOS

import express from "express";
import sql from "./database.js"
import { CompararHash, CriarHash } from "./utilits.js";

const routes = express.Router()

routes.post('/login', async (req, res) => {
    const { email, senha } = req.body
try{ 
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
}
   
    catch(error){
        return res.status(500).json('Erro de servidor')
    }
})

routes.post('/cadastrar', async (req, res) => {
    try{
    const { email, senha } = req.body
    const hash = await CriarHash(senha, 10)

    await sql`INSERT INTO login(email, senha, funcao) values (${email}, ${hash},'aluno')`
    return res.status(200).json('cadastrado com sucesso')

}
    catch(error){
        return res.status(500).json('Erro de Servidor')
    }
})

// ESSA É DEDICADA ÁS QUESTÕES

routes.post('/quest/cadastrar', async (req, res)=>{
    try{
        const {question, option1, option2, option3, option4, gabarito, nivel} = req.body;
        const insert = await sql `insert into quest(question, option1, option2, option3, option4, gabarito, nivel)
        values (${question},${option1},${option2},${option3},${option4}, ${gabarito}, ${nivel})` 
        return res.status(200).json('ok')
        }
    catch(error){
        return res.status(500).json('Erro de Servidor')
    }
});

export default routes
