const express = require('express');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@kusumpura-islamia-madra.ahfq6x2.mongodb.net/?retryWrites=true&w=majority`;
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))






const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const teachersCollection = client.db("kusumpura-islamia").collection("teachers");
  const imageCollection = client.db("kusumpura-islamia").collection("imageGallery");
  const historyCollection = client.db("kusumpura-islamia").collection("history");
  const govtBodyCollection = client.db("kusumpura-islamia").collection("GovtBody");
  const fundingCollection = client.db("kusumpura-islamia").collection("funding");
  const resultCollection = client.db("kusumpura-islamia").collection("result");
  const noticeCollection = client.db("kusumpura-islamia").collection("notice");
  const bannerCollection = client.db("kusumpura-islamia").collection("banner");
  const adminCollection = client.db("kusumpura-islamia").collection("admin");
  const projectCollection = client.db("kusumpura-islamia").collection("project");
  const eventCollection = client.db("kusumpura-islamia").collection("events");
  const talkCollection = client.db("kusumpura-islamia").collection("talk");

  app.post('/addTeacher', async (req, res) => {
    const teacherData = req.body;
    try {
      const result = await teachersCollection.insertOne(teacherData)
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(err)
    }
  })

  app.get('/teachers', async (req, res) => {
    try {
      const teachers = teachersCollection.find({})
      const result = await teachers.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.patch('/updateTeacher/:id', async (req, res) => {
    try {
      const result = await teachersCollection.updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: req.body }
      )
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }
  })

  app.delete('/deleteTeacher/:id', async (req, res) => {
    const result = await teachersCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result)

  })

  app.post('/addImageGallery', async (req, res) => {
    const result = await imageCollection.insertOne(req.body);
    res.status(200).send(result.acknowledged)
    console.log(result.acknowledged);
  })

  app.get('/photos', async (req, res) => {
    try {
      const photos = imageCollection.find({});
      const result = await photos.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })


  // delete photo
  app.delete('/deletePhoto/:id', async (req, res) => {
    const result = await imageCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })

  //post history
  app.post('/addHistory', async (req, res) => {

    console.log(req.body);
    try {
      const result = await historyCollection.insertOne(req.body);
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }

  })

  // get history
  app.get('/history', async (req, res) => {
    const history = historyCollection.find({})
    try {
      const result = await history.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })


  // update history
  app.patch('/updateHistory/:id', async (req, res) => {
    try {
      const result = await historyCollection.updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: req.body }
      )
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }
  })

  //delete history
  app.delete('/deleteHistory/:id', async (req, res) => {
    const result = await historyCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })

  //add govtbody
  app.post('/addGovtBody', async (req, res) => {
    try {
      const result = await govtBodyCollection.insertOne(req.body);
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }

  })

  //get govtbody
  app.get('/govtBody', async (req, res) => {
    const govtBody = govtBodyCollection.find({})
    try {
      const result = await govtBody.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  //delete govtbody
  app.delete('/deleteGovtBody/:id', async (req, res) => {
    const result = await govtBodyCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })

  //add funding
  app.post('/addFunding', async (req, res) => {
    try {
      const result = await fundingCollection.insertOne(req.body);
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }

  })

  //get funding
  app.get('/funding', async (req, res) => {
    const funding =  fundingCollection.find({})
    try {
      const result = await funding.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  // delete funding
  app.delete('/deleteFunding/:id', async (req, res) => {
    const result = await fundingCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })


  //add result
  app.post('/addResult', async (req, res) => {
    try {
      const result = await resultCollection.insertOne(req.body);
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }

  })

  //get result
  app.get('/result', async (req, res) => {
    const results = resultCollection.find({})
    try {
      const result = await results.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  // delete result
  app.delete('/deleteResult/:id', async (req, res) => {
    const result = await resultCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })


  //add notice
  app.post('/addNotice', async (req, res) => {
    try {
      const result = await noticeCollection.insertOne(req.body);
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }

  })

  //get notice
  app.get('/notice', async (req, res) => {
    const results = noticeCollection.find({})
    try {
      const result = await results.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  // delete notice
  app.delete('/deleteNotice/:id', async (req, res) => {
    const result = await noticeCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })


  //add banner
  app.post('/addBanner', async (req, res) => {
    try {
      const result = await bannerCollection.insertOne(req.body);
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }

  })

  //get banner
  app.get('/banner', async (req, res) => {
    const results = bannerCollection.find({})
    try {
      const result = await results.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  // delete banner
  app.delete('/deleteBanner/:id', async (req, res) => {
    const result = await bannerCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })

  // add admin
  app.post('/addAdmin', async (req, res) => {
    try {
      const result = await adminCollection.insertOne(req.body);
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }

  })

  //get admin
  app.get('/admin', async (req, res) => {
    const results = adminCollection.find({})
    try {
      const result = await results.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  // delete admin
  app.delete('/deleteAdmin/:id', async (req, res) => {
    const result = await adminCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })


  //admin check
  app.post('/isAdmin', async (req, res) => {
    const email = req.body.email;
    console.log(email)
    const cursor = adminCollection.find({ adminEmail: email });
    try {
      const result = await cursor.toArray()
      res.send(result.length > 0);
    } catch (error) {
      res.status(500).send(error)
    }
  });


  //post project
  app.post('/addProject', async (req, res) => {

    console.log(req.body);
    try {
      const result = await projectCollection.insertOne(req.body);
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }

  })

  // get project
  app.get('/project', async (req, res) => {
    const history = projectCollection.find({})
    try {
      const result = await history.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })


  // update project
  app.patch('/updateProject/:id', async (req, res) => {
    try {
      const result = await projectCollection.updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: req.body }
      )
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }
  })

  //delete project
  app.delete('/deleteProject/:id', async (req, res) => {
    const result = await projectCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })

//add event
  app.post('/addEvent', async (req, res) => {
    const result = await eventCollection.insertOne(req.body);
    res.status(200).send(result.acknowledged)
    console.log(result.acknowledged);
  })


  //get events
  app.get('/events', async (req, res) => {
    try {
      const photos = eventCollection.find({});
      const result = await photos.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })


  // delete events
  app.delete('/deleteEvent/:id', async (req, res) => {
    const result = await eventCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })


  //post talk
  app.post('/addTalk', async (req, res) => {

    console.log(req.body);
    try {
      const result = await talkCollection.insertOne(req.body);
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }

  })

  // get talk
  app.get('/', async (req, res) => {
    const history = talkCollection.find({})
    try {
      const result = await history.toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })


  // update project
  app.patch('/updateTalk/:id', async (req, res) => {
    try {
      const result = await talkCollection.updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: req.body }
      )
      res.status(200).send(result.acknowledged)
    } catch (error) {
      res.status(500).send(error)
      console.log(error);
    }
  })

  //delete talk
  app.delete('/deleteTalk/:id', async (req, res) => {
    const result = await talkCollection.findOneAndDelete({ _id: ObjectId(req.params.id) })
    res.status(200).send(result.acknowledged)

  })





});







app.get('/', (req, res) => {
  res.send('kusumpura islamia dhakil madrasah is commming...')
})

app.listen(process.env.PORT || port)