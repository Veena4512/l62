const express = require("express");
const app = express();

const admin=require("firebase-admin");
const credentials=require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
  });

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const db=admin.firestore();

app.post('/create', async (req,res) =>{
    try{
        console.log(req.body);
        const id= req.body.email;
        const userJson={
            email:req.body.email,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
        };
        const response= await db.collection("users").add(userJson);
        res.send(response);
    }catch(error){
            res.send(error);
        }
    }
);

app.get('/read/all', async (req,res)=>{
    try{
        const usersref = db.collection("users");
        const response = await (usersref).get();
        let responsearr=[];
        response.forEach(doc=> {
            responsearr.push(doc.data());
        });
        res.send(responsearr);
    }
    catch(error){
        res.send(error);
    }
});
app.get('/read/:id',async(req,res)=>{
    try{
        const usersref = db.collection("users").doc(req.params.id);
        const response = await (usersref).get();
        res.send(response.data());
    }
    catch(error){
        res.send(error);
    }
});

app.post('/update',async(req,res)=>{
    try{
        const id =req.body.id;
        const newf="sri";
        const userref = await db.collection("users").doc(id)
        .update({
              firstname:newf

        });
        res.send(response);

    }catch(error){
          res.send(error);
    }
});


app.post('/delete/:id',async(req,res)=>{

    try{
        const response = await db.collection("users").doc(req.params.id).delete();
        res.send(response);

    }catch(error){
          res.send(error);
    }

})


const PORT = process.env.PORT || 8080;
app.listen(PORT,() =>{
    console.log(`server is running  PORT ${PORT}.`);
})