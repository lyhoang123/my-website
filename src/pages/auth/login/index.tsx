import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import LogoDark from "assets/logo-dark.svg";
import Logo from "components/logo";
import SocialLogin from "components/socialLogin";
import { logInWithEmailAndPassword } from "firebases";
import { useFormik } from "formik";
import React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export interface LoginProps {}

type LoginFormValues = {
  email: string;
  password: string;
};

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginFormValidation = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please provide an email address."),
  password: Yup.string()
    .required("Please enter a password.")
    .min(8, "Please enter at least 8 characters"),
});

export default function Login(props: LoginProps) {
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register");
  };

  const { isOpen, onToggle } = useDisclosure();

  const [isLoading, setIsLoading] = React.useState(false);

  const onClickReveal = () => {
    onToggle();
  };

  const formHandlers = useFormik<LoginFormValues>({
    initialValues: initialValues,
    validationSchema: LoginFormValidation,
    onSubmit: async ({ email, password }) => {
      setIsLoading(true);
      const login = await logInWithEmailAndPassword(email, password);
      if (login) setIsLoading(false);
    },
  });

  return (
    <Stack spacing="6">
      <Stack spacing="6">
        <Stack alignItems="center">
          <Logo size="lg" logo={LogoDark} />
        </Stack>
        <Stack spacing={{ base: "3", md: "3" }} textAlign="center">
          <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
            Log in to your account
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Don't have an account?</Text>
            <Button
              variant="link"
              colorScheme="blue"
              onClick={navigateRegister}
            >
              Sign up
            </Button>
          </HStack>
        </Stack>
      </Stack>
      <form onSubmit={formHandlers.handleSubmit}>
        <Stack spacing="5">
          <FormControl
            isInvalid={
              formHandlers.errors.email ? formHandlers.touched.email : false
            }
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              onChange={formHandlers.handleChange}
              onBlur={formHandlers.handleBlur}
              value={formHandlers.values.email}
              {...props}
            />
            {formHandlers.touched.email && formHandlers.errors.email && (
              <FormErrorMessage>{formHandlers.errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={
              formHandlers.errors.password
                ? formHandlers.touched.password
                : false
            }
          >
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <InputRightElement>
                <IconButton
                  variant="link"
                  aria-label={isOpen ? "Mask password" : "Reveal password"}
                  icon={isOpen ? <HiEyeOff /> : <HiEye />}
                  onClick={onClickReveal}
                />
              </InputRightElement>
              <Input
                id="password"
                name="password"
                type={isOpen ? "text" : "password"}
                autoComplete="current-password"
                onChange={formHandlers.handleChange}
                onBlur={formHandlers.handleBlur}
                value={formHandlers.values.password}
                {...props}
              />
            </InputGroup>
            {formHandlers.touched.password && formHandlers.errors.password && (
              <FormErrorMessage>
                {formHandlers.errors.password}
              </FormErrorMessage>
            )}
          </FormControl>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password?
            </Button>
          </HStack>
          {isLoading ? (
            <Button
              isLoading
              loadingText="Logging in"
              colorScheme="blue"
              variant="outline"
            ></Button>
          ) : (
            <Button type="submit" colorScheme="blue" variant="outline">
              Sign in
            </Button>
          )}
        </Stack>
      </form>

      <Stack spacing="6">
        <HStack>
          <Divider />
          <Text fontSize="md" whiteSpace="nowrap" color="muted">
            or continue with
          </Text>
          <Divider />
        </HStack>
        <SocialLogin />
      </Stack>
    </Stack>
  );
}
