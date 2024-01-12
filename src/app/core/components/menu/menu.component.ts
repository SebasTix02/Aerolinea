import { Component, EventEmitter, Output } from '@angular/core';
import { IMenu, MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'gad-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  listMenu: IMenu[]
  expanded = true
  @Output() onToggleExpanded: EventEmitter<boolean> = new EventEmitter<boolean>()


  constructor(private menuService:MenuService){
    this.listMenu = menuService.getMenu()
  }

  toggleExpanded(){
    this.expanded=!this.expanded
    this.onToggleExpanded.emit(this.expanded)
  }
}
