import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../../services/notification/notification.service";
import {Policy} from "../../models/Policy";
import {PolicyService} from "../../services/policy/policy.service";
import {DialogContentComponent} from "../dialog-content/dialog-content.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.css']
})
export class DataManagerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() data?: Array<Policy>;

  displayedColumns: string[] = ['policy_number', 'customer_name', 'policy_type', 'status', 'premium_amount',
    'start_date', 'end_date', 'actions'];

  dataSource: MatTableDataSource<Policy> = new MatTableDataSource<Policy>();
  selection = new SelectionModel<Policy>(true, []);

  constructor(
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private policyService: PolicyService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.dataSource.data = this.data;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.selection.clear();
  }


  deletePolicy(policy: Policy) {
    this.spinner.show();
    this.policyService.deletePolicy(policy.id).subscribe(res => {
      this.spinner.hide();
      this.notificationService.showNotification({
        status: 'success',
        title: 'Success',
        text: `Policy with id ${policy.policy_number} deleted successfully.`,
        autoclose: true,
      })
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== policy.id);
    })
  }

  updatePolicy(policy: Policy) {
    this.openPolicyDialog(policy)
  }

  createPolicy() {
    this.openPolicyDialog()
  }


  openPolicyDialog(policy: Policy | null = null) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '600px',
      data: policy ? {...policy}: {}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (policy){
          const index = this.dataSource.data.findIndex(item => item.id === policy.id);
          this.dataSource.data[index] = result
        }else {
          this.dataSource.data.push(result)
        }
        this.dataSource.data = [...this.dataSource.data];
      }
    })
  }


  checkExpiringPolicies() {
    this.spinner.show()
    this.policyService.checkExpiringPolicies().subscribe(res => {
      this.spinner.hide()
      this.notificationService.showNotification({
        status: 'info',
        title: 'Check complete',
        text: 'check your email for expiring policies'
      })
    })
  }
}
