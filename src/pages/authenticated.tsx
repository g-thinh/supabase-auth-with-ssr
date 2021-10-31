import {
  Container,
  Heading,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import { supabase } from "services/supabase";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { user } = await supabase.auth.api.getUserByCookie(context.req);

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
      props: { user },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default function Authenticated(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const { colorMode } = useColorMode();
  const { email } = props.user;

  return (
    <Container>
      <Heading as="h1" mb={6} textAlign="center">
        Hello Authenticated User!
      </Heading>
      <VStack
        my={4}
        spacing="16px"
        align="stretch"
        bg={colorMode === "dark" ? "gray.700" : "gray.200"}
        p={4}
        borderRadius={12}
        boxShadow="md"
      >
        <Text fontSize="xl">Email: {email}</Text>
      </VStack>
    </Container>
  );
}
