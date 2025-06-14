const express=require('express');
const cors=require('cors');
const crypto=require('crypto');
require('dotenv').config()
const app=express();
app.use(express.json());
app.use(cors());

const SALT=process.env.SALT;
const SECRET=process.env.SECRET;
const PORT=process.env.PORT;

//Generates a 32-byte encryption key using the SHA-256 hashing

const key = crypto.createHash('sha256').update(SECRET).digest();

//define field with one decoy field
const fields=[
    "name:text",
    "username:text",
    "password:password",
    "mobile:number",
    "RANDOM_GARBAGE_DATA"
]

//encryption function

function encryptField(fieldValue){
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

const encrypted = Buffer.concat([
    cipher.update(SALT + fieldValue, 'utf8'),
    cipher.final()
  ]);
  return {
    data: encrypted.toString('base64'),
    iv: iv.toString('base64')
  };
}


app.get('/', (req,res)=>{
    res.send('server is running')
})
//GET encrypted field definition

app.get('/api/form',(req,res)=>{
    const encryptedFields = fields.map(field => encryptField(field));
    res.json(encryptedFields);
})

//POST a JSON payload containing the form data

app.post('/api/submit',(req,res)=>{
    console.log("Received Form Data:", req.body);
    res.json({ status: "success", received: req.body });
})
app.listen(PORT, ()=>console.log(`Server Running on port ${PORT}`));