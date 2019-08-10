import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  selected: String = 'option2';
  selected2: String = 'option2';

  //TODO create http service and start handling currency data from NBP Web API
  constructor() {
  }

  ngOnInit() {
  }

}
