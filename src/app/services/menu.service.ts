import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

export interface IMenu{
  title:string;
  url:string;
  icon:string;
}


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private listMenu:IMenu[] = [
    {title: 'Vuelos', url:'/vuelos', icon:'vuelos'},
    {title: 'Compra', url:'/compra', icon:'compras'},
    {title: 'Usuarios', url:'/usuarios', icon:'usuarios'},
  ]
  constructor() { }

  getMenu():IMenu[]{
    return[...this.listMenu]
  }

  getMenuByUrl(url:string):IMenu{
    return this.listMenu.find(
      (menu) => menu.url.toLocaleLowerCase()==url.toLocaleLowerCase()
    )as IMenu
  }
}
