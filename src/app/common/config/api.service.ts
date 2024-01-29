import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { DataService } from "../services/data.service";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(public data: DataService) { }

    authenticateuser(body: any): Observable<any> {
        this.data.serviceStarted();
        return this.data
            .login('https://apiv2stg.promilo.com/user/oauth/token', body)
            .pipe(
                finalize(() => this.data.serviceCompleted()),
                catchError((err) => {
                    //this.data.errorMethod(err);
                    return throwError(err);
                })
            );
    }

    getProductList(): Observable<any> {
        this.data.serviceStarted();
        return this.data.getData('https://api.kalpav.com/api/v1/product/category/retail').pipe(
            finalize(() => this.data.serviceCompleted()),
            catchError((err) => {
                this.data.errorMethod(err);
                return throwError(err);
            })
        );
    }
}