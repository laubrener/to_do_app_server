const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const Tarea = require('../models/tarea');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo inválido'
            });
        }
        const usuario = new Usuario(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // generar mi JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Crear usuario',
            usuario,
            token
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const login = async (req, res = response) => {

    const { nombre, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ nombre });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Error en el login'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Error en el login'
            });
        }
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'login',
            usuario: usuarioDB,
            token
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);

    res.json({
        ok:true,
        usuario,
        token
    })
}

const crearToDo = async (req, res = response) => {

    const { nombre, comienza, termina } = req.body;

    try {
        const existeTarea = await Tarea.findOne({ nombre, comienza, termina });
        if (existeTarea) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe la tarea'
            });
        }
        const toDo = new Tarea(req.body);

        await toDo.save();

        res.json({
            ok: true,
            msg: 'Tarea creada',
            toDo
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getToDos = async (req, res = response) => {

    const list = await Tarea.find();

    res.json({
        ok: true,
        response: list
    })
}

const getToDoById = async (req, res = response) => {

    const toDo = await Tarea.findOne({ uid: req.params });

    res.json({
        ok: true,
        response: toDo
    })
}




module.exports = { crearUsuario, login, renewToken, crearToDo, getToDos, getToDoById }