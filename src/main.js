// La siguiente aplicación carga unos colores en base a una petición que se hace a un API Rest. Se hizo con VueJS
var vue_det = new Vue({
   el: '#principal', // Nombre de la aplicación para definir el nodo principal
   vuetify: new Vuetify(), // Se inicializan Vuetify que sirve para usar controles con material design
   data: {
      title: 'Cuento', // Título de la página en la parte de arriba
      info: {},
      personaje: null,
      lugar: null,
      objeto: null,
      situacion: null,
      personajes: [],
      lugares: [],
      objetos: [],
      situaciones: [],
      getData(){
         this.personajes = [];
         this.lugares = [];
         this.objetos = [];
         this.situaciones = [];
         // id de la hoja de calculo
         // let idSheets = '1sbZtJvR5q_1rdDF34sWNaylH-1j_41gSCgEYYZRRIU8'; 
         let idSheets = '1nCh8YJn_elqgLiuEAwYV5ibvIZ5KtUrQJ8tPXhHUWVw'; 

         //// nuestra      APIKey
         // let apiKey = 'AIzaSyDL9yj6t6e5P0d-YVmbx9ms4VmoOE_l2E4';

         let apiKey = 'AIzaSyBeKtRparAnHcZ_HFg_0m5QE_8m31k4Jw0';  

         // rango de la hoja de calculo que queremos leer
         let values = 'A2:AZ100';
         // fetch es un método nativo para hacer peticiones http
         // en el navegador  fetch()

         // Petición para obtener los cuentos
         axios
            .get("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/A2:AZ100?access_token="+ apiKey +"&key="+  apiKey)
            .then(response => {
               this.info = response.data.values;
               if(response.data.values.length > 0)
               {
                  for (let index = 0; index < response.data.values.length; index++) {
                     this.personajes.push(response.data.values[index][1]);
                     this.lugares.push(response.data.values[index][2]);
                     this.objetos.push(response.data.values[index][3]);
                     this.situaciones.push(response.data.values[index][4]);
                  }
                  this.personaje = this.personajes[(Math.floor(Math.random()*this.personajes.length))];
                  this.lugar = this.lugares[(Math.floor(Math.random()*this.lugares.length))];
                  this.objeto = this.objetos[(Math.floor(Math.random()*this.objetos.length))];
                  this.situacion = this.situaciones[(Math.floor(Math.random()*this.situaciones.length))];
               }
            })
            .catch(err=>{  
               console.log(err);
            });
      }
   },
   methods: {
      reloadData() {
         location.reload();
      }
   },
   mounted() {
      // Método al inicializar la página web
      this.getData();
   },
   props: {
      source: String,
   }
  
});