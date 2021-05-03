import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-freunde',
  templateUrl: './freunde.component.html',
  styleUrls: ['./freunde.component.scss']
})
export class FreundeComponent implements OnInit {
  @Output() selectedPage = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

}
