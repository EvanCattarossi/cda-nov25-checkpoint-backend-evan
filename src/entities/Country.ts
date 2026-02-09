import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@Entity()
@ObjectType()
export class Country {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  emoji: string;
}

@InputType()
export class CountryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;
}