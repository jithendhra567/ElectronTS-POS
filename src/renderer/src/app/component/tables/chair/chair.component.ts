import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.scss']
})
export class ChairsComponent implements OnInit {

  @Input() rotation: number;

  rotationData = "rotate(0deg)"

  constructor() { }

  ngOnInit(): void {
    this.rotationData =  `rotate(${this.rotation}deg)`;
  }

}
