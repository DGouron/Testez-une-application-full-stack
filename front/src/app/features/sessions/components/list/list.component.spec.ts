import { HttpClientModule } from "@angular/common/http";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { of } from "rxjs";
import { SessionService } from "src/app/services/session.service";
import { SessionApiService } from "../../services/session-api.service";
import { ListComponent } from "./list.component";

describe("ListComponent", () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;
	let mockSessionService: any;
	let mockSessionApiService: any;

	beforeEach(async () => {
		mockSessionService = {
			sessionInformation: { admin: true },
		};
		mockSessionApiService = {
			all: jest.fn().mockReturnValue(of([])),
		};

		await TestBed.configureTestingModule({
			declarations: [ListComponent],
			imports: [HttpClientModule, MatCardModule, MatIconModule],
			providers: [
				{ provide: SessionService, useValue: mockSessionService },
				{ provide: SessionApiService, useValue: mockSessionApiService },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create the component", () => {
		expect(component).toBeTruthy();
	});

	it("should call sessionApiService.all and retrieve sessions", () => {
		expect(mockSessionApiService.all).toHaveBeenCalled();
		component.sessions$.subscribe((sessions) => {
			expect(sessions).toEqual([]);
		});
	});

	it("should fetch user from sessionService", () => {
		expect(component.user?.admin).toBe(true);
	});
});
