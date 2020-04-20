import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { merge ,  of as observableOf } from 'rxjs';
import { catchError ,  startWith ,  map ,  switchMap } from 'rxjs/operators';
import { MCService } from '../../../services/mc.service';

@Component({
  selector: 'app-mc-list',
  templateUrl: './mc-list.component.html',
  styleUrls: ['./mc-list.component.css']
})
export class MCListComponent implements OnInit {
  displayedColumns = ['id', 'lastName', 'firstName'];

  public dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private mcService: MCService,
    public dialog: MatDialog) { }

  ngOnInit() {
    merge()
      .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.mcService.getAll();
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.resultsLength = data.length;
        return data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.resultsLength = 0;
        return observableOf([]);
      })
      ).subscribe(data => this.load(data));
  }

  load(data) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
