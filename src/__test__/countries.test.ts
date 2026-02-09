import { dataSource } from "../db";
import { Country } from "../entities/Country";


export async function clearDB() {
  await dataSource.synchronize(true);
}

beforeAll(async () => {
  await dataSource.initialize();
});

beforeEach(async () => {
  await clearDB();
});


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
    
   
    const country = repository.create({ 
      code: "FR", 
      name: "France", 
      emoji: "🇫🇷" 
    });
    await repository.save(country);

   
    const countries = await repository.find();
    expect(countries).toHaveLength(1);
    expect(countries[0].name).toBe("France");
  });
});