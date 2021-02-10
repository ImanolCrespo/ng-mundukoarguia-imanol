var express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Activity{
    constructor(
        public id: number,
        public nombre: string,
        public fechaPartida: Date,
        public fechaFin: Date,
        public lugares: string[],
        public precio: number
    ){}
}

const activities: Activity[] = [
    new Activity(
        0,
        "Campamento Arizkun",
        new Date(2021,7,16),
        new Date(2021,7,28),
        ["Arizkun","Gorraiz de Arce"],
        120
    ),
    new Activity(
        1,
        "Convivencia Estella",
        new Date(2021,2,19),
        new Date(2021,2,21),
        ["Estella"],
        50
    ),
    new Activity(
        2,
        "Javierada",
        new Date(2021,3,14),
        new Date(2021,3,14),
        ["Huarte","Lumbier", "Javier"],
        15
    ),
    new Activity(
        3,
        "Guerra de agua",
        new Date(2021,6,26),
        new Date(2021,6,26),
        ["Mokarte","Ferial","Piscinas de Huarte"],
        0
    )
]

function getActivities():any[] {
    return activities;    
}

app.use(function (req:any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json())

app.post('/activities', bodyParser.json(), (req: any, res: any)=>{

    let actNew = new Activity(
        activities.length+1,
        req.body.nombre,
        req.body.fechaPartida,
        req.body.fechaFin,
        ["Huarte"],
        req.body.precio
    );
    
    activities.push(actNew);
    res.status(200).send({
        id: actNew.id,
        nombre: actNew.nombre,
        fechaPartida: actNew.fechaPartida,
        fechaFin: actNew.fechaFin,
        lugares: actNew.lugares,
        precio: actNew.precio
    });
})

app.get('/', (req: any, res:  any)=>{
    res.send('The URL of activities is http://localhost:8000/activities');
});

app.get('/activities', (req: any, res: any)=>{
    res.json(getActivities());
});


function getActivitiesById(activityId:number): any {
    let a: any;
    a = activities.find(a=> a.id == activityId);
    return a;
}

app.get('/activities/:id', (req: any, res: any)=>{
    res.json(getActivitiesById(parseInt(req.params.id)));
});


function updateActivitiesById(req:any, activityId: number): any {
    let a: any;
    a = activities.find(a=> a.id == activityId);
    let index = activities.indexOf(a);

    a.nombre = req.body.nombre,
    a.fechaPartida = req.body.fechaPartida,
    a.fechaFin = req.body.fechaFin,
    a.lugares = req.body.lugares,
    a.precio = req.body.precio

    activities[index] = a;
    return a;
}

app.put('/activities/:id', function (req:any, res:any) {
    res.json(updateActivitiesById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});


function deleteActivitiesById(activityId:number): any {
    let a: any;
    a = activities.find(a=> a.id == activityId);
    let index = activities.indexOf(a);
    delete activities[index];
    return a;
}

app.delete('/activities/:id', function (req:any, res:any) {
    res.json(deleteActivitiesById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
  });

  const server = app.listen(8000, "localhost", () => {
    const { address, port } = server.address();
  
    console.log('Listening on %s %s', address, port);
  });