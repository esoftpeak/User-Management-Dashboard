export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: "male" | "female" | string;
  email: string;
  phone: string;
  username: string;
  image: string;
  birthDate?: string;
  bloodGroup?: string;
  eyeColor?: string;
  hair?: {
    color?: string;
    type?: string;
  };
  address?: {
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  company?: {
    name?: string;
    department?: string;
    title?: string;
    address?: {
      address?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
  };
  university?: string;
  bank?: {
    cardExpire?: string;
    cardNumber?: string;
    cardType?: string;
    currency?: string;
    iban?: string;
  };
  crypto?: {
    coin?: string;
    wallet?: string;
    network?: string;
  };
};

export function getUserFullName(user: Pick<User, "firstName" | "lastName">) {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function getUserRoleLabel(user: User) {
  const maybeRole = user.company?.title || user.company?.department;
  return maybeRole?.trim() ? maybeRole : "Member";
}

