import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { z } from "zod";

import { useAuth } from "../auth/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email")),

  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must contain at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginLocationState = {
  from?: {
    pathname: string;
  };
};

export const LoginForm = () => {
  const [loginError, setLoginError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  function onSubmit(data: LoginFormValues) {
    setLoginError("");

    const loginSucceeded = login(
      data.email,
      data.password,
    );

    if (!loginSucceeded) {
      setLoginError("Incorrect email or password.");
      return;
    }

    const state = location.state as LoginLocationState | null;
    const destination = state?.from?.pathname ?? "/";

    navigate(destination, { replace: true });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && (
          <p role="alert">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />

        {errors.password && (
          <p role="alert">{errors.password.message}</p>
        )}
      </div>

      {loginError && <p role="alert">{loginError}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
};