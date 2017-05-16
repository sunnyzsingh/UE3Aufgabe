import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from "../services/authentification.service";

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: '../views/login.html'
})
export class LoginComponent {

    loginError: boolean = false;
    model: any = {};
    

    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    onSubmit(form: NgForm): void {
        //TODO Überprüfen Sie die Login-Daten über die REST-Schnittstelle und leiten Sie den Benutzer bei Erfolg auf die Overview-Seite weiter
        let username = form.control.value.username;
        let password = form.control.value.password;

        this.model = {username,password};
        this.authenticationService.login(this.model.username,this.model.password).subscribe(
            data => {
                if(data){
                    this.loginError = false;
                    this.router.navigate(['/overview']);
                }else{
                    this.loginError = true;
                    this.authenticationService.counterLogin();
                   
                }
            },
            error => {
                console.log("error")
            });
    }
}
