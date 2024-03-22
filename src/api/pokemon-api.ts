import { Pokemon, PokemonPage } from "@/models/Pokemon";

export async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data: Pokemon = await res.json();
  return data;
}

export async function getPokemonPage(page: number): Promise<PokemonPage> {
  const pageSize = 12;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${
      pageSize * (page - 1)
    }`
  );
  const data: PokemonPage = await res.json();
  return data;
}

export async function setNickName(pokemon: Pokemon, nickname: string) {
  return { ...pokemon, name: nickname };
}
