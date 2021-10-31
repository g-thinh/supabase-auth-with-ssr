import {
  Code,
  Container,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";

export default function HomePage() {
  const { colorMode } = useColorMode();
  return (
    <Container maxW="100%">
      <Container m="auto" maxW="72rem">
        <Heading as="h1" mb={6} textAlign="center">
          Home Page
        </Heading>
        <Container
          bg={colorMode === "dark" ? "gray.700" : "gray.200"}
          p={4}
          borderRadius={12}
          boxShadow="md"
        >
          <Text mb={3} fontSize="md">
            Introducing a Supabase user authentication template in Nextjs with
            SSR protected routes with cookie sessions.
          </Text>
          <Heading as="h2" mb={3} fontWeight="bold" fontSize="large">
            Features
          </Heading>
          <UnorderedList fontSize="md" spacing="8px">
            <ListItem>Uses the latest Supabase Auth API</ListItem>
            <ListItem>
              Protected routes with <Code>getServerSideProps</Code> cookie
              session validation.
            </ListItem>
            <ListItem>
              Persisted user authenticated state through an{" "}
              <Code>AuthProvider</Code> context.
            </ListItem>
          </UnorderedList>
        </Container>
      </Container>
    </Container>
  );
}
