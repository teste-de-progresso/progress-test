export type LoginCredentails = {
  email: string;
  password: string;
};

export const authentication = {
  login: async (credentails: LoginCredentails) => {
    const payload = {
      user: credentails,
    };

    const response = await fetch(`/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return {
      token: response.headers.get("Authorization")?.replace("Bearer ", ""),
      error:
        response.status === 200 ? undefined : (await response.json()).error,
    };
  },
  resetPasswordEmail: async (email: string) => {
    const payload = { user: { email } };

    const response = await fetch(`/password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) return true;

    return false;
  },
  resetPasswordByToken: async ({
    reset_password_token,
    password,
    password_confirmation,
  }: {
    reset_password_token: string;
    password: string;
    password_confirmation: string;
  }) => {
    const payload = {
      user: {
        reset_password_token,
        password,
        password_confirmation,
      },
    };

    const response = await fetch(`/password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 204) return true;

    return false;
  },
};
