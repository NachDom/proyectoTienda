'use strict'

var Admin = require("../models/admin");
var bcrypt = require ('bcrypt-nodejs');
var jwt = require('../helpers/jwt')

const registro_admin = async function(req,res){

    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({email:data.email});

    if (admin_arr.length == 0) {

        

        if (data.password) {

            bcrypt.hash(data.password,null,null,async function(err,hash){
                if (hash) {

                    data.password = hash;
                    var reg = await Admin.create(data);
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

}


const login_admin = async function(req,res) {

    var data = req.body;
    var admin_arr = []

    admin_arr = await Admin.find({email:data.email});

    if (admin_arr.length == 0) {
        res.status(200).send({message: "No se encontró el correo", data: undefined})
    } else {
        let admin = admin_arr[0];

        bcrypt.compare(data.password , admin.password, async function(error,check){
            if (check) {
                res.status(200).send({data:admin,
                token: jwt.createToken(admin)});
            } else {
                res.status(200).send({message: "La contraseña no coincide", data: undefined})
            }
        })

    }

}

module.exports = {
    registro_admin,
    login_admin
}