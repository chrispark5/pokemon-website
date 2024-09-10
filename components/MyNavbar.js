// components/CustomNavbar.js
import { Container, Group, Text, Button, Paper } from "@mantine/core";
import { useRouter } from "next/router";

export default function CustomNavbar() {
  const router = useRouter();

  return (
    <Paper
      padding="md"
      style={{ borderBottom: "1px solid #ddd", backgroundColor: "#fff" }}
    >
      <Container>
        <Group
          position="apart"
          align="center"
          justify="center"
          style={{ height: 60 }}
        >
          <Group spacing="md" justify="center">
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
  );
}
