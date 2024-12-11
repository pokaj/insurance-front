import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef,
} from "@angular/material/dialog";
import {Policy} from "../../models/Policy";
import {PolicyService} from "../../services/policy/policy.service";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../../services/notification/notification.service";


@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.css'
})
export class DialogContentComponent {

  policy: Policy = {
    id: 0,
    policy_number: '',
    customer_name: '',
    policy_type: '',
    status: '',
    premium_amount: '',
    start_date: null,
    end_date: null,
  }

  policyTypes: string[] = ['health', 'life', 'auto', 'property', 'travel']
  status: string[] = ['expired', 'pending', 'active']

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Policy,
    private policyService: PolicyService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<DialogContentComponent>,
  ) {
    if (data) {
      this.policy = {...data};
    }
    if (data?.end_date){
      this.policy.end_date = new Date(data.end_date)
    }
    if (data?.start_date){
      this.policy.start_date = new Date(data.start_date)
    }
  }

  savePolicy() {
    this.spinner.show();
    // @ts-ignore
    this.policy.start_date = this.formatDate(this.policy.start_date)
    // @ts-ignore
    this.policy.end_date = this.formatDate(this.policy.end_date)
    if (this.policy.id){
      this.policyService.updatePolicy(this.policy).subscribe(res => {
        this.spinner.hide();
        this.notificationService.showNotification({
          status: 'success',
          title: 'success',
          text: res.message,
          autoclose: true,
        })
        this.closeDialog(res.data)
      })
    } else {
      this.policyService.createPolicy(this.policy).subscribe(res => {
        this.spinner.hide();
        this.notificationService.showNotification({
          status: 'success',
          title: 'success',
          text: res.message,
          autoclose: true,
        })
        this.closeDialog(res.data)
      })
    }

  }

  formatDate(date: null | Date | string){
    // @ts-ignore
    const d = new Date(date)
    return d.toISOString().slice(0, 19).replace('T', ' ')
  }

  closeDialog(data?: Policy): void {
    this.dialogRef.close(data);
  }
}
