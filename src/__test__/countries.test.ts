import { dataSource } from "../db";
import { Country } from "../entities/Country";

// Fonction demandée dans l'énoncé pour vider la BDD
export async function clearDB() {
  await dataSource.synchronize(true);
}

// Avant tous les tests, on initialise la connexion
beforeAll(async () => {
  await dataSource.initialize();
});

// Avant chaque test, on vide la base pour ne pas polluer les résultats
beforeEach(async () => {
  await clearDB();
});

// Après tous les tests, on ferme la connexion
afterAll(async () => {
  await dataSource.destroy();
});

describe("Tests d'intégration - Pays", () => {
  test("doit lire une liste vide au départ", async () => {
    const repository = dataSource.getRepository(Country);
    const countries = await repository.find();
    expect(countries).toHaveLength(0);
  });

  test("doit lire les pays correctement après un ajout", async () => {
    const repository = dataSource.getRepository(Country);
    
    // On simule l'ajout d'un pays
    const country = repository.create({ 
      code: "FR", 
      name: "France", 
      emoji: "🇫🇷" 
    });
    await repository.save(country);

    // On teste la lecture
    const countries = await repository.find();
    expect(countries).toHaveLength(1);
    expect(countries[0].name).toBe("France");
  });
});