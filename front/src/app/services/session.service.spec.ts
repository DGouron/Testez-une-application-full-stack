// Dans ce fichier, nous allons progressivement analyser et tester le service SessionService.
// Nous allons ajouter des commentaires à chaque étape pour expliquer notre démarche.

// 1. Importer les éléments nécessaires
import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface'; // <-- un modèle pour la session
import { SessionInformationFactory } from '../models/session.factory';

describe('SessionService', () => {
  let service: SessionService;

  // 2. Définir une fausse data pour nos tests
  //    Cette data représente un utilisateur connecté, ce qui nous servira pour la méthode logIn().
  //    Dans un projet "real world", on pourrait stocker ce genre de data dans un dossier "models/factories".
  const mockSessionInfo: SessionInformation = SessionInformationFactory.create({
    id: 1,
  });;


  beforeEach(() => {
    // 3. Configurer le module de test pour injecter le service
    //    Ici, nous n'avons pas de dépendances externes, donc nous n'avons pas besoin de mocks supplémentaires
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  // 4. Test unitaire : vérifier que le service peut être instancié sans erreur
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // 5. Test unitaire : vérifier que l’état initial du service correspond à ce que l’on attend
  //    (ici, on s’attend à ce que isLogged soit false par défaut)
  it('should have isLogged as false initially', () => {
    expect(service.isLogged).toBe(false);
    expect(service.sessionInformation).toBeUndefined();
  });

  // 6. Test unitaire : vérifier que logIn() met à jour l’état du service
  it('should log in a user correctly', () => {
    service.logIn(mockSessionInfo);
    // Nous vérifions que isLogged passe bien à true
    expect(service.isLogged).toBe(true);
    // Et que la sessionInformation stocke bien nos données mock
    expect(service.sessionInformation).toEqual(mockSessionInfo);
  });

  // 7. Test unitaire : vérifier que logOut() réinitialise les données
  it('should log out a user correctly', () => {
    // On commence par logIn() pour s'assurer que le service modifie son état
    service.logIn(mockSessionInfo);
    // Puis on appelle logOut()
    service.logOut();
    // isLogged devrait redevenir false
    expect(service.isLogged).toBe(false);
    // sessionInformation devrait être vide
    expect(service.sessionInformation).toBeUndefined();
  });

  // 8. Test d’intégration : vérifier que $isLogged() émet bien les changements
  //    Nous appelons cela test d’intégration car on utilise BehaviorSubject/Observable et on observe le comportement asynchrone.
  it('should emit isLogged status changes (integration test)', (done) => {
    service.$isLogged().subscribe((status) => {
      // Quand isLogged change, on s’attend à récupérer la valeur mise à jour
      expect(status).toBe(true);
      done();
    });
    service.logIn(mockSessionInfo); // On déclenche un changement
  });

  // 9. Test d’intégration : vérifier que $isLogged() émet aussi lors d’un logOut()
  it('should emit isLogged status changes on log out (integration test)', (done) => {
    // On commence par logIn()
    service.logIn(mockSessionInfo);
    // On s’abonne avant de logOut(), pour détecter le second changement (true -> false)
    service.$isLogged().subscribe((status) => {
      expect(status).toBe(false);
      done();
    });
    service.logOut();
  });
});