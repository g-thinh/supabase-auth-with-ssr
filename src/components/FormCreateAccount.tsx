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
import type { UserForm } from "./FormLogin";

export default function FormCreateAccount() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>();

  async function onCreateAccountSubmit({ email, password }: UserForm) {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      setError("email", {
        type: "manual",
        message: signUpError.message,
      });
    } else {
      Router.push("/authenticated");
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onCreateAccountSubmit)}>
      <FormControl isInvalid={!!errors.email} mb={4}>
        <FormLabel>Email address</FormLabel>
        <Input
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
        Create Account
      </Button>
    </Box>
  );
}
