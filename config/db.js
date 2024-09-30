const { MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')

/* Connect met database */
async function connectDB() {
    const uri =
    'mongodb+srv://Chelsey-bommer:' +   process.env.DB_PASS + '@clustermatching.ilzs2.mongodb.net/rooms?retryWrites=true&w=majority'
     


    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    })

    try {
        await client.connect();
        mongoose.connect(uri);
        db = client.db(process.env.DB_NAME)
    } catch (error) {
        throw error
    }
}

module.exports = connectDB