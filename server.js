const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const port = process.env.PORT || 10000

let propertiesReader = require("properties-reader");
let propertiesPath = path.resolve(__dirname, "demo-db.properties");
let properties = propertiesReader(propertiesPath);

let dbPrefix = properties.get("db.prefix");
let dbUsername = properties.get("db.user");
let dbPwd = encodeURIComponent(properties.get("db.password"));  // Encode the password to handle special characters
let dbName = properties.get("db.dbname");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");

// Create the MongoDB connection string using the provided details.
const uri = `${dbPrefix}${dbUsername}:${dbPwd}${dbUrl}${dbName}${dbParams}`;

let db;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

client.connect(err => {
    if (err) {
        console.error("Failed to connect to the database", err);
        return;
    }
    db = client.db(dbName);  // Use the database name from the properties
    console.log("Connected to database", dbName);
});

let app = express();
app.set('json spaces', 3);

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Serve images from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Route to fetch all records from a collection
app.get('/courses', async function(req, res, next) {
    try {
        const db = client.db("EdTech");
        const items = await db.collection('courses').find({}).toArray();
        res.json(items);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to handle POST request for creating a new record in the collection
app.post('/UserData', async (req, res) => {
    try{
        const db = client.db("EdTech");
        const order = db.collection("UserData");
        const result = await order.insertOne(req.body);
        res.json(result);
        console.log("Posted a new order");
    } catch(error){
        res.status(500).json({ error: 'Failed to create order' });
        // process.exit(1);
    }
});

// Route to handle PUT request for updating a course's inventory
app.put('/UpdatePrograms', async (req, res) => {
    const { courseId, availableInventory } = req.body;

    if (availableInventory < 0) {
        return res.status(400).json({ error: 'Inventory cannot be negative' });
    }

    try {
        // Convert courseId from string to ObjectId
        const objectId = new ObjectId(courseId);

        // Update the course's availableInventory
        const db = client.db("EdTech");
        const result = await db.collection('courses').updateOne(
            { _id: objectId },
            { $set: { availableInventory: availableInventory } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Course not found or no changes made' });
        }

        res.json({ message: 'Inventory updated successfully' });
    } catch (error) {
        console.error('Failed to update inventory:', error);
        res.status(500).json({ error: 'Failed to update inventory' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${ port }`);
});
