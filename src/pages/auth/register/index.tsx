import {
  Box,
  Button,
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
import { registerWithEmailAndPassword } from "firebases";
import { useFormik } from "formik";
import React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export interface RegisterProps {}

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  retypePassword: string;
};

const initialValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  retypePassword: "",
};

const RegisterFormValidation = Yup.object({
  firstName: Yup.string().required("Please enter First Name"),
  lastName: Yup.string().required("Please enter Last Name"),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please provide an email address."),
  password: Yup.string()
    .required("Please enter a password.")
    .min(8, "Please enter at least 8 characters"),
  retypePassword: Yup.string()
    .required("Please enter a password.")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

export default function Register(props: RegisterProps) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const onClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showRetypePassword, setShowRetypePassword] = React.useState(false);

  const onClickShowRetypePassword = () => {
    setShowRetypePassword(!showRetypePassword);
  };

  const formHandlers = useFormik<RegisterFormValues>({
    initialValues: initialValues,
    validationSchema: RegisterFormValidation,
    onSubmit: ({ lastName, firstName, email, password, retypePassword }) => {
      registerWithEmailAndPassword(
        lastName,
        firstName,
        email,
        password,
        retypePassword
      );
    },
  });
  return (
    <Box>
      <Stack spacing="6">
        <Stack spacing="6">
          <Stack alignItems="center">
            <Logo size="lg" logo={LogoDark} />
          </Stack>
          <Stack spacing={{ base: "3", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
              Create an account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={handleNavigate}
              >
                Log in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <form onSubmit={formHandlers.handleSubmit}>
          <Stack spacing="5">
            <HStack spacing="10" justifyContent="space-between">
              <FormControl
                isInvalid={
                  formHandlers.errors.firstName
                    ? formHandlers.touched.firstName
                    : false
                }
              >
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  onChange={formHandlers.handleChange}
                  onBlur={formHandlers.handleBlur}
                  value={formHandlers.values.firstName}
                />
                {formHandlers.touched.firstName &&
                  formHandlers.errors.firstName && (
                    <FormErrorMessage>
                      {formHandlers.errors.firstName}
                    </FormErrorMessage>
                  )}
              </FormControl>
              <FormControl
                isInvalid={
                  formHandlers.errors.lastName
                    ? formHandlers.touched.lastName
                    : false
                }
              >
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  onChange={formHandlers.handleChange}
                  onBlur={formHandlers.handleBlur}
                  value={formHandlers.values.lastName}
                />
                {formHandlers.touched.lastName &&
                  formHandlers.errors.lastName && (
                    <FormErrorMessage>
                      {formHandlers.errors.lastName}
                    </FormErrorMessage>
                  )}
              </FormControl>
            </HStack>
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
                    aria-label={
                      showPassword ? "Mask password" : "Reveal password"
                    }
                    icon={
                      showPassword ? (
                        <HiEyeOff onClick={onClickShowPassword} />
                      ) : (
                        <HiEye onClick={onClickShowPassword} />
                      )
                    }
                  />
                </InputRightElement>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  onChange={formHandlers.handleChange}
                  onBlur={formHandlers.handleBlur}
                  value={formHandlers.values.password}
                  {...props}
                />
              </InputGroup>
              {formHandlers.touched.password &&
                formHandlers.errors.password && (
                  <FormErrorMessage>
                    {formHandlers.errors.password}
                  </FormErrorMessage>
                )}
            </FormControl>

            <FormControl
              isInvalid={
                formHandlers.errors.retypePassword
                  ? formHandlers.touched.retypePassword
                  : false
              }
            >
              <FormLabel htmlFor="retypePassword">Retype Password</FormLabel>
              <InputGroup>
                <InputRightElement>
                  <IconButton
                    variant="link"
                    aria-label={
                      showRetypePassword ? "Mask password" : "Reveal password"
                    }
                    icon={
                      showRetypePassword ? (
                        <HiEyeOff onClick={onClickShowRetypePassword} />
                      ) : (
                        <HiEye onClick={onClickShowRetypePassword} />
                      )
                    }
                  />
                </InputRightElement>

                <Input
                  id="retypePassword"
                  name="retypePassword"
                  type={showRetypePassword ? "text" : "password"}
                  autoComplete="current-retypePassword"
                  onChange={formHandlers.handleChange}
                  onBlur={formHandlers.handleBlur}
                  value={formHandlers.values.retypePassword}
                  {...props}
                />
              </InputGroup>
              {formHandlers.touched.retypePassword &&
                formHandlers.errors.retypePassword && (
                  <FormErrorMessage>
                    {formHandlers.errors.retypePassword}
                  </FormErrorMessage>
                )}
            </FormControl>

            <Button type="submit" colorScheme="blue" variant="outline">
              Create an account
            </Button>
          </Stack>
        </form>

        <Stack spacing="6">
          <HStack>
            <Divider />
            <Text fontSize="md" whiteSpace="nowrap" color="muted">
              or register with
            </Text>
            <Divider />
          </HStack>
          <SocialLogin />
        </Stack>
      </Stack>
    </Box>
  );
}
