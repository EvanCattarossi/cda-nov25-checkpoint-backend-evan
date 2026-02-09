import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { dataSource } from "./db";
import { CountryResolver } from "./resolvers/CountryResolver";

async function main() {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`🚀 Serveur prêt à l'adresse : ${url}`);
}

main();