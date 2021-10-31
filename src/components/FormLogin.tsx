import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { supabase } from "services/supabase";

export type UserForm = {
  email: string;
  password: string;
};

export default function FormLogin() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>();

  async function onLoginSubmit({ email, password }: UserForm) {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      setError("email", {
        type: "manual",
        message: error.message,
      });
    } else {
      Router.push("/authenticated");
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onLoginSubmit)}>
      <FormControl isInvalid={!!errors.email} mb={4}>
        <FormLabel>Email address</FormLabel>
        <Input
          autoFocus
          id="email"
          type="email"
          {...register("email", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Login
      </Button>
    </Box>
  );
}
