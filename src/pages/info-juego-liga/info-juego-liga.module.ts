import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoJuegoLigaPage } from './info-juego-liga';
import {SharedModule} from '../../app/shared.module';

@NgModule({
  declarations: [
    InfoJuegoLigaPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoJuegoLigaPage),
    SharedModule
  ],
})
export class InfoJuegoLigaPageModule {}
