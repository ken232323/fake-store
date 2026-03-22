
import {
  Card, Image, Text, Badge, Group,
  Button, AppShell, Burger, NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";


const Dashboard = ({items}) => {
  
  const [opened, { toggle }] = useDisclosure();


  return (
    <AppShell
      styles={{ main: { backgroundColor: "#F4F4F5" } }}
      header={{ height: 64 }}
      navbar={{ width: 240, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="xl"
    >
      <AppShell.Header style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px", backgroundColor: "#1C1C1E",
        borderBottom: "1px solid #333",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Burger opened={opened} onClick={toggle} size="sm" color="white" />
          <div>
            <h1 style={{ margin: 0, color: "white", fontSize: "18px", letterSpacing: "0.05em" }}>
              FAKE STORE
            </h1>
            <p style={{ margin: 0, color: "#0F9B82", fontSize: "11px", letterSpacing: "0.1em" }}>
              PREMIUM GOODS
            </p>
          </div>
        </div>
        <Text size="sm" c="dimmed">{items.length} products</Text>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ backgroundColor: "#1C1C1E", borderRight: "1px solid #333", display:"flex", justifyContent: "space-between" }}>
        <div>
        <Text size="xs" fw={600} c="dimmed" mb="md" style={{ letterSpacing: "0.12em" }}>
          CATEGORIES
        </Text>
        <NavLink label="All Products" active color="teal" variant="filled" c="white" mb={4} radius="md" />
        <NavLink label="Electronics"      c="gray.4" mb={4} radius="md" />
        <NavLink label="Jewelery"         c="gray.4" mb={4} radius="md" />
        <NavLink label="Men's Clothing"   c="gray.4" mb={4} radius="md" />
        <NavLink label="Women's Clothing" c="gray.4" mb={4} radius="md" />
        </div>

        <NavLink label="Settings" c="gray.4" mb={4} radius="md" component={Link}  to="./Settings"/>
      </AppShell.Navbar>

      <AppShell.Main>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px",
        }}>
          {items.map((item) => (
            <Card
              key={item.id}
              radius="lg"
              withBorder
              padding="lg"
              className="product-card"
              style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease", cursor: "pointer" }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Card.Section style={{ backgroundColor: "#F8F8F8", padding: "20px" }}>
                <Image src={item.image} height={150} alt={item.title} fit="contain" />
              </Card.Section>

              <Group justify="space-between" mt="md" mb={4}>
                <Text fw={500} size="sm" lineClamp={2} style={{ flex: 1 }}>
                  {item.title}
                </Text>
                <Badge color="teal" variant="light" size="sm" ml={8}>Sale</Badge>
              </Group>

              <Text fw={700} size="lg" c="teal">${item.price}</Text>

              <Group mt="md" gap="xs">
                <Button color="teal" variant="filled" radius="md" style={{ flex: 1 }}>
                  Add to cart
                </Button>
                <Button color="teal" variant="light" radius="md" px="sm">♡</Button>
              </Group>
            </Card>
          ))}
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;