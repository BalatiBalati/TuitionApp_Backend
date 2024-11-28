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
app.use(morgan("short"));
app.use(express.json());
// Serve images from the "images" directory

app.use('/images', express.static(path.join(__dirname, 'images')));

app.param('collectionName', function(req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
});

app.get('/', function(req, res, next) {
    res.send('Select a collection, e.g., /collections/courses');
});

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

// Route to handle PUT request for updating a record in a collection by ObjectId
app.put('/collections/:collectionName/:id', function(req, res, next) {
    try {
        const objectId = new ObjectId(req.params.id);  // Handle ObjectId

        req.collection.updateOne(
            { _id: objectId },
            { $set: req.body },
            function(err, result) {
                if (err) {
                    return next(err);
                }
                if (result.modifiedCount === 0) {
                    return res.status(404).send("Record not found");
                }
                res.json({ message: "Record updated successfully" });
            }
        );
    } catch (e) {
        return res.status(400).send("Invalid ID format");
    }
});

// Route to handle DELETE request for removing a record from a collection by ObjectId
app.delete('/collections/:collectionName/:id', function(req, res, next) {
    try {
        const objectId = new ObjectId(req.params.id);  // Handle ObjectId

        req.collection.deleteOne({ _id: objectId }, function(err, result) {
            if (err) {
                return next(err);
            }
            if (result.deletedCount === 0) {
                return res.status(404).send("Record not found");
            }
            res.json({ message: "Record deleted successfully" });
        });
    } catch (e) {
        return res.status(400).send("Invalid ID format");
    }
});

// Catch-all for logging incoming requests
app.use(function(req, res, next) {
    console.log("Incoming request", req.url);
    next();
});

// Catch-all for handling 404 errors
app.use(function(req, res) {
    res.status(404).send("Resource not found!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${ port }`);
});
