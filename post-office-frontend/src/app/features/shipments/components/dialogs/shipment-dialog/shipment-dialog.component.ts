import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Shipment } from '../../../models/shipment.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PostOfficeService } from '../../../../postOffices/services/post-office.service';
import { PostOffice } from '../../../../postOffices/models/postOffice.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shipment-dialog',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './shipment-dialog.component.html',
  styleUrl: './shipment-dialog.component.scss',
})
export class ShipmentDialogComponent {
  form: FormGroup;
  postOffices: PostOffice[] = [];

  constructor(
    private fb: FormBuilder,
    private postOfficeService: PostOfficeService,
    public dialogRef: MatDialogRef<ShipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { shipment: Shipment | null }
  ) {
    this.form = this.fb.group({
      type: [data?.shipment?.type || '', Validators.required],
      status: [data?.shipment?.status || '', Validators.required],
      weightCategory: [data?.shipment?.weightCategory || '', Validators.required],
      originPostOfficeId: [data?.shipment?.originPostOfficeId || null, Validators.required],
      destinationPostOfficeId: [data?.shipment?.destinationPostOfficeId || null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.postOfficeService.getPostOffices().subscribe((postOffices) => {
      this.postOffices = postOffices;
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
