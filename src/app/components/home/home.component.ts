import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";
import {PolicyService} from "../../services/policy/policy.service";
import {Policy} from "../../models/Policy";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spinner: NgxSpinnerService,
    private policyService: PolicyService,
  ) { }

  policies?: Array<Policy>
  ngOnInit(): void {
    this.fetchPolicies()
  }

  fetchPolicies = () => {
    this.spinner.show()
    this.policyService.fetchPolicies().subscribe((res)=> {
      this.spinner.hide();
      this.policies = res.data
    })
  }

}
