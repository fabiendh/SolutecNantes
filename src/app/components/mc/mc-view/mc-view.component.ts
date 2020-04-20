import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { MCService } from '../../../services/mc.service';
import { Customer } from '../../../models/customer';
import { ReloadableComponentComponent } from '../../common/reloadable-component/reloadable-component.component';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-mc-view',
  templateUrl: './mc-view.component.html',
  styleUrls: ['./mc-view.component.css']
})
export class MCViewComponent extends ReloadableComponentComponent
  implements OnInit {
  public title: string;
  public form: FormGroup;
  public new = false;
  public item: Customer;
  public dataSource = new MatTableDataSource();
  public displayedColumns = ['id', 'purchaseDate', 'articleName'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mcService: MCService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    super(dialog);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idCustomer = params['idCustomer'];

      if (idCustomer != null) {
        this.mcService.getById(idCustomer).subscribe(
          data => {
            this.initForm(data);
          },
          error => {
            this.displayError(
              (error = 404 ? 'Client inconnu' : 'Erreur inconnue'),
              false
            );
          }
        );
      } else {
        this.initForm(new Customer());
      }
    });
  }

  initForm(item: Customer) {
    this.item = item;
    if (!item.id) {
      this.new = true;
      this.title = 'Nouveau client';
    } else {
      this.title = item.firstName + ' ' + item.lastName;
    }
    this.form = this.fb.group({
      id: new FormControl({ value: item.id, disabled: true }, []),
      lastName: new FormControl({ value: item.lastName, disabled: false }, [
        Validators.required
      ]),
      firstName: new FormControl({ value: item.firstName, disabled: false }, [
        Validators.required
      ]),
      email: new FormControl({ value: item.email, disabled: false }, []),
      telephone: new FormControl(
        { value: item.telephone, disabled: false },
        []
      ),
      creationDate: new FormControl(
        { value: item.creationDate, disabled: true },
        []
      )
    });
    this.dataSource.data = item.commands;
    this.isLoadingResults = false;
  }

  save() {
    const consumer = <Customer>this.form.getRawValue();

    this.isLoadingResults = true;
    if (this.new) {
      this.mcService.create(consumer).subscribe(
        data => {
          this.initForm(data);
        },
        error => {
          this.displayError('Impossible de créer ce Client : ' + error, true);
        }
      );
    } else {
      this.mcService.update(consumer).subscribe(
        data => {
          this.initForm(data);
        },
        error => {
          this.displayError(
            'Impossible de mettre à jour ce Client : ' + error,
            true
          );
        }
      );
    }
  }

  openDeleteDialog(): void {
    const dialogConf = this.dialog.open(ConfirmDialogComponent, {
      width: ConfirmDialogComponent.smallSize,
      data: { question: 'Voulez-vous vraiment supprimer ce client ?' }
    });

    dialogConf.afterClosed().subscribe(result => {
      if (result) {
        this.mcService.delete(this.item).subscribe(
          _ => {
            this.router.navigate(['/customer']);
          },
          error => {
            this.displayError(
              'Impossible de supprimer ce Client : ' + error,
              true
            );
          }
        );
      }
    });
  }
}
