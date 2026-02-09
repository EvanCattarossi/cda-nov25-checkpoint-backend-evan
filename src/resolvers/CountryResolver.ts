import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import { dataSource } from "../db";

@Resolver()
export class CountryResolver {
  
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await dataSource.getRepository(Country).find();
  }

  @Query(() => Country, { nullable: true })
  async countryByCode(@Arg("code") code: string): Promise<Country | null> {
    return await dataSource.getRepository(Country).findOneBy({ code });
  }

  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string
  ): Promise<Country> {
    const repository = dataSource.getRepository(Country);
    const newCountry = repository.create({ code, name, emoji });
    return await repository.save(newCountry);
  }
}