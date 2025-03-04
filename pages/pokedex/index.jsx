import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Image,
  Group,
  Badge,
  Text,
  Title,
  LoadingOverlay,
  Container,
  Flex,
  Center,
  Button,
} from "@mantine/core";
import Link from "next/link";
import CustomNavbar from "../../components/MyNavbar";
import { useState } from "react";

// In progress website

export default function PokemonListPage() {
  const fetchAllPokemon = async () => {
    const requests = Array.from({ length: 1025 }, (_, index) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`).then((res) =>
        res.json()
      )
    );
    return Promise.all(requests); // Wait for all requests to complete
  };

  const fetchPokemonPage = async (page) => {
    const limit = 50; // Number of Pokémon per page
    const offset = (page - 1) * limit;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    const pokemonDetails = await Promise.all(
      data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      )
    );
    return pokemonDetails;
  };
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["pokemonPage", page],
    queryFn: () => fetchPokemonPage(page),
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingOverlay visible />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Container fluid mx={"xl"}>
        <Flex align={"center"} justify={"center"}>
          <Title order={1} m={"lg"}>
            Pokédex
          </Title>
        </Flex>
        <CustomNavbar />

        <Group
          position="center"
          justify="space-between"
          direction="column"
          spacing="lg"
          mt={50}
        >
          {data.map((pokemon) => (
            <Link
              href={`/pokedex/${pokemon.id}`}
              key={pokemon.id}
              style={{ textDecoration: "none" }}
            >
              <Card
                key={pokemon.id}
                shadow="xl"
                padding="lg"
                style={{ width: 200 }}
              >
                <Card.Section>
                  {/* <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    height={160}
                  /> */}
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    height={160}
                  />
                </Card.Section>

                <Title order={3}>{pokemon.name.toUpperCase()}</Title>
                <Badge color="blue" variant="light">
                  #{pokemon.id}
                </Badge>

                <Text weight={500} size="md">
                  Type: {pokemon.types.map((type) => type.type.name).join(", ")}
                </Text>
                {/* <Text weight={500} size="md">Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</Text>
          <Text weight={500} size="md">Base Experience: {pokemon.base_experience}</Text> */}
              </Card>
            </Link>
          ))}
        </Group>
        <Center mt="lg">
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            style={{ marginRight: 10 }} // Add margin to the right
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((old) => old + 1)}
            disabled={data.length < 50}
          >
            Next
          </Button>
        </Center>
      </Container>
    </div>
  );
}
