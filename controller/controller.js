
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv")
dotenv.config();
const uri = process.env.DB_URL;
const client = new MongoClient(
 uri
);
const postcollection = client.db("twitter").collection("posts");
const usercollection = client.db("twitter").collection("users");
const handleController = {
    signup: async(req,res) => {
            const user = req.body;
        // console.log(user)
        try {
             const result = await usercollection.insertOne(user);
             res.send(result);
        } catch (error) {
             res.send(400).json({
                 success: false,
                 message: "Error crating user",
                 error
               });
        }
            
           
    },
    loginuser: async (req, res) => {
        const email = req.query.email;
        try {
             const user = await usercollection.find({ email: email }).toArray();
             res.send(user);
        } catch (error) {
            res.send(400).json({success:false,message:"user already existing",error})
        }
        
    },
    creaetpost: async (req,res) => {
        const posts = req.body;
        try {
              const result = await postcollection.insertOne(posts);
              res.send(result);
        } catch (error) {
            res.status(400).json({success:false,message:"Error uploading data",error})
        }
    },
    showpost:async(req,res)=>{
        try {
             const post = (await postcollection.find().toArray()).reverse();
             res.send(post);
        } catch (error) {
            res.status(400).json({success:false,message:"Error fetching datas",error})
        }
    },
    userpost: async (req, res) => {
        try {
            const email = req.query.email;
            
            const post = (
              await postcollection.find({ email: email }).toArray() 
            ).reverse();
            res.status(200).send(post);
        } catch (error) {
            res.status(400).json({success:false,message:"error fetching user posts",error})
        }
    },
    user: async (req,res) => {
        try {
              const user = await usercollection.find().toArray();
              res.send(user);
        } catch (error) {
             res
               .status(400)
               .json({
                 success: false,
                 message: "error fetching user",
                 error
               });
        }
    },
    editprofile: async (req,res) => {
         const filter = req.params;
         const profile = req.body;
         const options = { upsert: true };
        const updateDoc = { $set: profile };
        try {
              const result = await usercollection.updateOne(
                filter,
                updateDoc,
                options
              );
              res.status(201).send(result);
        } catch (error) {
            res.status(400).json({ mesasge: "Error Updating Data" });
        }
    }
}

module.exports = handleController;