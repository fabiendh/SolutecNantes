import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-reloadable-component',
  templateUrl: './reloadable-component.component.html',
  styleUrls: ['./reloadable-component.component.css']
})
export class ReloadableComponentComponent implements OnInit {
  public errorMessage: string;
  public isLoadingResults = true;
  public error: boolean;

  constructor(
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  displayMessage(message: string) {
    this.dialog.open(InfoDialogComponent, {
      width: InfoDialogComponent.smallSize,
      data: { info: message }
    });
  }

  displayError(message: string, modal: boolean) {
    if (modal) {
      this.dialog.open(InfoDialogComponent, {
        width: InfoDialogComponent.smallSize,
        data: { info: message }
      });
    } else {
      this.error = true;
      this.errorMessage = message;
    }
    this.isLoadingResults = false;
  }
}
