import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HttpXsrfTokenExtractor,
} from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ErrorComponent } from "./components/common/error/error.component";
import { ConfirmDialogComponent } from "./components/common/confirm-dialog/confirm-dialog.component";
import { InfoDialogComponent } from "./components/common/info-dialog/info-dialog.component";
import { AuthGuard } from "./services/auth/auth.guard";
import { AuthService } from "./services/auth/auth.service";
import { LoginComponent } from "./components/login/login.component";
import { HttpInterceptorService } from "./services/tools/http-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MainComponent } from "./components/main/main.component";
import { MCListComponent } from "./components/mc/mc-list/mc-list.component";
import { MCViewComponent } from "./components/mc/mc-view/mc-view.component";
import { MCService } from "./services/mc.service";
import { DDCListComponent } from "./components/ddc/ddc-list/ddc-list.component";
import { DDCViewComponent } from "./components/ddc/ddc-view/ddc-view.component";
import { DDCService } from "./services/ddc.service";
import { ReloadableComponentComponent } from "./components/common/reloadable-component/reloadable-component.component";
import { PlatformLocation, APP_BASE_HREF, CommonModule } from "@angular/common";
import { MenuListItemComponent } from "./components/common/navigation/menu-list-item/menu-list-item.component";
import { TopNavComponent } from "./components/common/navigation/top-nav/top-nav.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { NavService } from "./components/common/navigation/nav.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MCListComponent,
    MCViewComponent,
    ErrorComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    LoginComponent,
    DDCListComponent,
    DDCViewComponent,
    ReloadableComponentComponent,
    // Custom slidebar
    MenuListItemComponent,
    TopNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,

    CommonModule,
    FlexLayoutModule,
  ],
  entryComponents: [ConfirmDialogComponent, InfoDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    MCService,
    DDCService,
    AuthGuard,
    AuthService,

    NavService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}
