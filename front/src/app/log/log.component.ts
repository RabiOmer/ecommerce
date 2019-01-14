import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  template: '',
  styles: []
})
export class LogComponent implements OnInit {

  constructor(private router: Router) {
    this.router.navigate(['/home']);
   }

  ngOnInit() {
  }

}
