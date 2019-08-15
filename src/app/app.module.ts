import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {SharedModule} from './modules/shared.module';
import {CalculatorComponent} from './components/calculator/calculator.component';
import {RouterModule} from '@angular/router';
import {RoutingModule} from './modules/routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RoutingModule,
    RouterModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
