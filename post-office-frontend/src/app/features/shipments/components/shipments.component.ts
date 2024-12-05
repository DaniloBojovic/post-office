import { Component, OnDestroy, OnInit } from '@angular/core';
import { Shipment, ShipmentsService } from '../services/shipments.service';
import { MatTableModule } from '@angular/material/table';
import { combineLatest, debounceTime, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PostOfficeService } from '../../postOffices/services/post-office.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipments',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.scss',
})
export class ShipmentsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private statusFilter$ = new Subject<string>();
  private weightFilter$ = new Subject<string>();
  private idFilter$ = new Subject<string>();
  private originPostOfficeFilter$ = new Subject<number | null>();
  private destinationPostOfficeFilter$ = new Subject<number | null>();
  private pagination$ = new Subject<{ page: number; limit: number }>();

  postOffices: { id: number; name: string; zipCode: string }[] = [];
  shipments: Shipment[] = [];
  totalRecord = 0;
  page = 1;
  pageSize = 10;

  constructor(private shipmentsService: ShipmentsService, private postOfficeService: PostOfficeService) {}

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

  onWeightChange(weight: string): void {
    debugger;
    this.weightFilter$.next(weight);
  }

  onIdChange(event: Event): void {
    debugger;
    const input = event.target as HTMLInputElement;
    const id = input?.value || '';
    // const id = (event.target as HTMLInputElement).value || '';
    this.idFilter$.next(id);
  }

  onOriginPostOfficeChange(postOfficeId: number | null): void {
    this.originPostOfficeFilter$.next(postOfficeId);
  }

  onDestinationPostOfficeChange(postOfficeId: number | null): void {
    this.destinationPostOfficeFilter$.next(postOfficeId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
