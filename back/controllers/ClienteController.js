'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require ('bcrypt-nodejs');
var jwt = require('../helpers/jwt')

const registro_cliente = async function(req,res){

    var data = req.body;
    var clientes_arr = [];

    clientes_arr = await Cliente.find({email:data.email});

    if (clientes_arr.length == 0) {

        if (data.password) {

            bcrypt.hash(data.password,null,null,async function(err,hash){
                if (hash) {

                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({reg});
                } else {
                    res.status(200).send({message:'Error server',data:undefined});
                }
            });//recibe 3 datos. primero es la contraseña, 
        } else {
            res.status(200).send({message:'No hay una contraseña',data:undefined});
        }

       // res.status(200).send({message:reg});
        
    } else {

        res.status(200).send({message:'El correo ya existe en la base de datos',data:undefined});
    }

    //REGISTRO

}

const login_cliente = async function(req,res) {

    var data = req.body;
    var cliente_arr = []

    cliente_arr = await Cliente.find({email:data.email});

    if (cliente_arr.length == 0) {
        res.status(200).send({message: "No se encontró el correo", data: undefined})
    } else {
        let user = cliente_arr[0];

        bcrypt.compare(data.password , user.password, async function(error,check){
            if (check) {
                res.status(200).send({data:user,
                    token: jwt.createToken(user)});
            } else {
                res.status(200).send({message: "La contraseña no coincide", data: undefined})
            }
        })
    }
}

module.exports = {
    registro_cliente,
    login_cliente
}
