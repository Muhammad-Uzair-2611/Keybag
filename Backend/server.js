import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { MongoClient } from "mongodb"


//* Variables
const app = express()
dotenv.config()
const port = 2611
const client = new MongoClient(process.env.DB_URI);
client.connect()

//* Middlewares
app.use(express.json())
app.use(cors())

async function DB_Connection() {
    try {
        const db = client.db('KeyBag_DB')
        const collection = db.collection('passwords')
        return collection

    } catch (error) {
        throw new Error('Error Please Try Again')
    }
}

//* Get Passwords
app.get('/', async (_, res) => {
    let collection = await DB_Connection()
    const passwords = await collection.find({}).toArray();
    res.json(passwords);

})

//* Save Passwords
app.post('/', async (req, res) => {
    let collection = await DB_Connection()
    const password = req.body
    await collection.insertOne(password)
    res.json({ message: 'Array received!', length: password.length });
    // console.log(req.body)
})

// app.put('/', async (req, res) => {
//     let collection = await DB_Connection()
//     const { id, ...dataToUpdate } = req.body
//     console.log(dataToUpdate)
//     res.json({ success: true })
//     // await collection.insertOne(password)

// })

//* Delete Password
app.delete('/', async (req, res) => {
    let collection = await DB_Connection()
    const password = req.body
    collection.deleteOne(password)
    res.json({ message: 'Deleted successfully' });
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})