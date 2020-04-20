import { Component, OnInit } from '@angular/core';
import {NavService} from '../nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(
    public navService: NavService,    
    public router: Router,) { }

  ngOnInit() {
  }

}