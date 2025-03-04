import { Divider } from "@mantine/core";
import { TextInput, Container } from "@mantine/core";
import { IconSearch, IconPokeball } from "@tabler/icons-react";
export default function Search() {
  const icon = <IconSearch size={16}></IconSearch>;
  const Poke = <IconPokeball size={26} />;
  return (
    <>
      <Container>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ fontFamily: "pokemon" }}>Search for Pokemon</h1>
          {Poke}
        </div>
        <TextInput
          className="mt-4"
          radius="xl"
          placeholder="Search for a pokemon"
          rightSection={icon}
          styles={{
            input: {
              fontFamily: "pokemon-classic, sans-serif",
            },
          }}
        />{" "}
      </Container>
    </>
  );
}
