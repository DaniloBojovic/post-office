import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PostOffice } from '../../models/postOffice.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-office-dialog',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './post-office-dialog.component.html',
  styleUrl: './post-office-dialog.component.scss',
})
export class PostOfficeDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PostOfficeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { postOffice: PostOffice | null }
  ) {
    this.form = this.fb.group({
      name: [data?.postOffice?.name || '', Validators.required],
      zipCode: [data?.postOffice?.zipCode || '', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
