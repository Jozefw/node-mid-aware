const { response } = require('express');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();


// this is our middleware, between req and resp  
app.use(morgan(dev));
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// route handlers
const getAllTours = (req,res)=>{
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((item)=>
        (item.id === id)
    )
    if(id > tours.length){
        return res.status(404).json({
            status:'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status:'success',
        data:{
            tour
        }
    })
};

const createTours =(req,res)=>{
   res.status(200).json({
       status:"Success",
       results:tours.length,
       data:{
           tours
        }
   })

    const newId = tours[tours.length-1]+1;
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour);
};

const updateTour = (req,res)=>{

}

const deleteTour = (req,resp)=>{

}

// routes

    app
    .route('/api/v1/tours/')
    .get(getAllTours)
    .post(createTours)

    app
    .route('/api/v1/tours/:id')
    .get(tour)
    .patch(updateTour)
    .delete(deleteTour)




// start server  

const port = 3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})