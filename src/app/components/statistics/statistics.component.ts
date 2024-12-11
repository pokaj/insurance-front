import {Component, Input, OnInit} from '@angular/core';
import {Policy} from "../../models/Policy";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @Input() data?: Array<Policy>

  constructor() { }
  activeNumber?: number

  ngOnInit(): void {
    if (this.data) {
      this.activeNumber = this.filterActivePolicies(this.data);
    }
  }

  filterActivePolicies(policies: Array<Policy>){
    return policies.filter(policy => policy.status === 'active').length
  }


}
