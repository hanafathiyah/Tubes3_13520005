import { createRequire } from 'module';
import { boyermooreMatch } from '../lib/boyermoore.js';
import { kmpMatch } from '../lib/kmp.js';
import { levenshtein, similarityBmMatch, similarityKmpMatch } from '../lib/similarity.js';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

/**
 * Endpoint for create prediksi
 * @param {Request} req Express.js Request object
 * @param {Response} res Express.js Response object
 */

 export async function createPrediksi(req, res) {
    // DNA
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

    // validasi nama orang
    const name = req.body.nama_pasien;

    if (!name) {
        res.status(400).json({
            status: "error",
            message: "name field is required"
        });
        return ;
    }

    // id penyakit
    const id_penyakit = parseInt(req.body.id_penyakit);
    if(!id_penyakit) {
        res.status(400).json({
            status: "error",
            message: "penyakit is required"
        });
        return;
    }

    const penyakit = await prisma.penyakit.findFirst({
        where: {
            id: id_penyakit
        }
    })

    if (!penyakit) {
        res.status(404).json({
            status: "error",
            message: "penyakit not found"
        });
        return;
    }

    const algorithm = req.body.algorithm;
    if (algorithm !== "kmp" && algorithm !== "boyermoore") {
        res.status(400).json({
            status: "error",
            message: "wrong algorithm"
        })
        return;
    }

    let result;
    let similarity;
    // cek berdasarkan algoritma
    if(algorithm === "kmp") {
        result = kmpMatch(dnadata, penyakit.rantai);
        if(!result) {
            similarity = levenshtein(dnadata, penyakit.rantai) / Math.max(dnadata.length, penyakit.rantai.length);
        } else {
            similarity = 1;
        }
    } else {
        result = boyermooreMatch(dnadata, penyakit.rantai);
        if(!result) {
            similarity = levenshtein(dnadata, penyakit.rantai) /  Math.max(dnadata.length, penyakit.rantai.length);
        } else {
            similarity = 1;
        }
    }
    const queryResult = await prisma.prediksi.create({
        data: {
            nama_pasien: name,
            id_penyakit: penyakit.id,
            status: result,
            similarity: similarity
        }
    })
    res.json({
        status: "success",
        message: "prediksi added",
        data: {
            id_prediksi: queryResult.id_prediksi,
            nama_pasien: queryResult.nama_pasien,
            penyakit: {
                id_penyakit: queryResult.id_penyakit,
                nama_penyakit: penyakit.nama_penyakit
            },
            is_match: queryResult.status,
            similarity: queryResult.similarity
        }
    })

}

/**
 * Endpoint for read prediksi
 * @param {Request} req Express.js Request object
 * @param {Response} res Express.js Response object
 */
 export async function readPrediksi(req, res) {
    const data = await prisma.prediksi.findMany({
        include: {
            penyakit: true
        }
    })
    res.json({
        status: "success",
        message: "read data prediksi berhasil",
        data
    })
 }
 
 /**
  * Endpoint for delete prediksi
  * @param {Request} req Express.js Request object
  * @param {Response} res Express.js Response object
  */
 export async function deletePrediksi(req, res) {
     try {
         const id = parseInt(req.params.id)
         await prisma.prediksi.delete({
             where: {
                 id: id
             }
         }) 
         res.json({
             status: "success",
             message: "prediksi deleted"
         })
     } catch (e){
         if (e.code === "P2025") {
             res.status(404).json({
                 status: "error",
                 message: "prediksi not found"
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