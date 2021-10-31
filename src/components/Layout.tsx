import { Flex } from "@chakra-ui/react";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Flex
        mt={6}
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
