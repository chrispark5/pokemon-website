// pages/pokemon.js

import { Container, Grid, Card, Image, Text, Badge, Group, Button, Stack, Title } from '@mantine/core';

const pokemonData = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
    { id: 4, name: 'Charmander' },
    { id: 5, name: 'Charmeleon' },
    { id: 6, name: 'Charizard' },
    { id: 7, name: 'Squirtle' },
    { id: 8, name: 'Wartortle' },
    { id: 9, name: 'Blastoise' },
    { id: 10, name: 'Caterpie' },
    { id: 11, name: 'Metapod' },
    { id: 12, name: 'Butterfree' },
    { id: 13, name: 'Weedle' },
    { id: 14, name: 'Kakuna' },
    { id: 15, name: 'Beedrill' },
    { id: 16, name: 'Pidgey' },
    { id: 17, name: 'Pidgeotto' },
    { id: 18, name: 'Pidgeot' },
    { id: 19, name: 'Rattata' },
    { id: 20, name: 'Raticate' },
  ];
  
  const generatePokemons = (data) => {
    return data.map(pokemon => ({
      name: pokemon.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    }));
  };
  
  const pokemons = generatePokemons(pokemonData);
  

export default function PokemonPage() {
  return (
    <Container>
      <Title order={1} align="center" mt="md">
        Pokémon Collection
      </Title>
      <Grid>
        {pokemons.map((pokemon) => (
          <Grid.Col span={12} sm={6} md={3} key={pokemon.name}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={pokemon.imageUrl}
                  height={800}
                  alt={pokemon.name}
                />
              </Card.Section>

              <Stack mt="md" spacing="xs">
                <Group position="apart">
                  <Text weight={500}>{pokemon.name}</Text>
                  <Badge color="pink" variant="light">
                    Pokémon
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                  A Pokémon is a creature with extraordinary abilities. The Pokémon universe is vast and filled with countless unique Pokémon.
                </Text>

                <Group position="right" mt="md">
                  <Button variant="light" color="blue">
                    Learn more
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
