import React, { useState } from "react";
import {
  Select,
  Container,
  Title,
  Text,
  Box,
  Image,
  Flex,
  Loader,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { fetchTypeData, fetchTypeDetails } from "../../api/pokeApi"; // Adjusted path
import { typeIcons } from "../icons"; // Import the icon mapping
import CustomNavbar from "../../components/MyNavbar";

const TypeMatchup = () => {
  const [selectedType, setSelectedType] = useState("fire");

  const { data: types, isLoading: typesLoading } = useQuery({
    queryKey: ["types"],
    queryFn: fetchTypeData,
  });

  const { data: typeDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ["typeDetails", selectedType],
    queryFn: () => fetchTypeDetails(selectedType),
    enabled: !!selectedType,
  });

  if (typesLoading || detailsLoading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
        }}
      >
        <Loader size="lg" />
      </Container>
    );
  }

  if (!types || !typeDetails) {
    return <Text>Error loading data</Text>;
  }
  console.log(selectedType);
  const { damage_relations } = typeDetails;

  const strengths = damage_relations.double_damage_to.map((type) => type.name);
  const weaknesses = damage_relations.double_damage_from.map(
    (type) => type.name
  );

  return (
    <Container>
      <Title align="center">Pokémon Type Matchups</Title>
      <CustomNavbar></CustomNavbar>

      <Box mt="md" mb="md" style={{ textAlign: "center" }}>
        <Select
          data={types.map((type) => ({
            value: type.name,
            label: type.name,
          }))}
          value={selectedType}
          onChange={(value) => {
            setSelectedType(value);
          }}
          style={{ width: 200, margin: "auto" }}
        />
      </Box>

      <Text align="center" size="lg">
        <strong>Strengths:</strong>{" "}
        <Flex
          mih={50}
          // bg="rgba(0, 0, 0, .3)"
          gap="md"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          {strengths.map((type) => (
            <img
              key={type}
              src={typeIcons[type]}
              alt={`${type} icon`}
              style={{ width: 100, height: 100, margin: "0 4px" }}
            />
          ))}
        </Flex>
      </Text>
      <Text align="center" size="lg" mt="md">
        <strong>Weaknesses:</strong>{" "}
        <Flex //TODO: flex can't be inside a Text element
          mih={50}
          // bg="rgba(0, 0, 0, .3)"
          gap="md"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          {weaknesses.map((type) => (
            <img
              key={type}
              src={typeIcons[type]}
              alt={`${type} icon`}
              style={{ width: 100, height: 100, margin: "0 4px" }}
            />
          ))}
        </Flex>
      </Text>
    </Container>
  );
};

export default TypeMatchup;
