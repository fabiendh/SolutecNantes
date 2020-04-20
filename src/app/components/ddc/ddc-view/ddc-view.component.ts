import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";

import { ReloadableComponentComponent } from "../../common/reloadable-component/reloadable-component.component";
import { DDCService } from "../../../services/ddc.service";
import { Article } from "../../../models/article";
import { ConfirmDialogComponent } from "../../common/confirm-dialog/confirm-dialog.component";

import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { startWith, map } from "rxjs/operators";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material/autocomplete";
export interface Skill {
  name: string;
}

@Component({
  selector: "app-ddc-view",
  templateUrl: "./ddc-view.component.html",
  styleUrls: ["./ddc-view.component.css"],
})
export class DDCViewComponent extends ReloadableComponentComponent
  implements OnInit {
  public title: string;
  public form: FormGroup;
  public new = false;
  public item: Article;
  public dataSource = new MatTableDataSource();
  public displayedColumns = ["id", "purchaseDate", "customerName"];

  // Chips list autocomplete
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = ["Java"];
  allSkills: string[] = [
    "Java",
    "Angular",
    "VueJS",
    "C#",
    "Kotlin",
    "Postgres",
  ];

  @ViewChild("skillInput") skillInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ddcService: DDCService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    super(dialog);
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) =>
        skill ? this._filter(skill) : this.allSkills.slice()
      )
    );
  }

  // Chips list autocomplete
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our skill
    if ((value || "").trim()) {
      this.skills.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.skillCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = "";
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(
      (skill) => skill.toLowerCase().indexOf(filterValue) === 0
    );
  }

  // Accordion
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const idConsumer = params["idConsumer"];

      if (idConsumer != null) {
        this.ddcService.getById(idConsumer).subscribe(
          (data) => {
            this.initForm(data);
          },
          (error) => {
            this.displayError(
              (error = 404 ? "Client inconnu" : "Erreur inconnue"),
              false
            );
          }
        );
      } else {
        this.initForm(new Article());
      }
    });
  }

  initForm(item: Article) {
    this.item = item;
    if (!item.id) {
      this.new = true;
      this.title = "Nouvel Article";
    } else {
      this.title = item.name;
    }
    this.form = this.fb.group({
      id: new FormControl({ value: item.id, disabled: true }, []),
      name: new FormControl({ value: item.name, disabled: false }, [
        Validators.required,
      ]),
      stock: new FormControl({ value: item.stock, disabled: false }, [
        Validators.required,
      ]),
    });
    this.dataSource.data = item.commands;
    this.isLoadingResults = false;
  }

  save() {
    const article = <Article>this.form.getRawValue();

    this.isLoadingResults = true;
    if (this.new) {
      this.ddcService.create(article).subscribe(
        (data) => {
          this.initForm(data);
        },
        (error) => {
          this.displayError("Impossible de créer ce Client : " + error, true);
        }
      );
    } else {
      this.ddcService.update(article).subscribe(
        (data) => {
          this.initForm(data);
        },
        (error) => {
          this.displayError(
            "Impossible de mettre à jour ce Client : " + error,
            true
          );
        }
      );
    }
  }

  openDeleteDialog(): void {
    const dialogConf = this.dialog.open(ConfirmDialogComponent, {
      width: ConfirmDialogComponent.smallSize,
      data: { question: "Voulez-vous vraiment supprimer cet article ?" },
    });

    dialogConf.afterClosed().subscribe((result) => {
      if (result) {
        this.ddcService.delete(this.item).subscribe(
          (data) => {
            this.router.navigate(["/article"]);
          },
          (error) => {
            this.displayError(
              "Impossible de supprimer cet article : " + error,
              true
            );
          }
        );
      }
    });
  }
}
