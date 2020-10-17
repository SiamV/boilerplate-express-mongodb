const {MongoClient}= require ("mongodb");
const url = "mongodb://127.0.0.1/";
const client = new MongoClient(url, {useUnifiedTopology:true})

client.connect(async (err) => {
    const db = client.db("test1");
    const collection = db.collection("users");
    const array = await collection.find({}).toArray();
    console.log(array);
})