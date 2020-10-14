import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { HomeComponent } from './components/home/home.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { VentasComponent } from './components/ventas/ventas.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'ventas', component: VentasComponent},
  { path: 'gastos', component: GastosComponent},
  { path: 'inventario', component: InventarioComponent},
  { path: 'proveedores', component: ProveedoresComponent},
  { path: 'estadisticas', component: EstadisticasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
