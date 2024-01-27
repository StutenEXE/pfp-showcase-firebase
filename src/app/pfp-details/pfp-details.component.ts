import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Pfp } from '../shared/models/pfp.model';

@Component({
  selector: 'app-pfp-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pfp-details.component.html',
  styleUrl: './pfp-details.component.scss'
})
export class PfpDetailsComponent implements OnInit {

  pfp!: Pfp;

  test: string | null = null;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.test = this._route.snapshot.paramMap.get("id");
  }

}
