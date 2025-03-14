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
        style={{
          // borderBottom: "1px solid #ddd",
          backgroundColor: "transparent",
          // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        id="big-nav"
      >
        <Container>
          <Group position="apart" align="center" style={{ height: 60 }}>
            <Group spacing="md" id="desktop-menu" align="center">
              <Button
                variant="filled"
                color="blue"
                onClick={() => router.push("/")}
              >
                Home
              </Button>
              <Button
                variant="filled"
                color="blue"
                onClick={() => router.push("/Pokemon")}
              >
                Save Pokemon
              </Button>
              <Button
                variant="filled"
                color="blue"
                onClick={() => router.push("/TypeMatchup")}
              >
                Type Matchup
              </Button>
              <Button
                variant="filled"
                color="blue"
                onClick={() => router.push("/search")}
              >
                Search for Pokemon
              </Button>
            </Group>
          </Group>
        </Container>
      </Paper>
      <div className="mobile-menu" style={{ padding: "10px" }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          color="blue"
        />
      </div>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Menu"
        padding="md"
        size="sm"
        position="right"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Button
          variant="filled"
          color="blue"
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
          variant="filled"
          color="blue"
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
          variant="filled"
          color="blue"
          fullWidth
          onClick={() => {
            router.push("/TypeMatchup");
            setOpened(false);
          }}
          style={{ marginBottom: 10 }}
        >
          Type Matchup
        </Button>
        <Button
          variant="filled"
          color="blue"
          fullWidth
          onClick={() => {
            router.push("/search");
            setOpened(false);
          }}
          style={{ marginBottom: 10 }}
        >
          Search
        </Button>
      </Drawer>
    </>
  );
}
