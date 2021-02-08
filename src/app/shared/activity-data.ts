import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ActivityData implements InMemoryDbService {

  createDb() {
    //TODO Cambiar datos
    let activities = [
      {
        "id": 1,
        "nombre": "Campamento Azparren",
        "precio": 120,
        "fechaPartida": new Date(2021,11,40).toLocaleString(),
        "fechaFin": new Date(19,11,2021).toLocaleString(),
        "lugares": ["Oroz-Betelu","Azparren"]
      },
      {
        "id": 2,
        "nombre": "Javierada",
        "precio": 15,
        "fechaPartida": new Date(2021,11,40).toLocaleString(),
        "fechaFin": new Date(19,11,2021).toLocaleString(),
        "lugares": ["Huarte","Javier"]
      },
      {
        "id": 3,
        "nombre": "Conviencia Estella",
        "precio": 50,
        "fechaPartida": new Date(2021,11,40).toLocaleString(),
        "fechaFin": new Date(19,11,2021).toLocaleString(),
        "lugares": ["Estella"]
      },
      {
        "id": 4,
        "nombre": "Excursión Irotz",
        "precio": 0,
        "fechaPartida": new Date(2021,11,40).toLocaleString(),
        "fechaFin": new Date(19,11,2021).toLocaleString(),
        "lugares": ["Huarte","Zabaldika","Irotz"]
      }
    ];
    return { activities: activities };
  }
}
