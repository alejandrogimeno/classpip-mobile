import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ResponseContentType, Http} from '@angular/http';
import {TablaAlumnoJuegoDeCompeticion} from '../../clases/TablaAlumnoJuegoDeCompeticion';
import {TablaEquipoJuegoDeCompeticion} from '../../clases/TablaEquipoJuegoDeCompeticion';
import {AlumnoJuegoDeCompeticionLiga} from '../../clases/AlumnoJuegoDeCompeticionLiga';
import {EquipoJuegoDeCompeticionLiga} from '../../clases/EquipoJuegoDeCompeticionLiga';
import {InformacionPartidosLiga} from '../../clases/InformacionPartidosLiga';
import {TablaJornadas} from '../../clases/TablaJornadas';
import {Jornada} from '../../clases/Jornada';

@IonicPage()
@Component({
  selector: 'page-info-juego-liga',
  templateUrl: 'info-juego-liga.html',
})

export class InfoJuegoLigaPage {

  // PARAMETROS QUE RECOGEMOS DE LA PAGINA PREVIA
  juegoSeleccionado: any;
  rankingAlumnoJuegoDeCompeticion: TablaAlumnoJuegoDeCompeticion[] = [];
  rankingEquiposJuegoDeCompeticion: TablaEquipoJuegoDeCompeticion[] = [];
  jornadas: Jornada[];
  JornadasCompeticion: TablaJornadas[] = [];

  // PARAMETROS DEL JUEGO




  // URLs que utilizaremos
  private APIRURLJuegoDePuntos = 'http://localhost:3000/api/JuegosDePuntos';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private http2: Http ) {
    this.juegoSeleccionado=navParams.get('juego');
    console.log(this.juegoSeleccionado);
    this.rankingAlumnoJuegoDeCompeticion=navParams.get('rankingAlumnoJuegoDeCompeticion');
    console.log(this.rankingAlumnoJuegoDeCompeticion);
    this.rankingEquiposJuegoDeCompeticion=navParams.get('rankingEquiposJuegoDeCompeticion');
    console.log(this.rankingEquiposJuegoDeCompeticion);
    this.jornadas=navParams.get('jornadas');
    console.log(this.jornadas);
    this.JornadasCompeticion=navParams.get('JornadasCompeticion');
    console.log(this.JornadasCompeticion);


  }

  //Al iniciar la pantalla, estas serán las acciones que se realizaran
  ionViewDidLoad() {
    console.log('Bienvenido a la página de información del Juego de Liga');


  }

}
