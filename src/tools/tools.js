const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'sahmqd17'

exports.finddata=(gather,params,callback)=>{
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);
        const collection = db.collection(gather);
        // Find some documents
        collection.find(params).toArray(function(err, docs) {
                       
            // console.log(docs)
            callback(err,docs);
          });


    });
}

//新增一条数据
exports.insertOne=(gather,params,callback)=>{
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);
        const collection = db.collection(gather);
        // Find some documents
        collection.insertOne(
            params,
            function (err, resultdata) {
                
                client.close();
                callback(err,resultdata);
                
            });


    });
}