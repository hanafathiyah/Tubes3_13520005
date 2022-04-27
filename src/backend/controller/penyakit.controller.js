import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

/**
 * Endpoint for create penyakit
 * @param {Request} req Express.js Request object
 * @param {Response} res Express.js Response object
 */

export async function createPenyakit(req, res) {
    if(!req.files || !req.files.dnafile) {
        res.status(400).json({
            status: "error",
            message: "file not found"
        }); // error
        return ;
    } 

    const dnadata = req.files.dnafile.data.toString();
    const regex = /^[ACTG]+$/;

    if (!regex.test(dnadata)) {
        res.status(400).json({
            status: "error",
            message: "invalid DNA"
        });
        return ;
    }

    const name = req.body.name;

    if (!name) {
        res.status(400).json({
            status: "error",
            message: "name field is required"
        });
        return ;
    }

    await prisma.penyakit.create({
        data: {
            nama_penyakit: name,
            rantai: dnadata
        }
    })
    res.json({
        status: "success",
        message: "penyakit added"
    })

}

/**
 * Endpoint for read penyakit
 * @param {Request} req Express.js Request object
 * @param {Response} res Express.js Response object
 */
export async function readPenyakit(req, res) {
   const data = await prisma.penyakit.findMany()
   res.json({
       status: "success",
       message: "read data penyakit berhasil",
       data
   })
}

/**
 * Endpoint for delete penyakit
 * @param {Request} req Express.js Request object
 * @param {Response} res Express.js Response object
 */
export async function deletePenyakit(req, res) {
    try {
        const id = parseInt(req.params.id)
        await prisma.penyakit.delete({
            where: {
                id: id
            }
        }) 
        res.json({
            status: "success",
            message: "penyakit deleted"
        })
    } catch (e){
        if (e.code === "P2025") {
            res.status(404).json({
                status: "error",
                message: "penyakit not found"
            })
        } else {
            res.status(500).json({
                status: "error",
                message: "internal server error",
                data: e
            })
        }
    }
}