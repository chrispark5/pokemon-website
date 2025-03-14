import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Image,
  Group,
  Badge,
  Title,
  LoadingOverlay,
  Container,
  Flex,
  Center,
  Button,
  Text,
} from "@mantine/core";
import Link from "next/link";
import CustomNavbar from "../../components/MyNavbar";
import { useState } from "react";


export default function PokemonListPage() {
  const fetchPokemonPage = async (page) => {
    const limit = 50;
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
  const { data, isLoading, error } = useQuery({
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
          spacing="lg"
          mt={50}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {data.map((pokemon) => (
            <Link
              href={`/pokedex/${pokemon.id}`}
              key={pokemon.id}
              style={{ textDecoration: "none" }}
            >
              <Card
                shadow="sm"
                padding="lg"
                style={{
                  width: 200,
                  height: 300,
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Card.Section>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                    height={160}
                  />
                </Card.Section>

                <Text
                  order={3}
                  style={{ fontSize: "1rem", textAlign: "center" }}
                >
                  {pokemon.name.toUpperCase()}
                </Text>
                <Badge
                  color="blue"
                  variant="light"
                  style={{ alignSelf: "center" }}
                >
                  #{pokemon.id}
                </Badge>
              </Card>
            </Link>
          ))}
        </Group>
        <Center mt="lg">
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            style={{ marginRight: 10 }}
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
