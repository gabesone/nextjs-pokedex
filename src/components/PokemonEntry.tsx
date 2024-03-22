"use client";

import usePokemon from "@/app/hooks/usePokemon";
import Link from "next/link";
import styles from "@/styles/PokemonEntry.module.css";
import { Spinner } from "react-bootstrap";
import Image from "next/image";

const PokemonEntry = ({ name }: { name: string }) => {
  const { pokemon, pokemonLoading } = usePokemon(name);
  return (
    <Link href={`/pokemon/${name}`}>
      {/* <div className={styles.entry}></div> */}

      {pokemonLoading && <Spinner animation="grow" />}
      {pokemon && (
        <div className={styles.card}>
          <h2 className="text-center text-capitalize">{pokemon.name}</h2>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={"Pokemon: " + pokemon.name}
            width={200}
            height={200}
          />
        </div>
      )}
    </Link>
  );
};

export default PokemonEntry;
