import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

// Hier alle Komponenten von @angular/material importieren

@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
