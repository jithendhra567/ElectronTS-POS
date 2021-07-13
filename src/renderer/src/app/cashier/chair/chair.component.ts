import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.scss']
})
export class ChairComponent implements OnInit {

  @Input() rotation: string;

  rotationData = "rotate(0deg)"

  constructor() { }

  ngOnInit(): void {
    this.rotationData =  `rotate(${this.rotation}deg)`;
  }

}
