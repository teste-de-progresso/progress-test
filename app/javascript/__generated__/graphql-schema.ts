export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded date */
  ISO8601Date: { input: any; output: any; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

export type Axis = {
  __typename?: 'Axis';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subjects: Array<Subject>;
};

/** The connection type for Axis. */
export type AxisConnection = {
  __typename?: 'AxisConnection';
  /** A list of edges. */
  edges: Array<AxisEdge>;
  /** A list of nodes. */
  nodes: Array<Axis>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type AxisEdge = {
  __typename?: 'AxisEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Axis>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subjects: Array<Subject>;
};

/** The connection type for Category. */
export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  /** A list of edges. */
  edges: Array<CategoryEdge>;
  /** A list of nodes. */
  nodes: Array<Category>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Category>;
};

/** Autogenerated input type of CreateQuestion */
export type CreateQuestionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  question: QuestionCreateInput;
};

/** Autogenerated return type of CreateQuestion */
export type CreateQuestionPayload = {
  __typename?: 'CreateQuestionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']['output']>;
  question?: Maybe<Question>;
};

/** Autogenerated input type of CreateReviewMessage */
export type CreateReviewMessageInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  message: ReviewMessageInput;
};

/** Autogenerated return type of CreateReviewMessage */
export type CreateReviewMessagePayload = {
  __typename?: 'CreateReviewMessagePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']['output']>;
  reviewMessage?: Maybe<ReviewMessage>;
};

export type DateRangeInput = {
  endAt: Scalars['ISO8601Date']['input'];
  startAt: Scalars['ISO8601Date']['input'];
};

/** Autogenerated input type of DestroyQuestion */
export type DestroyQuestionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['ID']['input'];
};

/** Autogenerated return type of DestroyQuestion */
export type DestroyQuestionPayload = {
  __typename?: 'DestroyQuestionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedQuestionId?: Maybe<Scalars['ID']['output']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']['output']>;
};

/** Autogenerated input type of FinishQuestion */
export type FinishQuestionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['ID']['input'];
};

/** Autogenerated return type of FinishQuestion */
export type FinishQuestionPayload = {
  __typename?: 'FinishQuestionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']['output']>;
  question?: Maybe<Question>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuestion?: Maybe<CreateQuestionPayload>;
  createReviewMessage?: Maybe<CreateReviewMessagePayload>;
  destroyQuestion?: Maybe<DestroyQuestionPayload>;
  finishQuestion?: Maybe<FinishQuestionPayload>;
  updateQuestion?: Maybe<UpdateQuestionPayload>;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationCreateReviewMessageArgs = {
  input: CreateReviewMessageInput;
};


export type MutationDestroyQuestionArgs = {
  input: DestroyQuestionInput;
};


export type MutationFinishQuestionArgs = {
  input: FinishQuestionInput;
};


export type MutationUpdateQuestionArgs = {
  input: UpdateQuestionInput;
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  axes: AxisConnection;
  categories: CategoryConnection;
  currentUser?: Maybe<User>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  questionFilterOptions: QuestionFilterOptions;
  questions: QuestionConnection;
  reviewers: UserConnection;
  subjects: SubjectConnection;
};


export type QueryAxesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryQuestionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<QuestionWhereInput>;
};


export type QueryReviewersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySubjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Question = Node & {
  __typename?: 'Question';
  alternatives: Array<QuestionAlternative>;
  authorship?: Maybe<Scalars['String']['output']>;
  authorshipYear?: Maybe<Scalars['String']['output']>;
  bloomTaxonomy?: Maybe<QuestionBloomTaxonomy>;
  body?: Maybe<Scalars['String']['output']>;
  checkType?: Maybe<QuestionCheckType>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  difficulty?: Maybe<QuestionDifficulty>;
  explanation?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instruction?: Maybe<Scalars['String']['output']>;
  intention?: Maybe<Scalars['String']['output']>;
  references?: Maybe<Scalars['String']['output']>;
  reviewMessages: ReviewMessageConnection;
  reviewer?: Maybe<User>;
  status: QuestionStatus;
  subject?: Maybe<Subject>;
  support?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};


export type QuestionReviewMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QuestionAlternative = {
  __typename?: 'QuestionAlternative';
  correct: Scalars['Boolean']['output'];
  text?: Maybe<Scalars['String']['output']>;
};

export type QuestionAlternativeInput = {
  correct?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export enum QuestionBloomTaxonomy {
  Analyze = 'ANALYZE',
  Apply = 'APPLY',
  Create = 'CREATE',
  Evaluate = 'EVALUATE',
  Remember = 'REMEMBER',
  Understand = 'UNDERSTAND'
}

export enum QuestionCheckType {
  AssertionAndReason = 'ASSERTION_AND_REASON',
  Association = 'ASSOCIATION',
  ConstantAlternatives = 'CONSTANT_ALTERNATIVES',
  Gap = 'GAP',
  IncompleteAffirmation = 'INCOMPLETE_AFFIRMATION',
  Interpretation = 'INTERPRETATION',
  MultipleAnswer = 'MULTIPLE_ANSWER',
  NegativeFocus = 'NEGATIVE_FOCUS',
  OrderingOrRanking = 'ORDERING_OR_RANKING',
  UniqueAnswer = 'UNIQUE_ANSWER'
}

/** The connection type for Question. */
export type QuestionConnection = {
  __typename?: 'QuestionConnection';
  /** A list of edges. */
  edges: Array<QuestionEdge>;
  /** A list of nodes. */
  nodes: Array<Question>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type QuestionCreateInput = {
  alternatives: Array<QuestionAlternativeInput>;
  authorship: Scalars['String']['input'];
  authorshipYear: Scalars['String']['input'];
  bloomTaxonomy?: InputMaybe<QuestionBloomTaxonomy>;
  body: Scalars['String']['input'];
  checkType?: InputMaybe<QuestionCheckType>;
  difficulty?: InputMaybe<QuestionDifficulty>;
  explanation: Scalars['String']['input'];
  instruction: Scalars['String']['input'];
  intention?: InputMaybe<Scalars['String']['input']>;
  references: Scalars['String']['input'];
  reviewerUserId?: InputMaybe<Scalars['ID']['input']>;
  status: QuestionStatus;
  subjectId?: InputMaybe<Scalars['ID']['input']>;
  support: Scalars['String']['input'];
};

export enum QuestionDifficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

/** An edge in a connection. */
export type QuestionEdge = {
  __typename?: 'QuestionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Question>;
};

export type QuestionFilterOptions = {
  __typename?: 'QuestionFilterOptions';
  years: Array<Scalars['String']['output']>;
};

export enum QuestionStatus {
  Approved = 'APPROVED',
  Draft = 'DRAFT',
  Registered = 'REGISTERED',
  WaitingReview = 'WAITING_REVIEW',
  WithRequestedChanges = 'WITH_REQUESTED_CHANGES'
}

export type QuestionUpdateInput = {
  alternatives: Array<QuestionAlternativeInput>;
  authorship: Scalars['String']['input'];
  authorshipYear: Scalars['String']['input'];
  bloomTaxonomy?: InputMaybe<QuestionBloomTaxonomy>;
  body: Scalars['String']['input'];
  checkType?: InputMaybe<QuestionCheckType>;
  difficulty?: InputMaybe<QuestionDifficulty>;
  explanation: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  instruction: Scalars['String']['input'];
  intention?: InputMaybe<Scalars['String']['input']>;
  references: Scalars['String']['input'];
  reviewerUserId?: InputMaybe<Scalars['ID']['input']>;
  status: QuestionStatus;
  subjectId?: InputMaybe<Scalars['ID']['input']>;
  support: Scalars['String']['input'];
};

export type QuestionWhereInput = {
  authorshipYear?: InputMaybe<Array<Scalars['String']['input']>>;
  bloomTaxonomy?: InputMaybe<Array<QuestionBloomTaxonomy>>;
  checkType?: InputMaybe<Array<QuestionCheckType>>;
  createDate?: InputMaybe<DateRangeInput>;
  difficulty?: InputMaybe<Array<QuestionDifficulty>>;
  status?: InputMaybe<Array<QuestionStatus>>;
  subjectId?: InputMaybe<Scalars['ID']['input']>;
  unifesoAuthorship?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type ReviewMessage = {
  __typename?: 'ReviewMessage';
  createdAt: Scalars['ISO8601DateTime']['output'];
  feedbackType: ReviewMessageFeedbackType;
  id: Scalars['ID']['output'];
  question: Question;
  text: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user: User;
};

/** The connection type for ReviewMessage. */
export type ReviewMessageConnection = {
  __typename?: 'ReviewMessageConnection';
  /** A list of edges. */
  edges: Array<ReviewMessageEdge>;
  /** A list of nodes. */
  nodes: Array<ReviewMessage>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ReviewMessageEdge = {
  __typename?: 'ReviewMessageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ReviewMessage>;
};

export enum ReviewMessageFeedbackType {
  Answer = 'ANSWER',
  Approve = 'APPROVE',
  RequestChanges = 'REQUEST_CHANGES'
}

export type ReviewMessageInput = {
  feedbackType: ReviewMessageFeedbackType;
  questionId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type ReviewRequest = {
  __typename?: 'ReviewRequest';
  answered: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  question: Question;
  user: User;
};

/** The connection type for ReviewRequest. */
export type ReviewRequestConnection = {
  __typename?: 'ReviewRequestConnection';
  /** A list of edges. */
  edges: Array<ReviewRequestEdge>;
  /** A list of nodes. */
  nodes: Array<ReviewRequest>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ReviewRequestEdge = {
  __typename?: 'ReviewRequestEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<ReviewRequest>;
};

export type Subject = {
  __typename?: 'Subject';
  axis: Axis;
  category: Category;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  questions: QuestionConnection;
};


export type SubjectQuestionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<QuestionWhereInput>;
};

/** The connection type for Subject. */
export type SubjectConnection = {
  __typename?: 'SubjectConnection';
  /** A list of edges. */
  edges: Array<SubjectEdge>;
  /** A list of nodes. */
  nodes: Array<Subject>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SubjectEdge = {
  __typename?: 'SubjectEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Subject>;
};

/** Autogenerated input type of UpdateQuestion */
export type UpdateQuestionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  question: QuestionUpdateInput;
};

/** Autogenerated return type of UpdateQuestion */
export type UpdateQuestionPayload = {
  __typename?: 'UpdateQuestionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']['output']>;
  question?: Maybe<Question>;
};

export type User = {
  __typename?: 'User';
  activeReviewRequests: ReviewRequestConnection;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inactiveReviewRequests: ReviewRequestConnection;
  name: Scalars['String']['output'];
  roles: Array<UserRole>;
};


export type UserActiveReviewRequestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type UserInactiveReviewRequestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for User. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges: Array<UserEdge>;
  /** A list of nodes. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

export enum UserRole {
  Admin = 'ADMIN',
  CenterDirector = 'CENTER_DIRECTOR',
  Coordinator = 'COORDINATOR',
  Nde = 'NDE',
  ProRector = 'PRO_RECTOR',
  Teacher = 'TEACHER'
}
