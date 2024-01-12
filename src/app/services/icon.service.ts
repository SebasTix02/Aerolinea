import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface Iicon{
  name:string;
  path:string;
}

@Injectable({
  providedIn: 'root'
})



export class IconService {
  private listIcons:Iicon[]=[
    { name: 'avion', path: '../assets/Img/avion.svg' },
    { name: 'compras', path: '../assets/Img/compras.svg' },
    { name: 'vuelos', path: '../assets/Img/vuelos.svg' },
    { name: 'usuarios', path: '../assets/Img/usuarios.svg' },
    { name: 'logo',path:'../assets/Img/inicio.svg'}
  ];

  constructor(private matIconRegistry:MatIconRegistry, private domSanitizer:DomSanitizer) {
    this.registryIcon();
   }

  registryIcon(){
    this.listIcons.forEach((icon)=>{
      this.matIconRegistry.addSvgIcon(icon.name,this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path));
    })
  }
}
