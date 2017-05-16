import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentification.service";

@Component({
  moduleId: module.id,
  selector: 'my-sidebar',
  templateUrl: '../views/sidebar.component.html'
})
export class SidebarComponent implements OnInit{

  failed_logins: number = 0;
  server_start: Date = new Date();

 constructor(private authenticationService: AuthenticationService) {
    }

  ngOnInit(): void {
    //TODO Lesen Sie über die REST-Schnittstelle den Status des Servers aus und speichern Sie diesen in obigen Variablen

    this.failed_logins = this.authenticationService.getCount();


  }
}
