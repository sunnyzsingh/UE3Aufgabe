"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
var http_1 = require("@angular/http");
require('rxjs/Rx');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.counter = 0;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var ob = { username: username, password: password };
        return this.http.post('http://localhost:8081/onSubmit', ob).map(function (response) { return response.json(); });
    };
    AuthenticationService.prototype.counterLogin = function () {
        this.counter++;
    };
    AuthenticationService.prototype.getCount = function () {
        return this.counter;
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentification.service.js.map