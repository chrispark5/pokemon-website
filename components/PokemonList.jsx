import React, { useState } from "react";
import { Card, Flex, Stack, Text, Button, Collapse } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import PokemonImage from "./PokemonImage";

export default function PokemonList(props) {
  const [openedIndex, setOpenedIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenedIndex(openedIndex === index ? null : index);
  };

  return (
    <Stack
      align="stretch"
      justify="center"
      spacing="md"
      style={{
        backgroundColor: "transparent",
        padding: "20px",
      }}
    >
      {props.pokemon.map((pokemon, index) => (
        <Card
          key={index}
          shadow="sm"
          padding="lg"
          radius="md"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Flex align="center" gap="16px">
            <PokemonImage
              url={pokemon.url}
              style={{ borderRadius: "50%", border: "2px solid #ffcb05" }}
            />
            <Text weight={500} size="lg" style={{ flex: 1, color: "#2a75bb" }}>
              {pokemon.name}
            </Text>
            <Button onClick={() => toggleDropdown(index)} variant="subtle">
              {openedIndex === index ? (
                <IconChevronUp size={16} />
              ) : (
                <IconChevronDown size={16} />
              )}
            </Button>
          </Flex>
          <Collapse in={openedIndex === index}>
            <Text size="sm" color="dimmed">
              {/* Placeholder details */}
              This is where more details about {pokemon.name} would go. You can
              include stats, abilities, or any other relevant information.
            </Text>
          </Collapse>
        </Card>
      ))}
    </Stack>
  );
}
