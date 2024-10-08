import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CardGeneratorComponent } from "./card-generator/card-generator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CardGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pagetitle = 'ecard';
  title = '';
  visitorCount: number = 0;

  constructor() {}

  async ngOnInit() {
  
  }
}
