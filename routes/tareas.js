// 'api/tareas'
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { crearToDo, getToDos, getToDoById } = require('../cotrollers/auth');
const router = Router();

router.get('/', getToDos);

router.post('/new', [
    check('nombre', 'La tarea es obligatoria').not().isEmpty(),
    check('comienza', 'La hora de inicio es obligatoria').not().isEmpty(),
    check('termina', 'La hora de finalización es obligatoria').not().isEmpty(),
    
    validarCampos
], crearToDo);

router.get('/:id', getToDoById);



module.exports = router;