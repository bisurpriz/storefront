import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const PermissionsPage = async () => {
  return <div>PermissionsPage</div>;
};

export default withPageAuthRequired(PermissionsPage);
