import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

//Importamos las páginas necesarias
import { JuegoSeleccionadoPage } from '../juego-seleccionado/juego-seleccionado';

export interface OpcionSeleccionada {
  nombre: string;
  id: string;
}


@IonicPage()
@Component({
  selector: 'page-juego-puntos',
  templateUrl: 'juego-puntos.html',
})
export class JuegoPuntosPage {

  // URLs que utilizaremos
  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';

  // PARAMETROS QUE RECOGEMOS DE LA PAGINA PREVIA
  grupoId: number;

// Opciones para mostrar en la lista desplegable para seleccionar el tipo de juego que listar
opcionesMostrar: OpcionSeleccionada[] = [
  {nombre: 'Todos los juegos', id: 'todosLosJuegos'},
  {nombre: 'Juegos de puntos', id: 'juegosDePuntos'},
  {nombre: 'Juegos de colección', id: 'juegosDeColeccion'},
  {nombre: 'Juegos de competición Liga', id: 'juegosDeCompeticionLiga'},
  {nombre: 'Juegos de competición Fórmula Uno', id: 'juegosDeCompeticionFormulaUno'},
];

  // Recogemos los tres tipos de juegos que tenemos y las metemos en una lista, tanto activos como inactivos
  juegosDePuntos:any[];
  juegosDeColeccion:any[];
  juegosDeCompeticion:any[];

  // AHORA SEPARAMOS ENTRE LOS JUEGOS ACTIVOS E INACTIVOS DE CADA TIPO DE JUEGO

  // Separamos entre juegos de puntos activos e inactivos
  juegosDePuntosActivos: any[] = [];
  juegosDePuntosInactivos: any[] = [];

  // Separamos entre juegos de coleccion activos e inactivos
  juegosDeColeccionActivos: any[] = [];
  juegosDeColeccionInactivos: any[] = [];

  // Separamos entre juegos de competición activos e inactivos
  juegosDeCompeticionLigaActivos: any[] = [];
  juegosDeCompeticionLigaInactivos: any[] = [];
  juegosDeCompeticionFormulaUnoActivos: any[] = [];
  juegosDeCompeticionFormulaUnoInactivos: any[] = [];


  // HACEMOS DOS LISTAS CON LOS JUEGOS ACTIVOS E INACTIVOS DE LOS TRES TIPOS DE JUEGOS
  todosLosJuegosActivos: any[] = [];
  todosLosJuegosInactivos: any[] = [];

  // Al seleccionar el tipo de juego que deseo mostrar de la lista desplegable (OpcionSeleccionada), copiaremos esa lista
  // en este vector, ya que será de donde se sacará la información que se mostrará
  ListaJuegosSeleccionadoActivo: any[];
  ListaJuegosSeleccionadoInactivo: any[];

  opcionSeleccionada: string = 'todosLosJuegos';
  juegoSeleccionado: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.grupoId=navParams.get('id');
  }

  //Se realizarán las siguiente tareas al inicializar la página.
  ionViewDidLoad() {
    console.log('Bienvenido a la página de Juegos');

    // Recupera la lista de juegos que tiene el grupo (primero el de puntos, después de colección y después los totales)
    // y los va clasificando en activo e inactivo
    this.ListaJuegosDePuntos();
  }

  //////////////////////////////////////// FUNCIONES PARA LISTAR JUEGOS ///////////////////////////////////////////////


  // Busca la lista de juego de puntos y la clasifica entre activo e inactivo, y activa la función ListaJuegosDeColeccion
  ListaJuegosDePuntos() {
    this.http.get<any[]>(this.APIUrlGrupos + '/' + this.grupoId + '/juegoDePuntos')
    .subscribe(juegos => {
      console.log('He recibido los juegos de puntos');

      for (let i = 0; i < juegos.length; i++) {
        if (juegos[i].JuegoActivo === true) {
          this.juegosDePuntosActivos.push(juegos[i]);
        } else {
          this.juegosDePuntosInactivos.push(juegos[i]);
        }
      }
      this.ListaJuegosDeColeccion();
    });
  }


  // Busca la lista de juego de coleccion y la clasifica entre activo e inactivo, y activa la función ListaJuegosDeCompeticion
  ListaJuegosDeColeccion() {
    this.http.get<any[]>(this.APIUrlGrupos + '/' + this.grupoId + '/juegoDeColeccions')
    .subscribe(juegos => {
      console.log('He recibido los juegos de coleccion');

      for (let i = 0; i < juegos.length; i++) {
        if (juegos[i].JuegoActivo === true) {
          this.juegosDeColeccionActivos.push(juegos[i]);
        } else {
          this.juegosDeColeccionInactivos.push(juegos[i]);
        }
      }
      this.ListaJuegosDeCompeticionLiga();
    });
  }


  // Busca la lista de juego de competicion y la clasifica entre activo e inactivo, y activa la función ListaJuegosTotales
  ListaJuegosDeCompeticionLiga() {
    this.http.get<any[]>(this.APIUrlGrupos + '/' + this.grupoId + '/JuegosDeCompeticionLiga')
    .subscribe(juegos => {
      console.log('He recibido los juegos de competición Liga');

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < juegos.length; i++) {
        if (juegos[i].JuegoActivo === true) {
          this.juegosDeCompeticionLigaActivos.push(juegos[i]);
        } else {
          this.juegosDeCompeticionLigaInactivos.push(juegos[i]);
        }
      }
      this.ListaJuegosDeCompeticionFormulaUno();
    });
  }
  ListaJuegosDeCompeticionFormulaUno() {
    this.http.get<any[]>(this.APIUrlGrupos + '/' + this.grupoId + '/JuegosDeCompeticionFormulaUno')
    .subscribe(juegos => {
      console.log('He recibido los juegos de competición Formula Uno');
      console.log(juegos);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < juegos.length; i++) {
        if (juegos[i].JuegoActivo === true) {
          this.juegosDeCompeticionFormulaUnoActivos.push(juegos[i]);
          console.log(juegos[i]);
        } else {
          this.juegosDeCompeticionFormulaUnoInactivos.push(juegos[i]);
        }
      }
      this.ListaJuegosTotales();
    });
  }

  // Una vez recibidos los juegos de puntos y colección y clasificados en activos e inactivos, los metemos dentro de la
  // lista total de juegos activos e inactivos
  ListaJuegosTotales() {

    for (let i = 0; i < (this.juegosDePuntosActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDePuntosActivos[i]);
    }

    for (let i = 0; i < (this.juegosDePuntosInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDePuntosInactivos[i]);
    }

    for (let i = 0; i < (this.juegosDeColeccionActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDeColeccionActivos[i]);
    }

    for (let i = 0; i < (this.juegosDeColeccionInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDeColeccionInactivos[i]);
    }

    for (let i = 0; i < (this.juegosDeCompeticionLigaActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDeCompeticionLigaActivos[i]);
    }

    for (let i = 0; i < (this.juegosDeCompeticionLigaInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDeCompeticionLigaInactivos[i]);
    }

    for (let i = 0; i < (this.juegosDeCompeticionFormulaUnoActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDeCompeticionFormulaUnoActivos[i]);
    }

    for (let i = 0; i < (this.juegosDeCompeticionFormulaUnoInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDeCompeticionFormulaUnoInactivos[i]);
    }

    // Por defecto al principio mostraremos la lista de todos los juegos, con lo que la lista seleccionada para mostrar
    // será la de todos los juegos
    this.ListaJuegosSeleccionadoActivo = this.todosLosJuegosActivos;
    this.ListaJuegosSeleccionadoInactivo = this.todosLosJuegosInactivos;
  }


  // En función de la opción que deseemos muestrear (opcionSeleccionada) en la lista de juegos, el vector
  // ListaJuegosSeleccionadoActivo y ListaJuegosSeleccionadoInactivo tomará un valor u otro
  ListaJuegoSeleccionado() {

    console.log('Busquemos la lista correspondiente');
    console.log(this.opcionSeleccionada);

    if (this.opcionSeleccionada === 'todosLosJuegos') {
      this.ListaJuegosSeleccionadoActivo = this.todosLosJuegosActivos;
      this.ListaJuegosSeleccionadoInactivo = this.todosLosJuegosInactivos;
    }
    if (this.opcionSeleccionada === 'juegosDePuntos') {
      this.ListaJuegosSeleccionadoActivo = this.juegosDePuntosActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDePuntosInactivos;
    }

    if (this.opcionSeleccionada === 'juegosDeColeccion') {
      this.ListaJuegosSeleccionadoActivo = this.juegosDeColeccionActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDeColeccionInactivos;
    }

    if (this.opcionSeleccionada === 'juegosDeCompeticionLiga') {

      this.ListaJuegosSeleccionadoActivo = this.juegosDeCompeticionLigaActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDeCompeticionLigaInactivos;
    }

    if (this.opcionSeleccionada === 'juegosDeCompeticionFormulaUno') {

      this.ListaJuegosSeleccionadoActivo = this.juegosDeCompeticionFormulaUnoActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDeCompeticionFormulaUnoInactivos;
    }
  }

  // Función que usaremos para clicar en un juego y entrar en él, enviándolo al servicio
  JuegoSeleccionado(juego: any) {
    this.navCtrl.push (JuegoSeleccionadoPage,{juego:juego});
  }


}
