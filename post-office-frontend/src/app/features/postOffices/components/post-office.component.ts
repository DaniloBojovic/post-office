import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { PostOffice } from '../models/postOffice.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostOfficeService } from '../services/post-office.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PostOfficeDialogComponent } from './dialogs/post-office-dialog.component';
import { DeleteDialogComponent } from '../../../shared/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-post-office',
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule],
  templateUrl: './post-office.component.html',
  styleUrl: './post-office.component.scss',
})
export class PostOfficeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private pagination$ = new Subject<{ page: number; limit: number }>();

  postOffices: PostOffice[] = [];
  totalRecord = 0;
  page = 1;
  pageSize = 10;

  constructor(private postOfficeService: PostOfficeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.pagination$
      .pipe(
        switchMap(({ page, limit }) => this.postOfficeService.getPostOfficesWithPaging(page, limit)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response) => {
        this.postOffices = response.data;
        this.totalRecord = response.total;
      });

    this.pagination$.next({ page: this.page, limit: this.pageSize });
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.pagination$.next({
      page: event.pageIndex + 1,
      limit: event.pageSize,
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(PostOfficeDialogComponent, {
      width: '400px',
      data: { postOffice: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postOfficeService.addPostOffice(result).subscribe(() => {
          this.handleDialogResult(true);
        });
      }
    });
  }

  openEditDialog(postOffice: PostOffice): void {
    const dialogRef = this.dialog.open(PostOfficeDialogComponent, {
      width: '400px',
      data: { postOffice },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postOfficeService.updatePostOffice(postOffice.id, result).subscribe(() => {
          this.handleDialogResult(false);
        });
      }
    });
  }

  deletePostOffice(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '250px',
      position: { top: '20vh' },
      data: { message: 'Are you sure you want to delete this post office?' },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.postOfficeService.deletePostOffice(id).subscribe(() => {
          this.handleDialogResult(false, true);
        });
      }
    });
  }

  private handleDialogResult(isAdding: boolean, isDeleting: boolean = false): void {
    this.updateTotalRecords(isAdding, isDeleting);
    this.adjustCurrentPage(isAdding, isDeleting);

    this.refresh();
  }

  private updateTotalRecords(isAdding: boolean, isDeleting: boolean): void {
    if (isAdding) {
      this.totalRecord += 1;
    } else if (isDeleting) {
      this.totalRecord -= 1;
    }
  }

  private adjustCurrentPage(isAdding: boolean, isDeleting: boolean): void {
    const totalPages = Math.ceil(this.totalRecord / this.pageSize);

    if (isAdding && this.page < totalPages) {
      this.page = totalPages;
    } else if (isDeleting && this.page > totalPages) {
      this.page = totalPages;
    }
  }

  refresh(): void {
    this.pagination$.next({ page: this.page, limit: this.pageSize });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
