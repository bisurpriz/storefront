export const destructClaims = (user: any) => {
  if (user) {
    const claims = user["https://hasura.io/jwt/claims"];
    return {
      id: claims["x-hasura-user-id"],
      role: claims["x-hasura-default-role"],
      allowedRoles: claims["x-hasura-allowed-roles"],
      fullName: claims["x-hasura-fullname"],
    };
  }
  return null;
};
