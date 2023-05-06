'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_cliente = async function(req,res){
    //variable para que reciba toda la data que esta en el cuerpo del request
    var data = req.body;
    var clientes_arr = [];
    clientes_arr = await Cliente.find({email:data.email});
    if (clientes_arr.length == 0) {
        //crea        
        if (data.password) {
            //crea
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    //registrando
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ErrorServer',data:undefined});
                }
            })
        }else{
            res.status(200).send({message:'No hay una constraseña',data:undefined});
        }
    }else{
        res.status(200).send({message:'El correo ya existe en la base de datos',data:undefined});
    }
}

const login_cliente = async function(req,res){
    var data = req.body;
    //creando arreglo de cliente
    var cliente_arr = [];
    //buscando email con la bd
    cliente_arr = await Cliente.find({email:data.email});
    if (cliente_arr == 0) {
        // no hay correo en bd
        res.status(200).send({message: 'No se encontro el correo', data:undefined});
    }else{
        //si hay email que coincide = login
        let user = cliente_arr[0];
        //desenceriptando password
        bcrypt.compare(data.password, user.password, async function(error, check) {
            if (check) {
                //login
                //si esta bien el pass manda data
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data:undefined});
            }
        });
    }
    
}


module.exports = {
    registro_cliente,
    login_cliente
}