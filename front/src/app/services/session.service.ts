import { Injectable } from "@angular/core";
import { BehaviorSubject, type Observable } from "rxjs";
import type { SessionInformation } from "../interfaces/sessionInformation.interface";

@Injectable({
	providedIn: "root",
})
export class SessionService {
	public isLogged = false;
	public sessionInformation: SessionInformation | undefined;

	private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

	public $isLogged(): Observable<boolean> {
		return this.isLoggedSubject.asObservable();
	}

	public logIn(user: SessionInformation): void {
		this.sessionInformation = user;
		this.isLogged = true;
		this.next();
	}

	public logOut(): void {
		this.sessionInformation = undefined;
		this.isLogged = false;
		this.next();
	}

	private next(): void {
		this.isLoggedSubject.next(this.isLogged);
	}
}
