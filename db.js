import { config } from './config.js'
// console.log(config);
import knex from 'knex'

const db = knex(config);
const productos = [{
        marca: 'Nero53',
        precio: 620,
        codigo: 1001,
        stock: 10
    },
    {
        marca: 'Myrica',
        precio: 1400,
        codigo: 1002,
        stock: 12
    },
    {
    marca: 'MasterShip',
    precio: 1800,
    codigo: 1003,
    stock:6
}

]

;
(
    async function() {
        try {
            const exist = await db.schema.hasTable('productos');
            console.log(exist);
            if (exist) {
                await db.schema.dropTable('productos')
            }
            //CREAR TABLA
            await db.schema.createTable('productos', table => {
                    table.string('marca', 15).notNullable()
                    table.float('precio')
                    table.integer('stock')
                    table.increments('id').primary().notNullable()
                })
                //INSERTAR ARTICULOS EN LA TABLA
            await db.insert(productos).from('productos')
            console.log('productos creados');
            let productosRead = await db.select().from('productos')
                // console.log(productosRead);

            //ELIMINAR ARTICULO POR ID
            await db.from('productos').del().where('id', 3)
                // productosRead = await db.select().from('articulos')
                // console.log(productosRead);

            //ACTUALIZAR ARTICULO
            await db.update({ stock: 999999 }).from('productos').where('id', 2)
            productosRead = await db.select().from('productos')
            console.log(productosRead);
        } catch (error) {
            console.log(error);

        } finally {
            db.destroy()
        }
    }
)()