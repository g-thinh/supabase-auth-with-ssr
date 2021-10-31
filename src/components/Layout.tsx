import { Flex } from "@chakra-ui/react";
import Footer from "components/Footer";
import Nav from "components/Nav";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Nav />
      <Flex
        mt={6}
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}
