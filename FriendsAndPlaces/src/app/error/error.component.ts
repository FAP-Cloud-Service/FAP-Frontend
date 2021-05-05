import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Output() reload = new EventEmitter<boolean>();
  constructor() { }

  reloadSignal(): void {
    this.reload.emit(true);
  }
  ngOnInit(): void {
  }

}
