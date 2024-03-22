"use client";

import { useParams, useRouter } from "next/navigation";

import Head from "next/head";
import { title } from "process";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button, Form, Spinner } from "react-bootstrap";
import Image from "next/image";
import usePokemon from "@/app/hooks/usePokemon";
import { FormEvent } from "react";
import * as PokemonApi from "@/app/api/pokemon-api";

export default function PokemonDetailsPage() {
  const router = useRouter();
  const params = useParams<{ pokemon: string }>();
  const pokemonName = params.pokemon?.toString() || "";

  const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName);
  const handleSubmitNickname = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nickname = formData.get("nickname")?.toString().trim();
    if (!nickname || !pokemon) return;

    const update = await PokemonApi.setNickName(pokemon, nickname);
    mutatePokemon(update, { revalidate: false });
  };

  return (
    <>
      {/* <div>{pokemon && <p>{`${pokemon.name} - NextJS Pokédex`}</p>}</div> */}

      <div className="d-flex flex-column align-items-center">
        <p>
          <Button
            onClick={() => router.back()}
            className="link-light text-decoration-none"
          >
            <FaArrowLeftLong /> Pokédex
          </Button>
        </p>
        {pokemonLoading && <Spinner animation="grow" />}
        {pokemon === null && <p>Pokemon not found</p>}
        {pokemon && (
          <>
            <h1 className="text-center text-capitalize">{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={"Pokemon: " + pokemon.name}
              width={360}
              height={360}
            />
            <div className="d-inline-block mt-2">
              <div>
                <strong>Types: </strong>
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </div>
              <div>
                <strong>Height: </strong>
                {pokemon.height * 10} cm
              </div>
              <div>
                <strong>Weight: </strong>
                {pokemon.weight / 10} kg
              </div>
            </div>
            <Form onSubmit={handleSubmitNickname} className="mt-4">
              <Form.Group className="mb-3" controlId="pokemon-nickname-input">
                <Form.Label>Give the Pokemon a nickname</Form.Label>
                <Form.Control name="nickname" placeholder="E.g. Nashon" />
                <Button type="submit" className="d-block m-auto mt-2">
                  Set nickname
                </Button>
              </Form.Group>
            </Form>
          </>
        )}
      </div>
    </>
  );
}
