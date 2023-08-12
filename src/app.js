// **task : 
// # `insertOne` : 2 (persons) .
// # `insertMany`:10 (persons) , 5 of 10 => (age : 25) .
// # `find` (All who have 25y) .
// # `find` => `limit(3)` like the previos previous query, but for the first 3 persons have 25y .
// # use update operators `$set` to modify the nome of first 4 persons .
// # `updateOne` : inc 20y for the 1st person .
// # `updateMany`: inc 10y to all persons .
// # `deleteOne` : Delete the first person .
// # `deleteMany`: delete all persons (age 35y) .


const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const mongoUrl = 'mongodb://127.0.0.1:27017'
const usersdb = 'task-6'

mongoClient.connect(mongoUrl , (error , result) => {
    if (error) {
        return console.log(`An error has occurred: ${error}`)
    }
    console.log('Connected to db successfully')
    const db = result.db(usersdb)

    // # `insertOne` : 2 (persons) :

    // per 1
    db.collection('Users').insertOne({
        name : 'omar',
        age : 20
    })
    .then((data) => console.log(data.insertedId))
    .catch((error) => console.log(`An error has occurred: ${error}`))

    // per 2
    db.collection('Users').insertOne({
        name : 'eman',
        age : 30
    })
    .then((data) => console.log(data.insertedId))
    .catch((error) => console.log(`An error has occurred: ${error}`))



    // # `insertMany`:10 (persons) , 5 of 10 => (age : 25) :
    
    db.collection('Users').insertMany([
        {
            name : 'ahmed',
            age : 20
        } , {
            name : 'salama',
            age : 25
        } , {
            name : 'khaled',
            age : 25
        } , {
            name : 'amr',
            age : 25
        } , {
            name : 'yosef',
            age : 25
        } , {
            name : 'mohamed',
            age : 25
        } , {
            name : 'yaser',
            age : 30
        } , {
            name : 'marawan',
            age : 26
        } , {
            name : 'somia',
            age : 23
        } , {
            name : 'fady',
            age : 22
        }
    ])
    .then((data) => console.log(`Inserted count: ${data.insertedCount}`))
    .catch((error) => console.log(`Unable to insert data: ${error}`))



    // # `find` (All who have 25y) :

    db.collection('Users').find({ age: 25 }).toArray()
    .then((data) => {
        console.log("People who have 25 years old:");
        // data.forEach(person => console.log(`Name: ${person.name}, Age: ${person.age}`))
        data.forEach(({name , age}) => console.log(`Name: ${name}, Age: ${age}`))
    })
    .catch((error) => console.log(`Error has occurred: ${error}`));



    // # `find` => `limit(3)` like the previos previous query, but for the first 3 persons have 25y :

    db.collection('Users').find({ age: 25 }).limit(3).toArray()
    .then((data) => {
        console.log("first 3 People who have 25 years old:");
        data.forEach(({name , age}) => console.log(`Name: ${name}, Age: ${age}`))
    })
    .catch((error) => console.log(`Error has occurred: ${error}`));



    // # use update operators `$set` to modify the nome of first 4 persons :                                             

    db.collection('Users').updateMany({}, { $set: { name: "zika" } } , {limit : 4} )
    .then((data) => console.log(`Modified count: ${data.modifiedCount}`))
    .catch((error) => console.log(`Error while updating data: ${error}`))



    // # `updateOne` : inc 20y for the 1st person :
    
    db.collection('Users').updateOne({_id:mongodb.ObjectId("64d759d392d85a3e678e6412")} , {$inc : {age : 20}})
    .then((data) => console.log(`Modified count: ${data.modifiedCount}`))
    .catch((error) => console.log(`Error while updating data: ${error}`))



    // # `updateMany`: inc 10y to all persons :

    db.collection('Users').updateMany({} , {$inc : {age : 10}})
    .then((data) => console.log(`Modified count: ${data.modifiedCount}`))
    .catch((error) => console.log(`Error while updating data: ${error}`))



    // # `deleteOne` : Delete the first person :

    db.collection('Users').deleteOne({_id:mongodb.ObjectId("64d759d392d85a3e678e6412")})
    .then((data) => console.log(`Deleted count: ${data.deletedCount}`))
    .catch((error) => console.log(`Error while deleting document: ${error}`))



    // # `deleteMany`: delete all persons (age 35y) :

    db.collection('Users').deleteMany({age : 35})
    .then((data) => console.log(`Deleted count: ${data.deletedCount}`))
    .catch((error) => console.log(`Error while deleting document: ${error}`))

})