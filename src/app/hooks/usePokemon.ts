import useSWR from "swr";
import * as PokemonApi from "@/app/api/pokemon-api";
import { NextResponse } from "next/server";
import { isNotFoundError } from "next/dist/client/components/not-found";

export default function usePokemon(name: string) {
  const { data, isLoading, mutate } = useSWR(name, async () => {
    try {
      return await PokemonApi.getPokemon(name);
    } catch (error) {
      console.log(error, "eror");
      if (error) {
        return null;
      }
    }
  });

  return {
    pokemon: data,
    pokemonLoading: isLoading,
    mutatePokemon: mutate,
  };
}
