import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Button,
  AppShell,
  Burger,
  NavLink,
  Modal,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/products";
import { IconShoppingCart, IconX } from "@tabler/icons-react";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllProducts();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <AppShell
      styles={{ main: { backgroundColor: "#F4F4F5" } }}
      header={{ height: 64 }}
      navbar={{ width: 240, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="xl"
    >
      <AppShell.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          backgroundColor: "#1C1C1E",
          borderBottom: "1px solid #333",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Burger opened={opened} onClick={toggle} size="sm" color="white" />
          <div>
            <h1
              style={{
                margin: 0,
                color: "white",
                fontSize: "18px",
                letterSpacing: "0.05em",
              }}
            >
              FAKE STORE
            </h1>
            <p
              style={{
                margin: 0,
                color: "#0F9B82",
                fontSize: "11px",
                letterSpacing: "0.1em",
              }}
            >
              PREMIUM GOODS
            </p>
          </div>
        </div>
        <Text size="sm" c="dimmed">
          {items.length} products
        </Text>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: "#1C1C1E",
          borderRight: "1px solid #333",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Text
            size="xs"
            fw={600}
            c="dimmed"
            mb="md"
            style={{ letterSpacing: "0.12em" }}
          >
            CATEGORIES
          </Text>
          <NavLink
            label="All Products"
            active
            color="teal"
            variant="filled"
            c="white"
            mb={4}
            radius="md"
          />
          <NavLink label="Electronics" c="gray.4" mb={4} radius="md" />
          <NavLink label="Jewelery" c="gray.4" mb={4} radius="md" />
          <NavLink label="Men's Clothing" c="gray.4" mb={4} radius="md" />
          <NavLink label="Women's Clothing" c="gray.4" mb={4} radius="md" />
        </div>

        <NavLink
          label="Settings"
          c="gray.4"
          mb={4}
          radius="md"
          component={Link}
          to="./Settings"
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              radius="lg"
              withBorder
              padding="lg"
              className="product-card"
              style={{
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Card.Section
                style={{ backgroundColor: "#F8F8F8", padding: "20px" }}
              >
                <Image
                  src={item.image}
                  height={150}
                  alt={item.title}
                  fit="contain"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb={4}>
                <Text fw={500} size="sm" lineClamp={2} style={{ flex: 1 }}>
                  {item.title}
                </Text>
                <Badge color="teal" variant="light" size="sm" ml={8}>
                  Sale
                </Badge>
              </Group>

              <Text fw={700} size="lg" c="teal">
                ${item.price}
              </Text>

              <Group mt="md" gap="xs">
                <Button
                  color="teal"
                  variant="filled"
                  radius="md"
                  style={{ flex: 1 }}
                  onClick={() => {
                    setSelectedItem(item);
                    open();
                  }}
                >
                  View Item
                </Button>
                <Button color="teal" variant="light" radius="md" px="sm">
                  ♡
                </Button>
              </Group>
            </Card>
          ))}
        </div>
      </AppShell.Main>

      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        centered
        radius="lg"
        padding={0}
        withCloseButton={false}
        styles={{
          content: { overflow: "hidden" },
          body: { padding: 0 },
        }}
      >
        {selectedItem && (
          <div style={{ display: "flex", minHeight: 420 }}>
            {/* ── Left: Image Panel ── */}
            <div
              style={{
                flex: "0 0 340px",
                background: "#f8f8f6",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                position: "relative",
              }}
            >
              {/* Close button */}
              <ActionIcon
                onClick={close}
                variant="subtle"
                color="gray"
                size="sm"
                style={{ position: "absolute", top: 12, right: 12 }}
              >
                <IconX size={16} />
              </ActionIcon>

              <Image
                src={selectedItem.image}
                height={220}
                fit="contain"
                style={{ width: "100%" }}
              />

              <Badge
                mt="lg"
                variant="light"
                color="teal"
                size="md"
                radius="sm"
                tt="uppercase"
                style={{ letterSpacing: "0.05em", fontSize: 10 }}
              >
                {selectedItem.category}
              </Badge>
            </div>

            {/* ── Right: Details Panel ── */}
            <div
              style={{
                flex: 1,
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Top: title + description */}
              <div>
                <Text
                  size="xs"
                  tt="uppercase"
                  fw={600}
                  c="dimmed"
                  style={{ letterSpacing: "0.08em" }}
                  mb={6}
                >
                  Product Details
                </Text>

                <Text fw={700} size="xl" lh={1.3} mb="md">
                  {selectedItem.title}
                </Text>

                <Divider mb="md" />

                <Text size="sm" c="dimmed" lh={1.7}>
                  {selectedItem.description}
                </Text>
              </div>

              {/* Bottom: price + action */}
              <div>
                <Divider mt="xl" mb="md" />

                <Group justify="space-between" align="center">
                  <div>
                    <Text size="xs" c="dimmed" fw={500} mb={2}>
                      Price
                    </Text>
                    <Text fw={800} size="2rem" c="teal" lh={1}>
                      ${selectedItem.price}
                    </Text>
                  </div>

                  <Group gap="sm">
                    <Button
                      variant="default"
                      radius="md"
                      size="md"
                      onClick={close}
                    >
                      Cancel
                    </Button>
                    <Button
                      radius="md"
                      size="md"
                      color="teal"
                      leftSection={<IconShoppingCart size={16} />}
                    >
                      Add to cart
                    </Button>
                  </Group>
                </Group>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </AppShell>
  );
};

export default Dashboard;