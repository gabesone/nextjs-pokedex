"use client";

import PokemonEntry from "@/components/PokemonEntry";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import * as PokemonApi from "@/app/api/pokemon-api";
import { Button, Col, Row, Spinner } from "react-bootstrap";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.get("page")?.toString() || "1";
  const page = parseInt(params);

  router.forward;
  console.log(page);

  const { data, isLoading } = useSWR(["getPokemonPage", page], () =>
    PokemonApi.getPokemonPage(page)
  );

  if (isLoading)
    return <Spinner animation="border" className="d-block m-auto" />;

  return (
    <div>
      <h1 className="text-center mb-4">Gotta cache &apos;em all</h1>
      {/* <Link href={"pokemon/bulbasaur"} className="link-light">
        Bulbasaur
      </Link> */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {data?.results.map((pokemon) => (
          <Col key={pokemon.name}>
            <PokemonEntry name={pokemon.name} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center gap-2 mt-4">
        {data?.previous && (
          <Button onClick={() => router.push(`/?page=${page - 1}`)}>
            Previous page
          </Button>
        )}
        {data?.next && (
          <Button onClick={() => router.push(`/?page=${page + 1}`)}>
            Next page
          </Button>
        )}
      </div>
    </div>
  );
}
