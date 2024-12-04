import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shipment, ShipmentsService } from '../services/shipments.service';
import { MatTableModule } from '@angular/material/table';
import { combineLatest, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-shipments',
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.scss',
})
export class ShipmentsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  shipments: Shipment[] = [];
  totalRecord = 0;
  page = 1;
  pageSize = 10;

  private pagination$ = new Subject<{ page: number; limit: number }>();

  private statusFilter$ = new Subject<string>();

  constructor(private shipmentsService: ShipmentsService) {}

  ngOnInit(): void {
    combineLatest([this.pagination$, this.statusFilter$.pipe(startWith(''))])
      .pipe(
        switchMap(([pagination, status]) => this.shipmentsService.getShipments(pagination.page, pagination.limit, { status })),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response) => {
        this.shipments = response.data;
        this.totalRecord = response.total;
      });

    this.pagination$.next({ page: this.page, limit: this.pageSize });

    // this.pagination$
    //   .pipe(
    //     switchMap(({ page, limit }) => this.shipmentsService.getShipments(page, limit)),
    //     takeUntil(this.unsubscribe$)
    //   )
    //   .subscribe((response) => {
    //     this.shipments = response.data;
    //     this.totalRecord = response.total;
    //   });

    // this.pagination$.next({ page: this.page, limit: this.pageSize });

    // this.shipmentsService
    //   .getShipments()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((response: any) => {
    //     this.shipments = response.data;
    //     console.log('Shipments:', this.shipments);
    //   });
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pagination$.next({
      page: event.pageIndex + 1,
      limit: event.pageSize,
    });
  }

  onStatusChange(status: string): void {
    debugger;
    this.statusFilter$.next(status);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
