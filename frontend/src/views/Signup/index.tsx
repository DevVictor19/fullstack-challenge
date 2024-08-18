"use client";

import Link from "next/link";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

import TextFieldControlled from "@/components/forms/TextFieldControlled";
import Button from "@/components/forms/Button";
import { APP_ROUTE } from "@/enums/app-routes.enum";
import { useSignupUser } from "@/models/auth.model";
import StatusFeedback from "@/components/feedback/StatusFeedback";
import useSignupForm from "./hooks/useSignupForm";

export default function SignupView() {
  const { mutate, isError, isSuccess, isPending } = useSignupUser();
  const { control, errors, submitHandler } = useSignupForm({
    onSubmit: mutate,
  });

  return (
    <Container>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: 400, width: "100%" }}>
          <Typography align="center" variant="h5" mb={5}>
            Signup
          </Typography>
          <Box
            mb={3}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StatusFeedback
              isSuccess={isSuccess}
              isError={isError}
              isLoading={isPending}
              errorMessage="Email já cadastrado"
              successMessage="Conta criada com sucesso, siga para o login"
            />
          </Box>
          <Grid
            sx={{ mb: 2 }}
            container
            spacing={2}
            onSubmit={submitHandler}
            component="form"
          >
            <Grid item xs={12}>
              <TextFieldControlled
                control={control}
                name="email"
                label="Email"
                placeholder="Insira seu e-mail"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldControlled
                control={control}
                name="password"
                label="Senha"
                placeholder="Insira sua senha"
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <Button
                disabled={isPending}
                fullWidth
                variant="contained"
                type="submit"
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
          <MuiLink href={APP_ROUTE.LOGIN} variant="body2" component={Link}>
            Já possui uma conta? Faça login
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
}
