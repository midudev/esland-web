import type {
  LiteralUnion,
  SignInOptions,
  SignInAuthorizationParams,
} from "next-auth/react";

import type {
  BuiltInProviderType,
  RedirectableProviderType,
} from "@auth/core/providers";

import { signOut } from "auth-astro/client";

interface AstroSignInOptions extends SignInOptions {
  /** The base path for authentication (default: /api/auth) */
  prefix?: string;
  callbackUrl?: string;
  redirect?: boolean;
}

async function signIn<
  P extends RedirectableProviderType | undefined = undefined
>(
  providerId?: LiteralUnion<
    P extends RedirectableProviderType
      ? P | BuiltInProviderType
      : BuiltInProviderType
  >,
  options?: AstroSignInOptions,
  authorizationParams?: SignInAuthorizationParams
) {
  const { callbackUrl = window.location.href, redirect = true } = options ?? {};
  const { prefix = "/api/auth", ...opts } = options ?? {};

  // TODO: Support custom providers
  const isCredentials = providerId === "credentials";
  const isEmail = providerId === "email";
  const isSupportingReturn = isCredentials || isEmail;

  // TODO: Handle custom base path
  const signInUrl = `${prefix}/${
    isCredentials ? "callback" : "signin"
  }/${providerId}`;

  const _signInUrl = `${signInUrl}?${new URLSearchParams(authorizationParams)}`;

  // TODO: Handle custom base path
  const csrfTokenResponse = await fetch(`${prefix}/csrf`);
  const { csrfToken } = await csrfTokenResponse.json();

  const res = await fetch(_signInUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1",
    },

    // @ts-expect-error -- ignore
    body: new URLSearchParams({
      ...opts,
      csrfToken,
      callbackUrl,
    }),
  });

  const data = await res.clone().json();
  const url = new URL(data.url);
  // Si anexto el callbackUrl a la url de retorno como parametro
  if (url.searchParams.has("redirect_uri")) {
    const redirectUri = url.searchParams.get("redirect_uri");
    const rUri = new URL(redirectUri as string);
    if (!rUri.searchParams.has("callbackUrl")) {
      rUri.searchParams.set("callbackUrl", callbackUrl);
      url.searchParams.set("redirect_uri", rUri.href);
    }
  }
  const error = url.searchParams.get("error");
  if (redirect || !isSupportingReturn || !error) {
    // TODO: Do not redirect for Credentials and Email providers by default in next major
    window.location.href = url.href ?? callbackUrl;
    // If url contains a hash, the browser does not reload the page. We reload manually
    if (url.href.includes("#")) window.location.reload();
    return;
  }

  return res;
}

export function auth(loginId: string, logoutId: string) {
  const $loginButton = document.getElementById(loginId);
  const $logoutButton = document.getElementById(logoutId);

  $loginButton?.addEventListener("click", async (event) => {
    event.preventDefault();
    const callbackUrl = $loginButton?.dataset.callbackUrl;
    await signIn("twitch", { callbackUrl });
  });

  $logoutButton?.addEventListener("click", async (event) => {
    event.preventDefault();
    await signOut();
  });
}
