import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { SessionService } from "../services/session.service";
import { UnauthGuard } from "./unauth.guard";

describe("UnauthGuard", () => {
	let guard: UnauthGuard;
	let mockRouter: Router;
	let mockSessionService: Partial<SessionService>;

	beforeEach(async () => {
		mockRouter = { navigate: jest.fn() } as any;
		mockSessionService = { isLogged: false };

		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [
				UnauthGuard,
				{ provide: Router, useValue: mockRouter },
				{ provide: SessionService, useValue: mockSessionService },
			],
		}).compileComponents();

		guard = TestBed.inject(UnauthGuard);
	});

	it('should redirect to "rentals" if the user is logged in', () => {
		mockSessionService.isLogged = true;
		const canActivate = guard.canActivate();
		expect(canActivate).toBe(false);
		expect(mockRouter.navigate).toHaveBeenCalledWith(["rentals"]);
	});

	it("should allow access if the user is not logged in", () => {
		mockSessionService.isLogged = false;
		const canActivate = guard.canActivate();
		expect(canActivate).toBe(true);
	});
});
