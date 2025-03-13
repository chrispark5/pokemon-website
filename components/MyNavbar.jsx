// components/CustomNavbar.js
import { useState } from "react";
import {
  Container,
  Group,
  Button,
  Paper,
  Burger,
  Drawer,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";

export default function CustomNavbar() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Paper
        padding="md"
        style={{ borderBottom: "1px solid #ddd", backgroundColor: "#fff" }}
        id="big-nav"
      >
        <Container>
          <Group
            position="apart"
            align="center"
            justify="center"
            style={{ height: 60 }}
          >
            <Group
              spacing="md"
              id="desktop-menu"
              justify="center"
              align="center"
            >
              <Button variant="outline" onClick={() => router.push("/")}>
                Home
              </Button>
              <Button variant="outline" onClick={() => router.push("/Pokemon")}>
                Save Pokemon
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/TypeMatchup")}
              >
                Type Matchup
              </Button>
            </Group>
          </Group>
        </Container>
      </Paper>
      <div className="mobile-menu">
        <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
      </div>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Menu"
        padding="md"
        size="sm"
        position="right"
      >
        <Button
          variant="outline"
          fullWidth
          onClick={() => {
            router.push("/");
            setOpened(false);
          }}
          style={{ marginBottom: 10 }}
        >
          Home
        </Button>
        <Button
          variant="outline"
          fullWidth
          onClick={() => {
            router.push("/Pokemon");
            setOpened(false);
          }}
          style={{ marginBottom: 10 }}
        >
          Save Pokemon
        </Button>
        <Button
          variant="outline"
          fullWidth
          onClick={() => {
            router.push("/TypeMatchup");
            setOpened(false);
          }}
        >
          Type Matchup
        </Button>
      </Drawer>
    </>
  );
}
