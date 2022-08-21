import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() refrescaLista = new EventEmitter();
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async verDetalle( id: string ){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    // El parametro data solo aplica si quieres pasar parametros, sino
    // que daria .then( () => { } y en el emit el parametro.
    modal.onDidDismiss().then( (data) => {
      this.refrescaLista.emit();
    });

    modal.present();
  }
}
