import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { SessionService } from "../services/session.service";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
	let guard: AuthGuard;
	let mockRouter: Router;
	let mockSessionService: Partial<SessionService>;

	beforeEach(async () => {
		mockRouter = { navigate: jest.fn() } as any;
		mockSessionService = { isLogged: false };

		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [
				AuthGuard,
				{ provide: Router, useValue: mockRouter },
				{ provide: SessionService, useValue: mockSessionService },
			],
		}).compileComponents();

		guard = TestBed.inject(AuthGuard);
	});

	it('redirects to "login" if not logged in', () => {
		const canActivate = guard.canActivate();
		expect(canActivate).toBe(false);
		expect(mockRouter.navigate).toHaveBeenCalledWith(["login"]);
	});

	it("allows access if logged in", () => {
		mockSessionService.isLogged = true;
		const canActivate = guard.canActivate();
		expect(canActivate).toBe(true);
	});
});
