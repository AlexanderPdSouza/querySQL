const express = require('express')
var mysql = require('mysql');
const app = express()
const port = 3000


var con = mysql.createConnection({
    host: "..",
    user: "..",
    password: "..",
    database: ".."
});

var sqlQuery = "SELECT SUM(produtos.preco) as valor_compra, usuario.nome, compras.data_compra, produtos.produto_nome FROM item_compra LEFT JOIN compras on item_compra.id_compra = compras.id LEFT JOIN produtos on item_compra.id_produto = produtos.id LEFT JOIN usuario on compras.id_usuario = usuario.id where valor_compra > 30 group by usuario.nome, compras.data_compra"

app.get('/', async (req, res) => {
    try {
        con.query(sqlQuery, function (err, result) {
            if (err) throw err;
            const resultJson = JSON.stringify(result)
            let objArray = JSON.parse(resultJson)
            objArray.forEach(element => {
               if (element.produto_nome === "leite") {
                res.json(element)
               }else{
                   res.json({produto: `${element.produto_nome}`})
               }
            });

        });
        res.status(200)
    } catch (error) {
        res.json(error)
        res.status(500)
    }
})

app.listen(port, () => {
    console.log(` localhost:${port}`)
})