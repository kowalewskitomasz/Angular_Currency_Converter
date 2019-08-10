import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule
  ]

})
export class SharedModule {
}

