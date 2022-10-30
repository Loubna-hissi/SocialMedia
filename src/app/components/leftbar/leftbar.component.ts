import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {

  constructor(private router:Router,
              ) { }

  ngOnInit(): void {
  }
}
