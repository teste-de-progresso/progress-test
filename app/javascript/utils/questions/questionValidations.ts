import {
  Question,
  QuestionCreateInput,
} from "../../__generated__/graphql-schema";

export type QuestionEditForm = Question & {
  subjectId: string;
  reviewerId: string;
};

export const validateQuestionInputs = (inputs: QuestionCreateInput) => {
  /**
   * transform string with lenght 0 to undefined
   */
  const tempValues: { [key: string]: any } = {};

  Object.keys(inputs).forEach((key: string) => {
    const value = (inputs as any)[key];

    tempValues[key] = value === "" ? undefined : value;
  });

  const values = tempValues as QuestionCreateInput;

  const errors = [];

  const {
    alternatives,
    authorshipYear,
    body,
    explanation,
    references,
    difficulty,
    bloomTaxonomy,
    checkType,
    subjectId,
    authorship,
    intention,
    reviewerUserId,
  } = values;

  if (!body || body.length <= 5) {
    errors.push(`"Enunciado" não preenchido.`);
  }

  const answer = alternatives?.find((a) => a.correct);

  if (!answer?.text?.length) {
    errors.push(`"Resposta Correta" não preenchida.`);
  }

  if (!explanation || explanation.length <= 5) {
    errors.push(`"Explicação" não preenchida.`);
  }

  if (!references || references.length <= 5) {
    errors.push(`"Referências" não preenchidas.`);
  }

  const distractors = alternatives?.filter((a) => !a.correct);
  const emptyDistractores = distractors?.filter((a) => !a.text?.length);

  if (emptyDistractores?.length) {
    errors.push(`Um ou mais "Distratores" não preenchidos.`);
  }

  if (!authorship) {
    errors.push(`"Fonte" não preenchida.`);
  }

  if (!authorshipYear) {
    errors.push(`"Ano" não preenchido.`);
  }

  if (!difficulty) {
    errors.push(`"Grau de Dificuldade" não preenchido.`);
  }

  if (!subjectId) {
    errors.push(`"Assunto" não preenchido.`);
  }

  if (!checkType) {
    errors.push(`"Tipo" não preenchido.`);
  }

  if (!bloomTaxonomy) {
    errors.push(`"Habilidade" não preenchida.`);
  }

  if (!intention) {
    errors.push(`"Intenção" não preenchido.`);
  }

  if (!reviewerUserId) {
    errors.push(`"Revisor" não preenchido.`);
  }

  return errors;
};
