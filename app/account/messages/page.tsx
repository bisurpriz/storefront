import { ApolloWrapper } from "@/graphql/lib/apollo-wrapper";
import Main from "./components/Main";

export const dynamic = "force-dynamic";

const MessagesPage = () => {
  return (
    <ApolloWrapper>
      <Main />
    </ApolloWrapper>
  );
};

export default MessagesPage;
