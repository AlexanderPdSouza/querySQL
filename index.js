const express = require('express')
var mysql = require('mysql');
const app = express()
const port = 3000


var con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

const sqlQuery = "SELECT SUM(produtos.preco) as valor_compra, usuario.nome, compras.data_compra, produtos.produto_nome FROM item_compra LEFT JOIN compras on item_compra.id_compra = compras.id LEFT JOIN produtos on item_compra.id_produto = produtos.id LEFT JOIN usuario on compras.id_usuario = usuario.id where valor_compra > 30 group by usuario.nome, compras.data_compra"

//Função da Query, para deixar o codigo mais limpo.
function queryFunction(sqlQuery, res) {
    con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        const resultJson = JSON.stringify(result)
        let objArray = JSON.parse(resultJson)
        objArray.forEach(element => {
           if (element.produto_nome === "carne") {
           return res.json(element)
           }else{
            return  res.json({produto: `${element.produto_nome}`})
           }
        });
    });
}

app.get('/', async (req, res) => {
    try {
        //apenas uma linha já trás todo o contexto.
        queryFunction(sqlQuery, res)
        res.status(200)
    } catch (error) {
        res.send(error)
        res.status(500)
    }
})

app.listen(port, () => {
    console.log(` localhost:${port}`)
})