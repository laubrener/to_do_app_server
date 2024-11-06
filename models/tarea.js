const { Schema, model} = require('mongoose');

 const TareaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    detalle: {
        type: String
    },
    comienza: {
        type: String,
        required: true
    },
    termina: {
        type: String,
        required: true
    },
    isChecked: {
        type: Boolean,
        default: false
    },
 });

 TareaSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
 });

 module.exports = model('Tarea', TareaSchema);