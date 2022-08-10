import { Question } from "../../__generated__/graphql-schema";

export const formatInput = (inputs: any) =>
  ({
    ...inputs,
    bloomTaxonomy:
      inputs.bloomTaxonomy === "" ? undefined : inputs.bloomTaxonomy,
    difficulty: inputs.difficulty === "" ? undefined : inputs.difficulty,
    checkType: inputs.checkType === "" ? undefined : inputs.checkType,
    subjectId: inputs.subjectId === "" ? undefined : inputs.subjectId,
    reviewerUserId:
      inputs.reviewerUserId === "" ? undefined : inputs.reviewerUserId,
    alternatives: inputs.alternatives,
    __nonused: undefined,
    authorshipType: undefined,
  } as Question);
