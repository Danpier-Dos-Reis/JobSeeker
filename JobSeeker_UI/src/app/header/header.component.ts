import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  displayHeader = signal(false);

  onClickMenuToggle() {
    let host = document.getElementsByTagName("app-header")[0] as HTMLDivElement;

    this.displayHeader.update((value) => !value);
    
    if (this.displayHeader()) {
      host.style.width = '0%';
      host.style.transition = 'width 0.5s ease-in-out';
      host.childNodes.forEach((child) => {
        (child as HTMLDivElement).style.display = 'none';
      });
    } else {
      host.style.width = '15%';
      host.style.transition = 'width 0.5s ease-in-out';
      host.childNodes.forEach((child) => {
        (child as HTMLDivElement).style.display = '';
      });
    }

  }

}
