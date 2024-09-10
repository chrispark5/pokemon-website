import cx from "clsx";
import { Title, Text, Container, Button, Overlay } from "@mantine/core";
import classes from "../styles/HeroImageBackground.module.css";

export default function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>Discover the World of Pokémon</Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Dive into an expansive universe of Pokémon. Learn about each
            Pokémon's abilities, types, and evolutions as you embark on your own
            adventure.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            mx={"md"}
            variant="white"
            size="lg"
            component="a"
            href="/pokedex"
          >
            Explore all Pokémon
          </Button>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
            component="a"
            href="/TypeMatchup"
          >
            Pokemon Type Interactions
          </Button>
        </div>
      </div>
    </div>
  );
}
