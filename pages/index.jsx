import { useQuery } from "@tanstack/react-query";
import { Card, Image, Group, Badge, Text, Title, LoadingOverlay } from "@mantine/core";

// In progress website 

export default function PokemonListPage() {
  // Fetch Pokémon data for IDs 1 to 100
  const fetchAllPokemon = async () => {
    const requests = Array.from({ length: 900 }, (_, index) =>
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
           <Title order={2}>Pokédex</Title>
    <Group position="center" direction="column" spacing="lg" mt={50}>
      {data.map((pokemon) => (
        <Card key={pokemon.id} shadow="sm" padding="lg" style={{ width: 200 }}>
          <Card.Section>
            <Image src={pokemon.sprites.front_default} alt={pokemon.name} height={160} />
          </Card.Section>
          
          <Group position="apart" mt="md" mb="xs">
            <Title order={3}>{pokemon.name.toUpperCase()}</Title>
            <Badge color="blue" variant="light">
              #{pokemon.id}
            </Badge>
          </Group>

          <Text weight={500} size="md">Type: {pokemon.types.map((type) => type.type.name).join(", ")}</Text>
          {/* <Text weight={500} size="md">Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</Text>
          <Text weight={500} size="md">Base Experience: {pokemon.base_experience}</Text> */}
        </Card>
      ))}
    </Group>
    </div>

  );
}
