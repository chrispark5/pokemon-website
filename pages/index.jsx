import { Button, Group, Text, Card, Image, Badge, Title, LoadingOverlay } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export default function PokemonPage() {

  const fetchPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: fetchPokemon
  });

  if (isLoading) return <LoadingOverlay visible />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Group mt={50}>
      <Card shadow="sm" padding="lg" style={{ maxWidth: 400 }}>
        <Card.Section>
          <Image src={data.sprites.front_default} alt={data.name} height={160} />
        </Card.Section>

        <Group mt="md" mb="xs">
          <Title order={2}>{data.name.toUpperCase()}</Title>
          <Badge color="blue" variant="light">
            #{data.id}
          </Badge>
        </Group>

        <Text  size="md">Type: {data.types.map((type) => type.type.name).join(", ")}</Text>
        <Text size="md">Abilities: {data.abilities.map((ability) => ability.ability.name).join(", ")}</Text>
        <Text size="md">Base Experience: {data.base_experience}</Text>

        <Button fullWidth mt="md" size="md">
          Learn More
        </Button>
      </Card>
      <p>Welcome to the Pokémon World!</p>
    </Group>
  );
}
