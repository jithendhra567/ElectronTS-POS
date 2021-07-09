import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-navlist2',
  templateUrl: './navlist2.component.html',
  styleUrls: ['./navlist2.component.css']
})

export class NavList2Component {
  @Output() sidenav2Close = new EventEmitter();

  constructor() {}

  public onSidenav2Close = () => {
    this.sidenav2Close.emit();
  }
}
