import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Image,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

// import { IconArrowLeft } from "@tabler/icons";

export default function IndividualPokemon() {
  const router = useRouter();
  const { id } = router.query;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const fetchOnePokemon = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.json();
  };

  const { data, isLoading, error, isPending } = useQuery({
    queryKey: ["indPokemonData"],
    queryFn: fetchOnePokemon,
    enabled: !!id,
  });

  console.log(data);
  // Handle loading and error states
  if (isLoading | isPending) {
    return <LoadingOverlay visible />;
  }

  if (error) {
    return <Text> Error loading Pokemon data</Text>;
  }

  return (
    <Container fluid>
      <Link href={"/pokedex"}>
        <Button m={"sm"}>
          {" "}
          <IconArrowLeft /> Back to Pokedex
        </Button>
      </Link>
      {data ? (
        <Flex align="center" justify="center">
          <Title>
            {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
          </Title>
        </Flex>
      ) : (
        <Title>No data available</Title>
      )}
      <Flex align="center" justify="center">
        <div>
          <Card
            shadow="xl"
            padding="lg"
            style={{ backgroundColor: "#f9f9f9" }}
            withBorder
          >
            <Title order={3}>Base Stats</Title>
            {data.stats.map((stat) => (
              <div key={stat.stat.name}>
                <Text>{`${stat.stat.name}: ${stat.base_stat}`}</Text>
              </div>
            ))}
          </Card>
          <Card
            shadow="xl"
            padding="lg"
            style={{ backgroundColor: "#f9f9f9", marginTop: "1rem" }}
            withBorder
          >
            <Title order={3}>Abilities</Title>
            {data.abilities.map((ability) => (
              <Text key={ability.ability.name}>{ability.ability.name}</Text>
            ))}
          </Card>
          <Card
            shadow="xl"
            padding="lg"
            style={{ backgroundColor: "#f9f9f9", marginTop: "1rem" }}
            withBorder
          >
            <img src={data.sprites.front_default} alt="" />
          </Card>
          <Card
            shadow="xl"
            padding="lg"
            style={{ backgroundColor: "#f9f9f9", marginTop: "1rem" }}
            withBorder
          >
            {" "}
            <img src={data.sprites.front_shiny} alt="" />
          </Card>
        </div>
        <Image src={imageUrl} width="100%" />
        <div style={{ marginLeft: "1rem" }}>
          <Card
            shadow="xl"
            padding="xl"
            style={{ backgroundColor: "#f9f9f9", marginTop: "1rem" }}
            withBorder
          >
            <Title order={3}>Appears in</Title>
            {data.game_indices.map((game) => (
              <p style={{ margin: 0 }} key={game.game_index}>
                {game.version.name}
              </p>
            ))}
          </Card>
        </div>
      </Flex>
    </Container>
  );
}
