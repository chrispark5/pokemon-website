import { useQuery } from "@tanstack/react-query";
import { Card, Image, Group, Badge, Text, Title, LoadingOverlay, Container, Flex, Center } from "@mantine/core";
import Link from "next/link";

// In progress website 

export default function PokemonListPage() {
  const fetchAllPokemon = async () => {
    const requests = Array.from({ length: 1025 }, (_, index) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`).then((res) => res.json())
    );
    return Promise.all(requests); // Wait for all requests to complete
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['allPokemonData'],
    queryFn: fetchAllPokemon,
  });

  if (isLoading) return <LoadingOverlay visible />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
     
    <Container fluid mx={"xl"}>
      <Flex align={"center"} justify={"center"}>
        <Title order={1} m={"lg"}>Pokédex</Title>
      </Flex>
    <Group position="center" justify="space-between"direction="column" spacing="lg" mt={50}>
      {data.map((pokemon) => (
        <Link href={`/pokedex/${pokemon.id}`} key={pokemon.id} style={{textDecoration: 'none'}}>
        <Card key={pokemon.id} shadow="xl" padding="lg" style={{ width: 200 }} >
          <Card.Section>
            <Image src={pokemon.sprites.front_default} alt={pokemon.name} height={160} />
          </Card.Section>
          
         
            <Title order={3}>{pokemon.name.toUpperCase()}</Title>
            <Badge color="blue" variant="light">
              #{pokemon.id}
            </Badge>
          

          <Text weight={500} size="md">Type: {pokemon.types.map((type) => type.type.name).join(", ")}</Text>
          {/* <Text weight={500} size="md">Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</Text>
          <Text weight={500} size="md">Base Experience: {pokemon.base_experience}</Text> */}
        </Card>
          </Link>
      ))}
    </Group>
    </Container>
    </div>

  );
}
