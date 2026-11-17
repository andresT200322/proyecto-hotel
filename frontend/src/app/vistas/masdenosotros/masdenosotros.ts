import { Component } from '@angular/core';
import { Tarjeta } from '../../components/tarjeta/tarjeta';

interface Cabana {
  titulo: string;
  descripcion: string;
  imagenes: string[];
}

const API = 'http://localhost:3001/fotos';

@Component({
  imports: [Tarjeta],
  selector: 'app-masdenosotros',
  styleUrl: './masdenosotros.css',
  templateUrl: './masdenosotros.html',
})
export class Masdenosotros {
  cabanas: Cabana[] = [
    {
      titulo: 'Nuestra piscina',
      descripcion: 'Nuestra amplia piscina con zona de recreación, vista desde varios ángulos.',
      imagenes: [
        `${API}/piscina1.webp`,
        `${API}/piscina_y_zona%20de%20recreacion.webp`,
      ],
    },
    {
      titulo: 'Quiosco BBQ',
      descripcion: 'El quiosco con zona de asados, visto desde sus dos ángulos.',
      imagenes: [`${API}/quiosco.webp`, `${API}/quiosco_zona_brq.webp`],
    },
    {
      titulo: 'Área social',
      descripcion: 'Espacio para eventos, reuniones y celebraciones con vista al campo.',
      imagenes: [`${API}/area_social.webp`],
    },
    {
      titulo: 'Parqueadero',
      descripcion: 'Parqueadero amplio y seguro para todos nuestros huéspedes.',
      imagenes: [`${API}/parqueadero.webp`],
    },
  ];
}
