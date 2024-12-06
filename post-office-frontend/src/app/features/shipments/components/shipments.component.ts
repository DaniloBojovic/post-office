import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShipmentsService } from '../services/shipments.service';
import { MatTableModule } from '@angular/material/table';
import { combineLatest, debounceTime, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PostOfficeService } from '../../postOffices/services/post-office.service';
import { CommonModule } from '@angular/common';
import { Shipment } from '../models/shipment.model';
import { PostOffice } from '../../postOffices/models/postOffice.model';
import { MatDialog } from '@angular/material/dialog';
import { ShipmentDialogComponent } from './dialogs/shipment-dialog/shipment-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from '../../../shared/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-shipments',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.scss',
})
export class ShipmentsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private unsubscribe$ = new Subject<void>();
  private statusFilter$ = new Subject<string>();
  private weightFilter$ = new Subject<string>();
  private idFilter$ = new Subject<string>();
  private originPostOfficeFilter$ = new Subject<number | null>();
  private destinationPostOfficeFilter$ = new Subject<number | null>();
  private pagination$ = new Subject<{ page: number; limit: number }>();

  postOffices: PostOffice[] = [];
  shipments: Shipment[] = [];
  totalRecord = 0;
  page = 1;
  pageSize = 10;

  constructor(private shipmentsService: ShipmentsService, private postOfficeService: PostOfficeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.postOfficeService.getPostOffices().subscribe((postOffices) => {
      this.postOffices = postOffices;
      console.log(this.postOffices);
    });

    combineLatest([
      this.pagination$,
      this.statusFilter$.pipe(startWith('')),
      this.weightFilter$.pipe(startWith('')),
      this.idFilter$.pipe(startWith(''), debounceTime(300)),
      this.originPostOfficeFilter$.pipe(startWith(null)),
      this.destinationPostOfficeFilter$.pipe(startWith(null)),
    ])
      .pipe(
        switchMap(([pagination, status, weight, id, originPostOfficeId, destinationPostOfficeId]) =>
          this.shipmentsService.getShipments(pagination.page, pagination.limit, {
            status,
            weight,
            id,
            originPostOfficeId,
            destinationPostOfficeId,
          })
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response) => {
        this.shipments = response.data;
        console.log(this.shipments);
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
    console.log(this.page);
  }

  onStatusChange(status: string): void {
    this.statusFilter$.next(status);
  }

  onWeightChange(weight: string): void {
    this.weightFilter$.next(weight);
  }

  onIdChange(event: Event): void {
    const id = (event.target as HTMLInputElement).value || '';
    this.idFilter$.next(id);
  }

  onOriginPostOfficeChange(postOfficeId: number | null): void {
    this.originPostOfficeFilter$.next(postOfficeId);
  }

  onDestinationPostOfficeChange(postOfficeId: number | null): void {
    this.destinationPostOfficeFilter$.next(postOfficeId);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ShipmentDialogComponent, {
      width: '400px',
      data: { shipment: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.shipmentsService.addShipment(result).subscribe(() => {
          this.handleDialogResult(true);
        });
      }
    });
  }

  openEditDialog(shipment: Shipment): void {
    const dialogRef = this.dialog.open(ShipmentDialogComponent, {
      width: '400px',
      data: { shipment },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.shipmentsService.updateShipment(shipment.id, result).subscribe(() => {
          this.handleDialogResult(false);
        });
      }
    });
  }

  deleteShipment(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '250px',
      position: { top: '20vh' },
      data: { message: 'Are you sure you want to delete this shipment?' },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.shipmentsService.deleteShipment(id).subscribe(() => {
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
    const totalPages = Math.ceil(this.totalRecord / this.pageSize);
    this.page = Math.min(this.page, totalPages);
    if (this.paginator) {
      this.paginator.pageIndex = this.page - 1;
      this.paginator._changePageSize(this.pageSize);
    }

    this.pagination$.next({ page: this.page, limit: this.pageSize });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
