import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { VersionService } from "../../services/tools/version.service";
import { NavItem } from "../common/navigation/nav-item";
import { NavService } from "../common/navigation/nav.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {
  @ViewChild("appDrawer") appDrawer: ElementRef;

  public visible: boolean;
  public mobileQuery: MediaQueryList;
  public version = "1.0.0";
  public date = new Date();
  public platform = "Pack";

  /**
   * Custom slidebar
   */
  navItems: NavItem[] = [
    {
      displayName: "DDC",
      iconName: "folder_shared",
      route: "ddc",
      children: [
        {
          displayName: "Consulter",
          iconName: "visibility",
          route: "ddc/1",
        },
        {
          displayName: "Editer",
          iconName: "create",
          route: "ddc/new",
        },
      ],
    },
    {
      displayName: "MC",
      iconName: "blur_on",
      route: "mc",
      children: [
        {
          displayName: "Consulter",
          iconName: "visibility",
          route: "mc/1",
        },
        {
          displayName: "Editer",
          iconName: "create",
          route: "mc/new",
        },
      ],
    },
  ];

  private _mobileQueryListener: () => void;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private versionService: VersionService,
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private navService: NavService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 800px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    versionService.get().subscribe((data) => {
      this.version = data.version;
      this.date = data.installationDate;
      this.platform = data.platform;
    });
  }

  ngOnInit() {
    if (
      localStorage.getItem("authenticatedRole") &&
      localStorage.getItem("authenticatedRole") !== "null"
    ) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  disconnect() {
    this.authService.logout();
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
