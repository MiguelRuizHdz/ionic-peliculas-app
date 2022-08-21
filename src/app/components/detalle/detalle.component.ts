import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  slideOptActores = {
    slidesPerView: 3.2,
    freeMode: true,
    spacebetween: -10
  }

  estrella = 'star-outline';

  constructor( private moviesService: MoviesService,
                private modalCtrl: ModalController, 
                private dataLocal: DataLocalService) { }

  async ngOnInit() {
    // console.log('ID', this.id);

    const existe = await this.dataLocal.existePelicula( this.id )
      .then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline');
    console.log('Detalle component existe: ', existe);

    this.moviesService.getPeliculaDetalle( this.id)
    .subscribe( resp => {
      console.log('Detalle',resp);
      this.pelicula = resp;
    });
    this.moviesService.getActoresPelicula( this.id)
    .subscribe( resp => {
      console.log('Actores',resp);
      this.actores = resp.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async favorito() {
    const existe = await this.dataLocal.guardarPelicula( this.pelicula );
    this.estrella = ( existe ) ? 'star' : 'star-outline';
  }

}
