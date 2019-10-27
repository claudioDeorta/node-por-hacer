//const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');


console.log(argv);

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break

    case 'listar':
        let listado = porHacer.getListado();
        break

    case 'actualizar':
        let actualzado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualzado);
        break

    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        console.log(borrar);
        break

    default:
        console.log(`El comado : "${ comando }" no es reconocido `);
}