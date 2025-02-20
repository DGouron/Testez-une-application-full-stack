import { HttpClientModule } from "@angular/common/http";
import { NgZone } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { SessionService } from "../../../../services/session.service";
import { TeacherService } from "../../../../services/teacher.service";
import { SessionApiService } from "../../services/session-api.service";
import { FormComponent } from "./form.component";

describe("FormComponent", () => {
	let component: FormComponent;
	let fixture: ComponentFixture<FormComponent>;
	let mockSessionService: any;
	let mockSessionApiService: any;
	let mockTeacherService: any;
	let mockMatSnackBar: any;
	let ngZone: NgZone;
	let mockActivatedRoute: any;
	let mockRouter: any;

	beforeEach(async () => {
		mockSessionService = {
			sessionInformation: { admin: true },
		};
		mockSessionApiService = {
			detail: jest.fn().mockReturnValue(of({})),
			create: jest.fn().mockReturnValue(of({})),
			update: jest.fn().mockReturnValue(of({})),
		};
		mockTeacherService = {
			all: jest.fn().mockReturnValue(of([])),
		};
		mockMatSnackBar = {
			open: jest.fn(),
		};
		mockActivatedRoute = {
			snapshot: {
				paramMap: {
					get: jest.fn().mockReturnValue("123"),
				},
			},
		};
		mockRouter = {
			navigate: jest.fn(),
			url: "/update",
		};

		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientModule,
				MatCardModule,
				MatIconModule,
				MatFormFieldModule,
				MatInputModule,
				ReactiveFormsModule,
				MatSnackBarModule,
				MatSelectModule,
				BrowserAnimationsModule,
			],
			declarations: [FormComponent],
			providers: [
				{ provide: SessionService, useValue: mockSessionService },
				{ provide: SessionApiService, useValue: mockSessionApiService },
				{ provide: TeacherService, useValue: mockTeacherService },
				{ provide: MatSnackBar, useValue: mockMatSnackBar },
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: Router, useValue: mockRouter },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FormComponent);
		component = fixture.componentInstance;
		ngZone = TestBed.inject(NgZone);
		fixture.detectChanges();
	});

	// Test unitaire
	it("should create the component", () => {
		expect(component).toBeTruthy();
	});

	// Test unitaire
	it("should call sessionApiService.create on submit if onUpdate is false", () => {
		component.onUpdate = false;
		component.submit();
		expect(mockSessionApiService.create).toHaveBeenCalled();
	});

	// Test unitaire
	it("should call sessionApiService.update on submit if onUpdate is true", () => {
		component.onUpdate = true;
		component.submit();
		expect(mockSessionApiService.update).toHaveBeenCalledWith(
			"123",
			component.sessionForm?.value,
		);
	});

	// Test d'intégration
	it("should navigate if user is not admin", () => {
		mockSessionService.sessionInformation.admin = false;
		ngZone.run(() => {
			component.ngOnInit();
		});
		expect(mockRouter.navigate).toHaveBeenCalledWith(["/sessions"]);
	});

	// Test d'intégration
	it("should call detail if update route detected", () => {
		ngZone.run(() => {
			component.ngOnInit();
		});
		expect(mockSessionApiService.detail).toHaveBeenCalledWith("123");
	});

	// Test d'intégration
	it("should navigate using NgZone", () => {
		ngZone.run(() => {
			component["router"].navigate(["sessions"]);
		});
		expect(mockRouter.navigate).toHaveBeenCalledWith(["sessions"]);
	});
});
