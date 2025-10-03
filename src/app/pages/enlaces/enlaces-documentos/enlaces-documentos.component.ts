import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-enlaces-documentos',
  imports: [RouterModule],
  templateUrl: './enlaces-documentos.component.html',
})
export class EnlacesDocumentosComponent {

  onBackClick(event: Event) {
  event.preventDefault(); // para que no haga nada raro
  console.log("Botón Volver presionado ✅");

}
 }
