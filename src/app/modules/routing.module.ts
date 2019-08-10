import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../components/main/main.component';
import {CalculatorComponent} from '../components/calculator/calculator.component';


const appRoutes: Routes = [
  {path: 'calculator', component: CalculatorComponent},
  // {path: '', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', component: MainComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
})
export class RoutingModule {
}
