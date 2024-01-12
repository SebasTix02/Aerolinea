import { Component } from '@angular/core';
import { MenuService, IMenu } from 'src/app/services/menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gad-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {
  path:IMenu

  constructor(private menuService:MenuService,
              private activatedRoute:ActivatedRoute){
                const currentPath = "/" + activatedRoute.snapshot.pathFromRoot[1].routeConfig?.path
                this.path = menuService.getMenuByUrl(currentPath)
              }

}
