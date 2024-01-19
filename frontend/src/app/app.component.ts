import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import Aos from 'aos';
import {isPlatformBrowser} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      Aos.init();
    }
  }
}
