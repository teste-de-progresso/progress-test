import { Node } from "../../__generated__/graphql-schema";

const SEPARATOR_TOKEN = "-";

type Decoded = { typeName: string; id: string };

const decode = (id: Node["id"]): Decoded => {
  const [nodeTypeName, nodeId] = atob(id).split(SEPARATOR_TOKEN);

  return {
    id: nodeId,
    typeName: nodeTypeName,
  };
};

export const NodeId = { decode };
