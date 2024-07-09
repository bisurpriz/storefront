import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  date: { input: any; output: any; }
  json: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: number; output: number; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type EmailVerifyInput = {
  resend?: InputMaybe<Scalars['Boolean']['input']>;
  token: Scalars['String']['input'];
};

export type EmailVerifyOutput = {
  result?: Maybe<Scalars['String']['output']>;
};

export type ForgotPasswordInput = {
  email: Scalars['String']['input'];
  platform?: InputMaybe<Scalars['String']['input']>;
};

export type ForgotPasswordOutput = {
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type LoginOutput = {
  access_token?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['json']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
};

export type RefreshTokenOutput = {
  access_token: Scalars['String']['output'];
  body?: Maybe<Scalars['json']['output']>;
  error?: Maybe<Scalars['String']['output']>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_id?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterOutput = {
  body?: Maybe<Scalars['json']['output']>;
  data?: Maybe<Scalars['json']['output']>;
  error?: Maybe<Scalars['String']['output']>;
};

export type ResetPasswordInput = {
  new_password: Scalars['String']['input'];
  reset_token: Scalars['String']['input'];
};

export type ResetPasswordOutput = {
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "address_type" */
export type Address_Type = {
  value: Scalars['String']['output'];
};

/** aggregated selection of "address_type" */
export type Address_Type_Aggregate = {
  aggregate?: Maybe<Address_Type_Aggregate_Fields>;
  nodes: Array<Address_Type>;
};

/** aggregate fields of "address_type" */
export type Address_Type_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Address_Type_Max_Fields>;
  min?: Maybe<Address_Type_Min_Fields>;
};


/** aggregate fields of "address_type" */
export type Address_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Address_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "address_type". All fields are combined with a logical 'AND'. */
export type Address_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Address_Type_Bool_Exp>>;
  _not?: InputMaybe<Address_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Address_Type_Bool_Exp>>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "address_type" */
export type Address_Type_Constraint =
  /** unique or primary key constraint on columns "value" */
  | 'address_type_pkey';

export type Address_Type_Enum =
  | 'company'
  | 'invoice';

/** Boolean expression to compare columns of type "address_type_enum". All fields are combined with logical 'AND'. */
export type Address_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Address_Type_Enum>;
  _in?: InputMaybe<Array<Address_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Address_Type_Enum>;
  _nin?: InputMaybe<Array<Address_Type_Enum>>;
};

/** input type for inserting data into table "address_type" */
export type Address_Type_Insert_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Address_Type_Max_Fields = {
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Address_Type_Min_Fields = {
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "address_type" */
export type Address_Type_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Address_Type>;
};

/** input type for inserting object relation for remote table "address_type" */
export type Address_Type_Obj_Rel_Insert_Input = {
  data: Address_Type_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Address_Type_On_Conflict>;
};

/** on_conflict condition type for table "address_type" */
export type Address_Type_On_Conflict = {
  constraint: Address_Type_Constraint;
  update_columns?: Array<Address_Type_Update_Column>;
  where?: InputMaybe<Address_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "address_type". */
export type Address_Type_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: address_type */
export type Address_Type_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "address_type" */
export type Address_Type_Select_Column =
  /** column name */
  | 'value';

/** input type for updating data in table "address_type" */
export type Address_Type_Set_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "address_type" */
export type Address_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Address_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Address_Type_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "address_type" */
export type Address_Type_Update_Column =
  /** column name */
  | 'value';

export type Address_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Address_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: Address_Type_Bool_Exp;
};

/** Tenant answer belong to a specific question */
export type Answer = {
  answer: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** An object relationship */
  question: Question;
  question_id: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "answer" */
export type Answer_Aggregate = {
  aggregate?: Maybe<Answer_Aggregate_Fields>;
  nodes: Array<Answer>;
};

export type Answer_Aggregate_Bool_Exp = {
  count?: InputMaybe<Answer_Aggregate_Bool_Exp_Count>;
};

export type Answer_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Answer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Answer_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "answer" */
export type Answer_Aggregate_Fields = {
  avg?: Maybe<Answer_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Answer_Max_Fields>;
  min?: Maybe<Answer_Min_Fields>;
  stddev?: Maybe<Answer_Stddev_Fields>;
  stddev_pop?: Maybe<Answer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Answer_Stddev_Samp_Fields>;
  sum?: Maybe<Answer_Sum_Fields>;
  var_pop?: Maybe<Answer_Var_Pop_Fields>;
  var_samp?: Maybe<Answer_Var_Samp_Fields>;
  variance?: Maybe<Answer_Variance_Fields>;
};


/** aggregate fields of "answer" */
export type Answer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Answer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "answer" */
export type Answer_Aggregate_Order_By = {
  avg?: InputMaybe<Answer_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Answer_Max_Order_By>;
  min?: InputMaybe<Answer_Min_Order_By>;
  stddev?: InputMaybe<Answer_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Answer_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Answer_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Answer_Sum_Order_By>;
  var_pop?: InputMaybe<Answer_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Answer_Var_Samp_Order_By>;
  variance?: InputMaybe<Answer_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "answer" */
export type Answer_Arr_Rel_Insert_Input = {
  data: Array<Answer_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Answer_On_Conflict>;
};

/** aggregate avg on columns */
export type Answer_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "answer" */
export type Answer_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "answer". All fields are combined with a logical 'AND'. */
export type Answer_Bool_Exp = {
  _and?: InputMaybe<Array<Answer_Bool_Exp>>;
  _not?: InputMaybe<Answer_Bool_Exp>;
  _or?: InputMaybe<Array<Answer_Bool_Exp>>;
  answer?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  question?: InputMaybe<Question_Bool_Exp>;
  question_id?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "answer" */
export type Answer_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'answer_pkey'
  /** unique or primary key constraint on columns "question_id" */
  | 'answer_question_id_key';

/** input type for incrementing numeric columns in table "answer" */
export type Answer_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  question_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "answer" */
export type Answer_Insert_Input = {
  answer?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  question?: InputMaybe<Question_Obj_Rel_Insert_Input>;
  question_id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Answer_Max_Fields = {
  answer?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  question_id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "answer" */
export type Answer_Max_Order_By = {
  answer?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Answer_Min_Fields = {
  answer?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  question_id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "answer" */
export type Answer_Min_Order_By = {
  answer?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "answer" */
export type Answer_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Answer>;
};

/** on_conflict condition type for table "answer" */
export type Answer_On_Conflict = {
  constraint: Answer_Constraint;
  update_columns?: Array<Answer_Update_Column>;
  where?: InputMaybe<Answer_Bool_Exp>;
};

/** Ordering options when selecting data from "answer". */
export type Answer_Order_By = {
  answer?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question?: InputMaybe<Question_Order_By>;
  question_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: answer */
export type Answer_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "answer" */
export type Answer_Select_Column =
  /** column name */
  | 'answer'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'question_id'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "answer" */
export type Answer_Set_Input = {
  answer?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  question_id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Answer_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "answer" */
export type Answer_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Answer_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "answer" */
export type Answer_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Answer_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "answer" */
export type Answer_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "answer" */
export type Answer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Answer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Answer_Stream_Cursor_Value_Input = {
  answer?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  question_id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Answer_Sum_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
  question_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "answer" */
export type Answer_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** update columns of table "answer" */
export type Answer_Update_Column =
  /** column name */
  | 'answer'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'question_id'
  /** column name */
  | 'updated_at';

export type Answer_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Answer_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Answer_Set_Input>;
  /** filter the rows which have to be updated */
  where: Answer_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Answer_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "answer" */
export type Answer_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Answer_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "answer" */
export type Answer_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Answer_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "answer" */
export type Answer_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** sepet */
export type Cart = {
  content?: Maybe<Scalars['jsonb']['output']>;
  created_at: Scalars['timestamptz']['output'];
  guest_id?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};


/** sepet */
export type CartContentArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "cart" */
export type Cart_Aggregate = {
  aggregate?: Maybe<Cart_Aggregate_Fields>;
  nodes: Array<Cart>;
};

export type Cart_Aggregate_Bool_Exp = {
  count?: InputMaybe<Cart_Aggregate_Bool_Exp_Count>;
};

export type Cart_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Cart_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Cart_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "cart" */
export type Cart_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Cart_Max_Fields>;
  min?: Maybe<Cart_Min_Fields>;
};


/** aggregate fields of "cart" */
export type Cart_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Cart_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "cart" */
export type Cart_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Cart_Max_Order_By>;
  min?: InputMaybe<Cart_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Cart_Append_Input = {
  content?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "cart" */
export type Cart_Arr_Rel_Insert_Input = {
  data: Array<Cart_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Cart_On_Conflict>;
};

/** Boolean expression to filter rows from the table "cart". All fields are combined with a logical 'AND'. */
export type Cart_Bool_Exp = {
  _and?: InputMaybe<Array<Cart_Bool_Exp>>;
  _not?: InputMaybe<Cart_Bool_Exp>;
  _or?: InputMaybe<Array<Cart_Bool_Exp>>;
  content?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  guest_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "cart" */
export type Cart_Constraint =
  /** unique or primary key constraint on columns "guest_id" */
  | 'cart_guest_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'cart_pkey'
  /** unique or primary key constraint on columns "user_id" */
  | 'cart_user_id_key';

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Cart_Delete_At_Path_Input = {
  content?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Cart_Delete_Elem_Input = {
  content?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Cart_Delete_Key_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "cart" */
export type Cart_Insert_Input = {
  content?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  guest_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Cart_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  guest_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "cart" */
export type Cart_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  guest_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Cart_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  guest_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "cart" */
export type Cart_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  guest_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "cart" */
export type Cart_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Cart>;
};

/** on_conflict condition type for table "cart" */
export type Cart_On_Conflict = {
  constraint: Cart_Constraint;
  update_columns?: Array<Cart_Update_Column>;
  where?: InputMaybe<Cart_Bool_Exp>;
};

/** Ordering options when selecting data from "cart". */
export type Cart_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  guest_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: cart */
export type Cart_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Cart_Prepend_Input = {
  content?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "cart" */
export type Cart_Select_Column =
  /** column name */
  | 'content'
  /** column name */
  | 'created_at'
  /** column name */
  | 'guest_id'
  /** column name */
  | 'id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "cart" */
export type Cart_Set_Input = {
  content?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  guest_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "cart" */
export type Cart_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Cart_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Cart_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  guest_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "cart" */
export type Cart_Update_Column =
  /** column name */
  | 'content'
  /** column name */
  | 'created_at'
  /** column name */
  | 'guest_id'
  /** column name */
  | 'id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Cart_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Cart_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Cart_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Cart_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Cart_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Cart_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Cart_Set_Input>;
  /** filter the rows which have to be updated */
  where: Cart_Bool_Exp;
};

/** columns and relationships of "category" */
export type Category = {
  /** An array relationship */
  companies: Array<Company_Category>;
  /** An aggregate relationship */
  companies_aggregate: Company_Category_Aggregate;
  id: Scalars['Int']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** An object relationship */
  parent_category?: Maybe<Category>;
  parent_category_id?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  products: Array<Product>;
  /** An aggregate relationship */
  products_aggregate: Product_Aggregate;
  slug?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  sub_categories: Array<Category>;
  /** An aggregate relationship */
  sub_categories_aggregate: Category_Aggregate;
};


/** columns and relationships of "category" */
export type CategoryCompaniesArgs = {
  distinct_on?: InputMaybe<Array<Company_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Category_Order_By>>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};


/** columns and relationships of "category" */
export type CategoryCompanies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Company_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Category_Order_By>>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};


/** columns and relationships of "category" */
export type CategoryProductsArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** columns and relationships of "category" */
export type CategoryProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** columns and relationships of "category" */
export type CategorySub_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Category_Order_By>>;
  where?: InputMaybe<Category_Bool_Exp>;
};


/** columns and relationships of "category" */
export type CategorySub_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Category_Order_By>>;
  where?: InputMaybe<Category_Bool_Exp>;
};

/** aggregated selection of "category" */
export type Category_Aggregate = {
  aggregate?: Maybe<Category_Aggregate_Fields>;
  nodes: Array<Category>;
};

export type Category_Aggregate_Bool_Exp = {
  count?: InputMaybe<Category_Aggregate_Bool_Exp_Count>;
};

export type Category_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Category_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "category" */
export type Category_Aggregate_Fields = {
  avg?: Maybe<Category_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Category_Max_Fields>;
  min?: Maybe<Category_Min_Fields>;
  stddev?: Maybe<Category_Stddev_Fields>;
  stddev_pop?: Maybe<Category_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Category_Stddev_Samp_Fields>;
  sum?: Maybe<Category_Sum_Fields>;
  var_pop?: Maybe<Category_Var_Pop_Fields>;
  var_samp?: Maybe<Category_Var_Samp_Fields>;
  variance?: Maybe<Category_Variance_Fields>;
};


/** aggregate fields of "category" */
export type Category_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "category" */
export type Category_Aggregate_Order_By = {
  avg?: InputMaybe<Category_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Category_Max_Order_By>;
  min?: InputMaybe<Category_Min_Order_By>;
  stddev?: InputMaybe<Category_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Category_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Category_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Category_Sum_Order_By>;
  var_pop?: InputMaybe<Category_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Category_Var_Samp_Order_By>;
  variance?: InputMaybe<Category_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "category" */
export type Category_Arr_Rel_Insert_Input = {
  data: Array<Category_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Category_On_Conflict>;
};

/** aggregate avg on columns */
export type Category_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  parent_category_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "category" */
export type Category_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "category". All fields are combined with a logical 'AND'. */
export type Category_Bool_Exp = {
  _and?: InputMaybe<Array<Category_Bool_Exp>>;
  _not?: InputMaybe<Category_Bool_Exp>;
  _or?: InputMaybe<Array<Category_Bool_Exp>>;
  companies?: InputMaybe<Company_Category_Bool_Exp>;
  companies_aggregate?: InputMaybe<Company_Category_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  parent_category?: InputMaybe<Category_Bool_Exp>;
  parent_category_id?: InputMaybe<Int_Comparison_Exp>;
  products?: InputMaybe<Product_Bool_Exp>;
  products_aggregate?: InputMaybe<Product_Aggregate_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  sub_categories?: InputMaybe<Category_Bool_Exp>;
  sub_categories_aggregate?: InputMaybe<Category_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "category" */
export type Category_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'category_pkey';

/** input type for incrementing numeric columns in table "category" */
export type Category_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  parent_category_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "category" */
export type Category_Insert_Input = {
  companies?: InputMaybe<Company_Category_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_category?: InputMaybe<Category_Obj_Rel_Insert_Input>;
  parent_category_id?: InputMaybe<Scalars['Int']['input']>;
  products?: InputMaybe<Product_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sub_categories?: InputMaybe<Category_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Category_Max_Fields = {
  id?: Maybe<Scalars['Int']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_category_id?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "category" */
export type Category_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Category_Min_Fields = {
  id?: Maybe<Scalars['Int']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_category_id?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "category" */
export type Category_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "category" */
export type Category_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Category>;
};

/** input type for inserting object relation for remote table "category" */
export type Category_Obj_Rel_Insert_Input = {
  data: Category_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Category_On_Conflict>;
};

/** on_conflict condition type for table "category" */
export type Category_On_Conflict = {
  constraint: Category_Constraint;
  update_columns?: Array<Category_Update_Column>;
  where?: InputMaybe<Category_Bool_Exp>;
};

/** Ordering options when selecting data from "category". */
export type Category_Order_By = {
  companies_aggregate?: InputMaybe<Company_Category_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_category?: InputMaybe<Category_Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
  products_aggregate?: InputMaybe<Product_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
  sub_categories_aggregate?: InputMaybe<Category_Aggregate_Order_By>;
};

/** primary key columns input for table: category */
export type Category_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "category" */
export type Category_Select_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'image_url'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_category_id'
  /** column name */
  | 'slug';

/** input type for updating data in table "category" */
export type Category_Set_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_category_id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Category_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  parent_category_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "category" */
export type Category_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Category_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  parent_category_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "category" */
export type Category_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Category_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  parent_category_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "category" */
export type Category_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "category" */
export type Category_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Category_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Category_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_category_id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Category_Sum_Fields = {
  id?: Maybe<Scalars['Int']['output']>;
  parent_category_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "category" */
export type Category_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
};

/** update columns of table "category" */
export type Category_Update_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'image_url'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_category_id'
  /** column name */
  | 'slug';

export type Category_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Category_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Category_Set_Input>;
  /** filter the rows which have to be updated */
  where: Category_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Category_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  parent_category_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "category" */
export type Category_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Category_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  parent_category_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "category" */
export type Category_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Category_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  parent_category_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "category" */
export type Category_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  parent_category_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "chat_thread" */
export type Chat_Thread = {
  chat_no: Scalars['bigint']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  messages: Array<Message>;
  /** An aggregate relationship */
  messages_aggregate: Message_Aggregate;
  /** An object relationship */
  order_tenant: Order_Tenant;
  order_tenant_id: Scalars['bigint']['output'];
  /** An object relationship */
  tenant: User;
  tenat_id: Scalars['uuid']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "chat_thread" */
export type Chat_ThreadMessagesArgs = {
  distinct_on?: InputMaybe<Array<Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Message_Order_By>>;
  where?: InputMaybe<Message_Bool_Exp>;
};


/** columns and relationships of "chat_thread" */
export type Chat_ThreadMessages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Message_Order_By>>;
  where?: InputMaybe<Message_Bool_Exp>;
};

/** aggregated selection of "chat_thread" */
export type Chat_Thread_Aggregate = {
  aggregate?: Maybe<Chat_Thread_Aggregate_Fields>;
  nodes: Array<Chat_Thread>;
};

export type Chat_Thread_Aggregate_Bool_Exp = {
  count?: InputMaybe<Chat_Thread_Aggregate_Bool_Exp_Count>;
};

export type Chat_Thread_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Chat_Thread_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "chat_thread" */
export type Chat_Thread_Aggregate_Fields = {
  avg?: Maybe<Chat_Thread_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Chat_Thread_Max_Fields>;
  min?: Maybe<Chat_Thread_Min_Fields>;
  stddev?: Maybe<Chat_Thread_Stddev_Fields>;
  stddev_pop?: Maybe<Chat_Thread_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Chat_Thread_Stddev_Samp_Fields>;
  sum?: Maybe<Chat_Thread_Sum_Fields>;
  var_pop?: Maybe<Chat_Thread_Var_Pop_Fields>;
  var_samp?: Maybe<Chat_Thread_Var_Samp_Fields>;
  variance?: Maybe<Chat_Thread_Variance_Fields>;
};


/** aggregate fields of "chat_thread" */
export type Chat_Thread_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "chat_thread" */
export type Chat_Thread_Aggregate_Order_By = {
  avg?: InputMaybe<Chat_Thread_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Chat_Thread_Max_Order_By>;
  min?: InputMaybe<Chat_Thread_Min_Order_By>;
  stddev?: InputMaybe<Chat_Thread_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Chat_Thread_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Chat_Thread_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Chat_Thread_Sum_Order_By>;
  var_pop?: InputMaybe<Chat_Thread_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Chat_Thread_Var_Samp_Order_By>;
  variance?: InputMaybe<Chat_Thread_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "chat_thread" */
export type Chat_Thread_Arr_Rel_Insert_Input = {
  data: Array<Chat_Thread_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Chat_Thread_On_Conflict>;
};

/** aggregate avg on columns */
export type Chat_Thread_Avg_Fields = {
  chat_no?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "chat_thread" */
export type Chat_Thread_Avg_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "chat_thread". All fields are combined with a logical 'AND'. */
export type Chat_Thread_Bool_Exp = {
  _and?: InputMaybe<Array<Chat_Thread_Bool_Exp>>;
  _not?: InputMaybe<Chat_Thread_Bool_Exp>;
  _or?: InputMaybe<Array<Chat_Thread_Bool_Exp>>;
  chat_no?: InputMaybe<Bigint_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  messages?: InputMaybe<Message_Bool_Exp>;
  messages_aggregate?: InputMaybe<Message_Aggregate_Bool_Exp>;
  order_tenant?: InputMaybe<Order_Tenant_Bool_Exp>;
  order_tenant_id?: InputMaybe<Bigint_Comparison_Exp>;
  tenant?: InputMaybe<User_Bool_Exp>;
  tenat_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "chat_thread" */
export type Chat_Thread_Constraint =
  /** unique or primary key constraint on columns "chat_no" */
  | 'chat_thread_chat_no_key'
  /** unique or primary key constraint on columns "order_tenant_id" */
  | 'chat_thread_order_tenant_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'chat_thread_pkey';

/** input type for incrementing numeric columns in table "chat_thread" */
export type Chat_Thread_Inc_Input = {
  chat_no?: InputMaybe<Scalars['bigint']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "chat_thread" */
export type Chat_Thread_Insert_Input = {
  chat_no?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  messages?: InputMaybe<Message_Arr_Rel_Insert_Input>;
  order_tenant?: InputMaybe<Order_Tenant_Obj_Rel_Insert_Input>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  tenant?: InputMaybe<User_Obj_Rel_Insert_Input>;
  tenat_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Chat_Thread_Max_Fields = {
  chat_no?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  tenat_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "chat_thread" */
export type Chat_Thread_Max_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  tenat_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Chat_Thread_Min_Fields = {
  chat_no?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  tenat_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "chat_thread" */
export type Chat_Thread_Min_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  tenat_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "chat_thread" */
export type Chat_Thread_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Chat_Thread>;
};

/** input type for inserting object relation for remote table "chat_thread" */
export type Chat_Thread_Obj_Rel_Insert_Input = {
  data: Chat_Thread_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Chat_Thread_On_Conflict>;
};

/** on_conflict condition type for table "chat_thread" */
export type Chat_Thread_On_Conflict = {
  constraint: Chat_Thread_Constraint;
  update_columns?: Array<Chat_Thread_Update_Column>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};

/** Ordering options when selecting data from "chat_thread". */
export type Chat_Thread_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  messages_aggregate?: InputMaybe<Message_Aggregate_Order_By>;
  order_tenant?: InputMaybe<Order_Tenant_Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  tenant?: InputMaybe<User_Order_By>;
  tenat_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: chat_thread */
export type Chat_Thread_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "chat_thread" */
export type Chat_Thread_Select_Column =
  /** column name */
  | 'chat_no'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'order_tenant_id'
  /** column name */
  | 'tenat_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "chat_thread" */
export type Chat_Thread_Set_Input = {
  chat_no?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  tenat_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Chat_Thread_Stddev_Fields = {
  chat_no?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "chat_thread" */
export type Chat_Thread_Stddev_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Chat_Thread_Stddev_Pop_Fields = {
  chat_no?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "chat_thread" */
export type Chat_Thread_Stddev_Pop_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Chat_Thread_Stddev_Samp_Fields = {
  chat_no?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "chat_thread" */
export type Chat_Thread_Stddev_Samp_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "chat_thread" */
export type Chat_Thread_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chat_Thread_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chat_Thread_Stream_Cursor_Value_Input = {
  chat_no?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  tenat_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Chat_Thread_Sum_Fields = {
  chat_no?: Maybe<Scalars['bigint']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "chat_thread" */
export type Chat_Thread_Sum_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** update columns of table "chat_thread" */
export type Chat_Thread_Update_Column =
  /** column name */
  | 'chat_no'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'order_tenant_id'
  /** column name */
  | 'tenat_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Chat_Thread_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Chat_Thread_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Chat_Thread_Set_Input>;
  /** filter the rows which have to be updated */
  where: Chat_Thread_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Chat_Thread_Var_Pop_Fields = {
  chat_no?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "chat_thread" */
export type Chat_Thread_Var_Pop_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Chat_Thread_Var_Samp_Fields = {
  chat_no?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "chat_thread" */
export type Chat_Thread_Var_Samp_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Chat_Thread_Variance_Fields = {
  chat_no?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "chat_thread" */
export type Chat_Thread_Variance_Order_By = {
  chat_no?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "city" */
export type City = {
  code: Scalars['Int']['output'];
  /** An array relationship */
  districts: Array<District>;
  /** An aggregate relationship */
  districts_aggregate: District_Aggregate;
  id: Scalars['Int']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  maxlatitude?: Maybe<Scalars['String']['output']>;
  maxlongitude?: Maybe<Scalars['String']['output']>;
  minlatitude?: Maybe<Scalars['String']['output']>;
  minlongitude?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** An array relationship */
  order_addresses: Array<Order_Address>;
  /** An aggregate relationship */
  order_addresses_aggregate: Order_Address_Aggregate;
  parent_id?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  user_addresses: Array<User_Address>;
  /** An aggregate relationship */
  user_addresses_aggregate: User_Address_Aggregate;
};


/** columns and relationships of "city" */
export type CityDistrictsArgs = {
  distinct_on?: InputMaybe<Array<District_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<District_Order_By>>;
  where?: InputMaybe<District_Bool_Exp>;
};


/** columns and relationships of "city" */
export type CityDistricts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<District_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<District_Order_By>>;
  where?: InputMaybe<District_Bool_Exp>;
};


/** columns and relationships of "city" */
export type CityOrder_AddressesArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


/** columns and relationships of "city" */
export type CityOrder_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


/** columns and relationships of "city" */
export type CityUser_AddressesArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};


/** columns and relationships of "city" */
export type CityUser_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};

/** aggregated selection of "city" */
export type City_Aggregate = {
  aggregate?: Maybe<City_Aggregate_Fields>;
  nodes: Array<City>;
};

/** aggregate fields of "city" */
export type City_Aggregate_Fields = {
  avg?: Maybe<City_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<City_Max_Fields>;
  min?: Maybe<City_Min_Fields>;
  stddev?: Maybe<City_Stddev_Fields>;
  stddev_pop?: Maybe<City_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<City_Stddev_Samp_Fields>;
  sum?: Maybe<City_Sum_Fields>;
  var_pop?: Maybe<City_Var_Pop_Fields>;
  var_samp?: Maybe<City_Var_Samp_Fields>;
  variance?: Maybe<City_Variance_Fields>;
};


/** aggregate fields of "city" */
export type City_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<City_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type City_Avg_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "city". All fields are combined with a logical 'AND'. */
export type City_Bool_Exp = {
  _and?: InputMaybe<Array<City_Bool_Exp>>;
  _not?: InputMaybe<City_Bool_Exp>;
  _or?: InputMaybe<Array<City_Bool_Exp>>;
  code?: InputMaybe<Int_Comparison_Exp>;
  districts?: InputMaybe<District_Bool_Exp>;
  districts_aggregate?: InputMaybe<District_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  maxlatitude?: InputMaybe<String_Comparison_Exp>;
  maxlongitude?: InputMaybe<String_Comparison_Exp>;
  minlatitude?: InputMaybe<String_Comparison_Exp>;
  minlongitude?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order_addresses?: InputMaybe<Order_Address_Bool_Exp>;
  order_addresses_aggregate?: InputMaybe<Order_Address_Aggregate_Bool_Exp>;
  parent_id?: InputMaybe<Int_Comparison_Exp>;
  user_addresses?: InputMaybe<User_Address_Bool_Exp>;
  user_addresses_aggregate?: InputMaybe<User_Address_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "city" */
export type City_Constraint =
  /** unique or primary key constraint on columns "code" */
  | 'city_code_key'
  /** unique or primary key constraint on columns "name" */
  | 'city_name_key'
  /** unique or primary key constraint on columns "id" */
  | 'city_pkey';

/** input type for incrementing numeric columns in table "city" */
export type City_Inc_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "city" */
export type City_Insert_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  districts?: InputMaybe<District_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  maxlatitude?: InputMaybe<Scalars['String']['input']>;
  maxlongitude?: InputMaybe<Scalars['String']['input']>;
  minlatitude?: InputMaybe<Scalars['String']['input']>;
  minlongitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order_addresses?: InputMaybe<Order_Address_Arr_Rel_Insert_Input>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  user_addresses?: InputMaybe<User_Address_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type City_Max_Fields = {
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  maxlatitude?: Maybe<Scalars['String']['output']>;
  maxlongitude?: Maybe<Scalars['String']['output']>;
  minlatitude?: Maybe<Scalars['String']['output']>;
  minlongitude?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type City_Min_Fields = {
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  maxlatitude?: Maybe<Scalars['String']['output']>;
  maxlongitude?: Maybe<Scalars['String']['output']>;
  minlatitude?: Maybe<Scalars['String']['output']>;
  minlongitude?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "city" */
export type City_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<City>;
};

/** input type for inserting object relation for remote table "city" */
export type City_Obj_Rel_Insert_Input = {
  data: City_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<City_On_Conflict>;
};

/** on_conflict condition type for table "city" */
export type City_On_Conflict = {
  constraint: City_Constraint;
  update_columns?: Array<City_Update_Column>;
  where?: InputMaybe<City_Bool_Exp>;
};

/** Ordering options when selecting data from "city". */
export type City_Order_By = {
  code?: InputMaybe<Order_By>;
  districts_aggregate?: InputMaybe<District_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  maxlatitude?: InputMaybe<Order_By>;
  maxlongitude?: InputMaybe<Order_By>;
  minlatitude?: InputMaybe<Order_By>;
  minlongitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order_addresses_aggregate?: InputMaybe<Order_Address_Aggregate_Order_By>;
  parent_id?: InputMaybe<Order_By>;
  user_addresses_aggregate?: InputMaybe<User_Address_Aggregate_Order_By>;
};

/** primary key columns input for table: city */
export type City_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "city" */
export type City_Select_Column =
  /** column name */
  | 'code'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'maxlatitude'
  /** column name */
  | 'maxlongitude'
  /** column name */
  | 'minlatitude'
  /** column name */
  | 'minlongitude'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_id';

/** input type for updating data in table "city" */
export type City_Set_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  maxlatitude?: InputMaybe<Scalars['String']['input']>;
  maxlongitude?: InputMaybe<Scalars['String']['input']>;
  minlatitude?: InputMaybe<Scalars['String']['input']>;
  minlongitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type City_Stddev_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type City_Stddev_Pop_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type City_Stddev_Samp_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "city" */
export type City_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: City_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type City_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  maxlatitude?: InputMaybe<Scalars['String']['input']>;
  maxlongitude?: InputMaybe<Scalars['String']['input']>;
  minlatitude?: InputMaybe<Scalars['String']['input']>;
  minlongitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type City_Sum_Fields = {
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "city" */
export type City_Update_Column =
  /** column name */
  | 'code'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'maxlatitude'
  /** column name */
  | 'maxlongitude'
  /** column name */
  | 'minlatitude'
  /** column name */
  | 'minlongitude'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_id';

export type City_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<City_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<City_Set_Input>;
  /** filter the rows which have to be updated */
  where: City_Bool_Exp;
};

/** aggregate var_pop on columns */
export type City_Var_Pop_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type City_Var_Samp_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type City_Variance_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "company" */
export type Company = {
  address: Scalars['String']['output'];
  /** An array relationship */
  categories: Array<Company_Category>;
  /** An aggregate relationship */
  categories_aggregate: Company_Category_Aggregate;
  company_type: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  logo_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  tenant: User;
  tenant_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
  vkn_no: Scalars['String']['output'];
};


/** columns and relationships of "company" */
export type CompanyCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Company_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Category_Order_By>>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};


/** columns and relationships of "company" */
export type CompanyCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Company_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Category_Order_By>>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};

/** aggregated selection of "company" */
export type Company_Aggregate = {
  aggregate?: Maybe<Company_Aggregate_Fields>;
  nodes: Array<Company>;
};

export type Company_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Company_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Company_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Company_Aggregate_Bool_Exp_Count>;
};

export type Company_Aggregate_Bool_Exp_Bool_And = {
  arguments: Company_Select_Column_Company_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Company_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Company_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Company_Select_Column_Company_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Company_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Company_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Company_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Company_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "company" */
export type Company_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Company_Max_Fields>;
  min?: Maybe<Company_Min_Fields>;
};


/** aggregate fields of "company" */
export type Company_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Company_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "company" */
export type Company_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Company_Max_Order_By>;
  min?: InputMaybe<Company_Min_Order_By>;
};

/** input type for inserting array relation for remote table "company" */
export type Company_Arr_Rel_Insert_Input = {
  data: Array<Company_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Company_On_Conflict>;
};

/** Boolean expression to filter rows from the table "company". All fields are combined with a logical 'AND'. */
export type Company_Bool_Exp = {
  _and?: InputMaybe<Array<Company_Bool_Exp>>;
  _not?: InputMaybe<Company_Bool_Exp>;
  _or?: InputMaybe<Array<Company_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  categories?: InputMaybe<Company_Category_Bool_Exp>;
  categories_aggregate?: InputMaybe<Company_Category_Aggregate_Bool_Exp>;
  company_type?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>;
  logo_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  tenant?: InputMaybe<User_Bool_Exp>;
  tenant_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  vkn_no?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "company_category" */
export type Company_Category = {
  /** An object relationship */
  category: Category;
  category_id: Scalars['Int']['output'];
  /** An object relationship */
  company: Company;
  company_id: Scalars['uuid']['output'];
  id: Scalars['Int']['output'];
};

/** aggregated selection of "company_category" */
export type Company_Category_Aggregate = {
  aggregate?: Maybe<Company_Category_Aggregate_Fields>;
  nodes: Array<Company_Category>;
};

export type Company_Category_Aggregate_Bool_Exp = {
  count?: InputMaybe<Company_Category_Aggregate_Bool_Exp_Count>;
};

export type Company_Category_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Company_Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Company_Category_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "company_category" */
export type Company_Category_Aggregate_Fields = {
  avg?: Maybe<Company_Category_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Company_Category_Max_Fields>;
  min?: Maybe<Company_Category_Min_Fields>;
  stddev?: Maybe<Company_Category_Stddev_Fields>;
  stddev_pop?: Maybe<Company_Category_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Company_Category_Stddev_Samp_Fields>;
  sum?: Maybe<Company_Category_Sum_Fields>;
  var_pop?: Maybe<Company_Category_Var_Pop_Fields>;
  var_samp?: Maybe<Company_Category_Var_Samp_Fields>;
  variance?: Maybe<Company_Category_Variance_Fields>;
};


/** aggregate fields of "company_category" */
export type Company_Category_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Company_Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "company_category" */
export type Company_Category_Aggregate_Order_By = {
  avg?: InputMaybe<Company_Category_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Company_Category_Max_Order_By>;
  min?: InputMaybe<Company_Category_Min_Order_By>;
  stddev?: InputMaybe<Company_Category_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Company_Category_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Company_Category_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Company_Category_Sum_Order_By>;
  var_pop?: InputMaybe<Company_Category_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Company_Category_Var_Samp_Order_By>;
  variance?: InputMaybe<Company_Category_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "company_category" */
export type Company_Category_Arr_Rel_Insert_Input = {
  data: Array<Company_Category_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Company_Category_On_Conflict>;
};

/** aggregate avg on columns */
export type Company_Category_Avg_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "company_category" */
export type Company_Category_Avg_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "company_category". All fields are combined with a logical 'AND'. */
export type Company_Category_Bool_Exp = {
  _and?: InputMaybe<Array<Company_Category_Bool_Exp>>;
  _not?: InputMaybe<Company_Category_Bool_Exp>;
  _or?: InputMaybe<Array<Company_Category_Bool_Exp>>;
  category?: InputMaybe<Category_Bool_Exp>;
  category_id?: InputMaybe<Int_Comparison_Exp>;
  company?: InputMaybe<Company_Bool_Exp>;
  company_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "company_category" */
export type Company_Category_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'company_category_pkey';

/** input type for incrementing numeric columns in table "company_category" */
export type Company_Category_Inc_Input = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "company_category" */
export type Company_Category_Insert_Input = {
  category?: InputMaybe<Category_Obj_Rel_Insert_Input>;
  category_id?: InputMaybe<Scalars['Int']['input']>;
  company?: InputMaybe<Company_Obj_Rel_Insert_Input>;
  company_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Company_Category_Max_Fields = {
  category_id?: Maybe<Scalars['Int']['output']>;
  company_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "company_category" */
export type Company_Category_Max_Order_By = {
  category_id?: InputMaybe<Order_By>;
  company_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Company_Category_Min_Fields = {
  category_id?: Maybe<Scalars['Int']['output']>;
  company_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "company_category" */
export type Company_Category_Min_Order_By = {
  category_id?: InputMaybe<Order_By>;
  company_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "company_category" */
export type Company_Category_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Company_Category>;
};

/** on_conflict condition type for table "company_category" */
export type Company_Category_On_Conflict = {
  constraint: Company_Category_Constraint;
  update_columns?: Array<Company_Category_Update_Column>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};

/** Ordering options when selecting data from "company_category". */
export type Company_Category_Order_By = {
  category?: InputMaybe<Category_Order_By>;
  category_id?: InputMaybe<Order_By>;
  company?: InputMaybe<Company_Order_By>;
  company_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: company_category */
export type Company_Category_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "company_category" */
export type Company_Category_Select_Column =
  /** column name */
  | 'category_id'
  /** column name */
  | 'company_id'
  /** column name */
  | 'id';

/** input type for updating data in table "company_category" */
export type Company_Category_Set_Input = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  company_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Company_Category_Stddev_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "company_category" */
export type Company_Category_Stddev_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Company_Category_Stddev_Pop_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "company_category" */
export type Company_Category_Stddev_Pop_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Company_Category_Stddev_Samp_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "company_category" */
export type Company_Category_Stddev_Samp_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "company_category" */
export type Company_Category_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Company_Category_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Company_Category_Stream_Cursor_Value_Input = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  company_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Company_Category_Sum_Fields = {
  category_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "company_category" */
export type Company_Category_Sum_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "company_category" */
export type Company_Category_Update_Column =
  /** column name */
  | 'category_id'
  /** column name */
  | 'company_id'
  /** column name */
  | 'id';

export type Company_Category_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Company_Category_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Company_Category_Set_Input>;
  /** filter the rows which have to be updated */
  where: Company_Category_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Company_Category_Var_Pop_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "company_category" */
export type Company_Category_Var_Pop_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Company_Category_Var_Samp_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "company_category" */
export type Company_Category_Var_Samp_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Company_Category_Variance_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "company_category" */
export type Company_Category_Variance_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** unique or primary key constraints on table "company" */
export type Company_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'company_pkey';

/** input type for inserting data into table "company" */
export type Company_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Company_Category_Arr_Rel_Insert_Input>;
  company_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  logo_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  tenant?: InputMaybe<User_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  vkn_no?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Company_Max_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  company_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  logo_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  vkn_no?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "company" */
export type Company_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  company_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logo_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vkn_no?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Company_Min_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  company_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  logo_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  vkn_no?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "company" */
export type Company_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  company_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logo_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vkn_no?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "company" */
export type Company_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Company>;
};

/** input type for inserting object relation for remote table "company" */
export type Company_Obj_Rel_Insert_Input = {
  data: Company_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Company_On_Conflict>;
};

/** on_conflict condition type for table "company" */
export type Company_On_Conflict = {
  constraint: Company_Constraint;
  update_columns?: Array<Company_Update_Column>;
  where?: InputMaybe<Company_Bool_Exp>;
};

/** Ordering options when selecting data from "company". */
export type Company_Order_By = {
  address?: InputMaybe<Order_By>;
  categories_aggregate?: InputMaybe<Company_Category_Aggregate_Order_By>;
  company_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  is_deleted?: InputMaybe<Order_By>;
  logo_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  tenant?: InputMaybe<User_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vkn_no?: InputMaybe<Order_By>;
};

/** primary key columns input for table: company */
export type Company_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "company" */
export type Company_Select_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'company_type'
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_deleted'
  /** column name */
  | 'logo_url'
  /** column name */
  | 'name'
  /** column name */
  | 'phone'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'vkn_no';

/** select "company_aggregate_bool_exp_bool_and_arguments_columns" columns of table "company" */
export type Company_Select_Column_Company_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_deleted';

/** select "company_aggregate_bool_exp_bool_or_arguments_columns" columns of table "company" */
export type Company_Select_Column_Company_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_deleted';

/** input type for updating data in table "company" */
export type Company_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  company_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  logo_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  vkn_no?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "company" */
export type Company_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Company_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Company_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  company_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  logo_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  vkn_no?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "company_type" */
export type Company_Type = {
  comment?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

/** aggregated selection of "company_type" */
export type Company_Type_Aggregate = {
  aggregate?: Maybe<Company_Type_Aggregate_Fields>;
  nodes: Array<Company_Type>;
};

/** aggregate fields of "company_type" */
export type Company_Type_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Company_Type_Max_Fields>;
  min?: Maybe<Company_Type_Min_Fields>;
};


/** aggregate fields of "company_type" */
export type Company_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Company_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "company_type". All fields are combined with a logical 'AND'. */
export type Company_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Company_Type_Bool_Exp>>;
  _not?: InputMaybe<Company_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Company_Type_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "company_type" */
export type Company_Type_Constraint =
  /** unique or primary key constraint on columns "value" */
  | 'company_type_pkey';

export type Company_Type_Enum =
  | 'individual'
  | 'limited';

/** Boolean expression to compare columns of type "company_type_enum". All fields are combined with logical 'AND'. */
export type Company_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Company_Type_Enum>;
  _in?: InputMaybe<Array<Company_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Company_Type_Enum>;
  _nin?: InputMaybe<Array<Company_Type_Enum>>;
};

/** input type for inserting data into table "company_type" */
export type Company_Type_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Company_Type_Max_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Company_Type_Min_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "company_type" */
export type Company_Type_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Company_Type>;
};

/** input type for inserting object relation for remote table "company_type" */
export type Company_Type_Obj_Rel_Insert_Input = {
  data: Company_Type_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Company_Type_On_Conflict>;
};

/** on_conflict condition type for table "company_type" */
export type Company_Type_On_Conflict = {
  constraint: Company_Type_Constraint;
  update_columns?: Array<Company_Type_Update_Column>;
  where?: InputMaybe<Company_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "company_type". */
export type Company_Type_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: company_type */
export type Company_Type_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "company_type" */
export type Company_Type_Select_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

/** input type for updating data in table "company_type" */
export type Company_Type_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "company_type" */
export type Company_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Company_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Company_Type_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "company_type" */
export type Company_Type_Update_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

export type Company_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Company_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: Company_Type_Bool_Exp;
};

/** update columns of table "company" */
export type Company_Update_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'company_type'
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_deleted'
  /** column name */
  | 'logo_url'
  /** column name */
  | 'name'
  /** column name */
  | 'phone'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'vkn_no';

export type Company_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Company_Set_Input>;
  /** filter the rows which have to be updated */
  where: Company_Bool_Exp;
};

/** columns and relationships of "coupon" */
export type Coupon = {
  amount: Scalars['numeric']['output'];
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['date']['output']>;
  id: Scalars['uuid']['output'];
  is_public?: Maybe<Scalars['Boolean']['output']>;
  left_limit?: Maybe<Scalars['Int']['output']>;
  limit: Scalars['Int']['output'];
  minimum_cost?: Maybe<Scalars['numeric']['output']>;
  start_date?: Maybe<Scalars['date']['output']>;
  /** An object relationship */
  tenant: User;
  tenant_id: Scalars['uuid']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  user_coupons: Array<User_Coupon>;
  /** An aggregate relationship */
  user_coupons_aggregate: User_Coupon_Aggregate;
};


/** columns and relationships of "coupon" */
export type CouponUser_CouponsArgs = {
  distinct_on?: InputMaybe<Array<User_Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Coupon_Order_By>>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};


/** columns and relationships of "coupon" */
export type CouponUser_Coupons_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Coupon_Order_By>>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};

/** aggregated selection of "coupon" */
export type Coupon_Aggregate = {
  aggregate?: Maybe<Coupon_Aggregate_Fields>;
  nodes: Array<Coupon>;
};

/** aggregate fields of "coupon" */
export type Coupon_Aggregate_Fields = {
  avg?: Maybe<Coupon_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Coupon_Max_Fields>;
  min?: Maybe<Coupon_Min_Fields>;
  stddev?: Maybe<Coupon_Stddev_Fields>;
  stddev_pop?: Maybe<Coupon_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Coupon_Stddev_Samp_Fields>;
  sum?: Maybe<Coupon_Sum_Fields>;
  var_pop?: Maybe<Coupon_Var_Pop_Fields>;
  var_samp?: Maybe<Coupon_Var_Samp_Fields>;
  variance?: Maybe<Coupon_Variance_Fields>;
};


/** aggregate fields of "coupon" */
export type Coupon_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Coupon_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Coupon_Avg_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  left_limit?: Maybe<Scalars['Float']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  minimum_cost?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "coupon". All fields are combined with a logical 'AND'. */
export type Coupon_Bool_Exp = {
  _and?: InputMaybe<Array<Coupon_Bool_Exp>>;
  _not?: InputMaybe<Coupon_Bool_Exp>;
  _or?: InputMaybe<Array<Coupon_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  end_date?: InputMaybe<Date_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_public?: InputMaybe<Boolean_Comparison_Exp>;
  left_limit?: InputMaybe<Int_Comparison_Exp>;
  limit?: InputMaybe<Int_Comparison_Exp>;
  minimum_cost?: InputMaybe<Numeric_Comparison_Exp>;
  start_date?: InputMaybe<Date_Comparison_Exp>;
  tenant?: InputMaybe<User_Bool_Exp>;
  tenant_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_coupons?: InputMaybe<User_Coupon_Bool_Exp>;
  user_coupons_aggregate?: InputMaybe<User_Coupon_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "coupon" */
export type Coupon_Constraint =
  /** unique or primary key constraint on columns "code" */
  | 'coupon_code_key'
  /** unique or primary key constraint on columns "id" */
  | 'coupon_pkey';

/** input type for incrementing numeric columns in table "coupon" */
export type Coupon_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  left_limit?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  minimum_cost?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "coupon" */
export type Coupon_Insert_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  left_limit?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  minimum_cost?: InputMaybe<Scalars['numeric']['input']>;
  start_date?: InputMaybe<Scalars['date']['input']>;
  tenant?: InputMaybe<User_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_coupons?: InputMaybe<User_Coupon_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Coupon_Max_Fields = {
  amount?: Maybe<Scalars['numeric']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['date']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  left_limit?: Maybe<Scalars['Int']['output']>;
  limit?: Maybe<Scalars['Int']['output']>;
  minimum_cost?: Maybe<Scalars['numeric']['output']>;
  start_date?: Maybe<Scalars['date']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Coupon_Min_Fields = {
  amount?: Maybe<Scalars['numeric']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['date']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  left_limit?: Maybe<Scalars['Int']['output']>;
  limit?: Maybe<Scalars['Int']['output']>;
  minimum_cost?: Maybe<Scalars['numeric']['output']>;
  start_date?: Maybe<Scalars['date']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "coupon" */
export type Coupon_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Coupon>;
};

/** input type for inserting object relation for remote table "coupon" */
export type Coupon_Obj_Rel_Insert_Input = {
  data: Coupon_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Coupon_On_Conflict>;
};

/** on_conflict condition type for table "coupon" */
export type Coupon_On_Conflict = {
  constraint: Coupon_Constraint;
  update_columns?: Array<Coupon_Update_Column>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};

/** Ordering options when selecting data from "coupon". */
export type Coupon_Order_By = {
  amount?: InputMaybe<Order_By>;
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_public?: InputMaybe<Order_By>;
  left_limit?: InputMaybe<Order_By>;
  limit?: InputMaybe<Order_By>;
  minimum_cost?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  tenant?: InputMaybe<User_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_coupons_aggregate?: InputMaybe<User_Coupon_Aggregate_Order_By>;
};

/** primary key columns input for table: coupon */
export type Coupon_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "coupon" */
export type Coupon_Select_Column =
  /** column name */
  | 'amount'
  /** column name */
  | 'code'
  /** column name */
  | 'created_at'
  /** column name */
  | 'description'
  /** column name */
  | 'end_date'
  /** column name */
  | 'id'
  /** column name */
  | 'is_public'
  /** column name */
  | 'left_limit'
  /** column name */
  | 'limit'
  /** column name */
  | 'minimum_cost'
  /** column name */
  | 'start_date'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "coupon" */
export type Coupon_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  left_limit?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  minimum_cost?: InputMaybe<Scalars['numeric']['input']>;
  start_date?: InputMaybe<Scalars['date']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Coupon_Stddev_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  left_limit?: Maybe<Scalars['Float']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  minimum_cost?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Coupon_Stddev_Pop_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  left_limit?: Maybe<Scalars['Float']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  minimum_cost?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Coupon_Stddev_Samp_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  left_limit?: Maybe<Scalars['Float']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  minimum_cost?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "coupon" */
export type Coupon_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Coupon_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Coupon_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  left_limit?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  minimum_cost?: InputMaybe<Scalars['numeric']['input']>;
  start_date?: InputMaybe<Scalars['date']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Coupon_Sum_Fields = {
  amount?: Maybe<Scalars['numeric']['output']>;
  left_limit?: Maybe<Scalars['Int']['output']>;
  limit?: Maybe<Scalars['Int']['output']>;
  minimum_cost?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "coupon" */
export type Coupon_Update_Column =
  /** column name */
  | 'amount'
  /** column name */
  | 'code'
  /** column name */
  | 'created_at'
  /** column name */
  | 'description'
  /** column name */
  | 'end_date'
  /** column name */
  | 'id'
  /** column name */
  | 'is_public'
  /** column name */
  | 'left_limit'
  /** column name */
  | 'limit'
  /** column name */
  | 'minimum_cost'
  /** column name */
  | 'start_date'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'updated_at';

export type Coupon_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Coupon_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Coupon_Set_Input>;
  /** filter the rows which have to be updated */
  where: Coupon_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Coupon_Var_Pop_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  left_limit?: Maybe<Scalars['Float']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  minimum_cost?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Coupon_Var_Samp_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  left_limit?: Maybe<Scalars['Float']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  minimum_cost?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Coupon_Variance_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  left_limit?: Maybe<Scalars['Float']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  minimum_cost?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export type Cursor_Ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** özel yazı yada fotograf */
export type Customizable_Area = {
  count?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

/** aggregated selection of "customizable_area" */
export type Customizable_Area_Aggregate = {
  aggregate?: Maybe<Customizable_Area_Aggregate_Fields>;
  nodes: Array<Customizable_Area>;
};

/** aggregate fields of "customizable_area" */
export type Customizable_Area_Aggregate_Fields = {
  avg?: Maybe<Customizable_Area_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Customizable_Area_Max_Fields>;
  min?: Maybe<Customizable_Area_Min_Fields>;
  stddev?: Maybe<Customizable_Area_Stddev_Fields>;
  stddev_pop?: Maybe<Customizable_Area_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Customizable_Area_Stddev_Samp_Fields>;
  sum?: Maybe<Customizable_Area_Sum_Fields>;
  var_pop?: Maybe<Customizable_Area_Var_Pop_Fields>;
  var_samp?: Maybe<Customizable_Area_Var_Samp_Fields>;
  variance?: Maybe<Customizable_Area_Variance_Fields>;
};


/** aggregate fields of "customizable_area" */
export type Customizable_Area_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Customizable_Area_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Customizable_Area_Avg_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "customizable_area". All fields are combined with a logical 'AND'. */
export type Customizable_Area_Bool_Exp = {
  _and?: InputMaybe<Array<Customizable_Area_Bool_Exp>>;
  _not?: InputMaybe<Customizable_Area_Bool_Exp>;
  _or?: InputMaybe<Array<Customizable_Area_Bool_Exp>>;
  count?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "customizable_area" */
export type Customizable_Area_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'customizable_area_pkey';

/** input type for incrementing numeric columns in table "customizable_area" */
export type Customizable_Area_Inc_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "customizable_area" */
export type Customizable_Area_Insert_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Customizable_Area_Max_Fields = {
  count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Customizable_Area_Min_Fields = {
  count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "customizable_area" */
export type Customizable_Area_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Customizable_Area>;
};

/** input type for inserting object relation for remote table "customizable_area" */
export type Customizable_Area_Obj_Rel_Insert_Input = {
  data: Customizable_Area_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Customizable_Area_On_Conflict>;
};

/** on_conflict condition type for table "customizable_area" */
export type Customizable_Area_On_Conflict = {
  constraint: Customizable_Area_Constraint;
  update_columns?: Array<Customizable_Area_Update_Column>;
  where?: InputMaybe<Customizable_Area_Bool_Exp>;
};

/** Ordering options when selecting data from "customizable_area". */
export type Customizable_Area_Order_By = {
  count?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: customizable_area */
export type Customizable_Area_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "customizable_area" */
export type Customizable_Area_Select_Column =
  /** column name */
  | 'count'
  /** column name */
  | 'id'
  /** column name */
  | 'type';

/** input type for updating data in table "customizable_area" */
export type Customizable_Area_Set_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Customizable_Area_Stddev_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Customizable_Area_Stddev_Pop_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Customizable_Area_Stddev_Samp_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "customizable_area" */
export type Customizable_Area_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Customizable_Area_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Customizable_Area_Stream_Cursor_Value_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Customizable_Area_Sum_Fields = {
  count?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "customizable_area" */
export type Customizable_Area_Update_Column =
  /** column name */
  | 'count'
  /** column name */
  | 'id'
  /** column name */
  | 'type';

export type Customizable_Area_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Customizable_Area_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Customizable_Area_Set_Input>;
  /** filter the rows which have to be updated */
  where: Customizable_Area_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Customizable_Area_Var_Pop_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Customizable_Area_Var_Samp_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Customizable_Area_Variance_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** columns and relationships of "delivery_type" */
export type Delivery_Type = {
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  products: Array<Product>;
  /** An aggregate relationship */
  products_aggregate: Product_Aggregate;
  value: Scalars['String']['output'];
};


/** columns and relationships of "delivery_type" */
export type Delivery_TypeProductsArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** columns and relationships of "delivery_type" */
export type Delivery_TypeProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};

/** aggregated selection of "delivery_type" */
export type Delivery_Type_Aggregate = {
  aggregate?: Maybe<Delivery_Type_Aggregate_Fields>;
  nodes: Array<Delivery_Type>;
};

/** aggregate fields of "delivery_type" */
export type Delivery_Type_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Delivery_Type_Max_Fields>;
  min?: Maybe<Delivery_Type_Min_Fields>;
};


/** aggregate fields of "delivery_type" */
export type Delivery_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Delivery_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "delivery_type". All fields are combined with a logical 'AND'. */
export type Delivery_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Delivery_Type_Bool_Exp>>;
  _not?: InputMaybe<Delivery_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Delivery_Type_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  products?: InputMaybe<Product_Bool_Exp>;
  products_aggregate?: InputMaybe<Product_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "delivery_type" */
export type Delivery_Type_Constraint =
  /** unique or primary key constraint on columns "value" */
  | 'delivery_type_pkey';

export type Delivery_Type_Enum =
  | 'CARGO_SHIPPING'
  /** Delivery in same day by service */
  | 'SAME_DAY'
  | 'SAME_DAY_CARGO';

/** Boolean expression to compare columns of type "delivery_type_enum". All fields are combined with logical 'AND'. */
export type Delivery_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Delivery_Type_Enum>;
  _in?: InputMaybe<Array<Delivery_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Delivery_Type_Enum>;
  _nin?: InputMaybe<Array<Delivery_Type_Enum>>;
};

/** input type for inserting data into table "delivery_type" */
export type Delivery_Type_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Product_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Delivery_Type_Max_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Delivery_Type_Min_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "delivery_type" */
export type Delivery_Type_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Delivery_Type>;
};

/** input type for inserting object relation for remote table "delivery_type" */
export type Delivery_Type_Obj_Rel_Insert_Input = {
  data: Delivery_Type_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Delivery_Type_On_Conflict>;
};

/** on_conflict condition type for table "delivery_type" */
export type Delivery_Type_On_Conflict = {
  constraint: Delivery_Type_Constraint;
  update_columns?: Array<Delivery_Type_Update_Column>;
  where?: InputMaybe<Delivery_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "delivery_type". */
export type Delivery_Type_Order_By = {
  comment?: InputMaybe<Order_By>;
  products_aggregate?: InputMaybe<Product_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: delivery_type */
export type Delivery_Type_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "delivery_type" */
export type Delivery_Type_Select_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

/** input type for updating data in table "delivery_type" */
export type Delivery_Type_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "delivery_type" */
export type Delivery_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Delivery_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Delivery_Type_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "delivery_type" */
export type Delivery_Type_Update_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

export type Delivery_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Delivery_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: Delivery_Type_Bool_Exp;
};

/** columns and relationships of "district" */
export type District = {
  /** An object relationship */
  city: City;
  code: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  maxlatitude?: Maybe<Scalars['String']['output']>;
  maxlongitude?: Maybe<Scalars['String']['output']>;
  minlatitude?: Maybe<Scalars['String']['output']>;
  minlongitude?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** An array relationship */
  order_addresses: Array<Order_Address>;
  /** An aggregate relationship */
  order_addresses_aggregate: Order_Address_Aggregate;
  parent_id: Scalars['Int']['output'];
  /** An array relationship */
  quarters: Array<Quarter>;
  /** An aggregate relationship */
  quarters_aggregate: Quarter_Aggregate;
  /** An array relationship */
  user_addresses: Array<User_Address>;
  /** An aggregate relationship */
  user_addresses_aggregate: User_Address_Aggregate;
};


/** columns and relationships of "district" */
export type DistrictOrder_AddressesArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


/** columns and relationships of "district" */
export type DistrictOrder_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


/** columns and relationships of "district" */
export type DistrictQuartersArgs = {
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


/** columns and relationships of "district" */
export type DistrictQuarters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


/** columns and relationships of "district" */
export type DistrictUser_AddressesArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};


/** columns and relationships of "district" */
export type DistrictUser_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};

/** aggregated selection of "district" */
export type District_Aggregate = {
  aggregate?: Maybe<District_Aggregate_Fields>;
  nodes: Array<District>;
};

export type District_Aggregate_Bool_Exp = {
  count?: InputMaybe<District_Aggregate_Bool_Exp_Count>;
};

export type District_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<District_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<District_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "district" */
export type District_Aggregate_Fields = {
  avg?: Maybe<District_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<District_Max_Fields>;
  min?: Maybe<District_Min_Fields>;
  stddev?: Maybe<District_Stddev_Fields>;
  stddev_pop?: Maybe<District_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<District_Stddev_Samp_Fields>;
  sum?: Maybe<District_Sum_Fields>;
  var_pop?: Maybe<District_Var_Pop_Fields>;
  var_samp?: Maybe<District_Var_Samp_Fields>;
  variance?: Maybe<District_Variance_Fields>;
};


/** aggregate fields of "district" */
export type District_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<District_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "district" */
export type District_Aggregate_Order_By = {
  avg?: InputMaybe<District_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<District_Max_Order_By>;
  min?: InputMaybe<District_Min_Order_By>;
  stddev?: InputMaybe<District_Stddev_Order_By>;
  stddev_pop?: InputMaybe<District_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<District_Stddev_Samp_Order_By>;
  sum?: InputMaybe<District_Sum_Order_By>;
  var_pop?: InputMaybe<District_Var_Pop_Order_By>;
  var_samp?: InputMaybe<District_Var_Samp_Order_By>;
  variance?: InputMaybe<District_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "district" */
export type District_Arr_Rel_Insert_Input = {
  data: Array<District_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<District_On_Conflict>;
};

/** aggregate avg on columns */
export type District_Avg_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "district" */
export type District_Avg_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "district". All fields are combined with a logical 'AND'. */
export type District_Bool_Exp = {
  _and?: InputMaybe<Array<District_Bool_Exp>>;
  _not?: InputMaybe<District_Bool_Exp>;
  _or?: InputMaybe<Array<District_Bool_Exp>>;
  city?: InputMaybe<City_Bool_Exp>;
  code?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  maxlatitude?: InputMaybe<String_Comparison_Exp>;
  maxlongitude?: InputMaybe<String_Comparison_Exp>;
  minlatitude?: InputMaybe<String_Comparison_Exp>;
  minlongitude?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order_addresses?: InputMaybe<Order_Address_Bool_Exp>;
  order_addresses_aggregate?: InputMaybe<Order_Address_Aggregate_Bool_Exp>;
  parent_id?: InputMaybe<Int_Comparison_Exp>;
  quarters?: InputMaybe<Quarter_Bool_Exp>;
  quarters_aggregate?: InputMaybe<Quarter_Aggregate_Bool_Exp>;
  user_addresses?: InputMaybe<User_Address_Bool_Exp>;
  user_addresses_aggregate?: InputMaybe<User_Address_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "district" */
export type District_Constraint =
  /** unique or primary key constraint on columns "code" */
  | 'district_code_key'
  /** unique or primary key constraint on columns "id" */
  | 'district_pkey';

/** input type for incrementing numeric columns in table "district" */
export type District_Inc_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "district" */
export type District_Insert_Input = {
  city?: InputMaybe<City_Obj_Rel_Insert_Input>;
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  maxlatitude?: InputMaybe<Scalars['String']['input']>;
  maxlongitude?: InputMaybe<Scalars['String']['input']>;
  minlatitude?: InputMaybe<Scalars['String']['input']>;
  minlongitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order_addresses?: InputMaybe<Order_Address_Arr_Rel_Insert_Input>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  quarters?: InputMaybe<Quarter_Arr_Rel_Insert_Input>;
  user_addresses?: InputMaybe<User_Address_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type District_Max_Fields = {
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  maxlatitude?: Maybe<Scalars['String']['output']>;
  maxlongitude?: Maybe<Scalars['String']['output']>;
  minlatitude?: Maybe<Scalars['String']['output']>;
  minlongitude?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "district" */
export type District_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maxlatitude?: InputMaybe<Order_By>;
  maxlongitude?: InputMaybe<Order_By>;
  minlatitude?: InputMaybe<Order_By>;
  minlongitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type District_Min_Fields = {
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  maxlatitude?: Maybe<Scalars['String']['output']>;
  maxlongitude?: Maybe<Scalars['String']['output']>;
  minlatitude?: Maybe<Scalars['String']['output']>;
  minlongitude?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "district" */
export type District_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maxlatitude?: InputMaybe<Order_By>;
  maxlongitude?: InputMaybe<Order_By>;
  minlatitude?: InputMaybe<Order_By>;
  minlongitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "district" */
export type District_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<District>;
};

/** input type for inserting object relation for remote table "district" */
export type District_Obj_Rel_Insert_Input = {
  data: District_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<District_On_Conflict>;
};

/** on_conflict condition type for table "district" */
export type District_On_Conflict = {
  constraint: District_Constraint;
  update_columns?: Array<District_Update_Column>;
  where?: InputMaybe<District_Bool_Exp>;
};

/** Ordering options when selecting data from "district". */
export type District_Order_By = {
  city?: InputMaybe<City_Order_By>;
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maxlatitude?: InputMaybe<Order_By>;
  maxlongitude?: InputMaybe<Order_By>;
  minlatitude?: InputMaybe<Order_By>;
  minlongitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order_addresses_aggregate?: InputMaybe<Order_Address_Aggregate_Order_By>;
  parent_id?: InputMaybe<Order_By>;
  quarters_aggregate?: InputMaybe<Quarter_Aggregate_Order_By>;
  user_addresses_aggregate?: InputMaybe<User_Address_Aggregate_Order_By>;
};

/** primary key columns input for table: district */
export type District_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "district" */
export type District_Select_Column =
  /** column name */
  | 'code'
  /** column name */
  | 'id'
  /** column name */
  | 'maxlatitude'
  /** column name */
  | 'maxlongitude'
  /** column name */
  | 'minlatitude'
  /** column name */
  | 'minlongitude'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_id';

/** input type for updating data in table "district" */
export type District_Set_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  maxlatitude?: InputMaybe<Scalars['String']['input']>;
  maxlongitude?: InputMaybe<Scalars['String']['input']>;
  minlatitude?: InputMaybe<Scalars['String']['input']>;
  minlongitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type District_Stddev_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "district" */
export type District_Stddev_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type District_Stddev_Pop_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "district" */
export type District_Stddev_Pop_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type District_Stddev_Samp_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "district" */
export type District_Stddev_Samp_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "district" */
export type District_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: District_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type District_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  maxlatitude?: InputMaybe<Scalars['String']['input']>;
  maxlongitude?: InputMaybe<Scalars['String']['input']>;
  minlatitude?: InputMaybe<Scalars['String']['input']>;
  minlongitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type District_Sum_Fields = {
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "district" */
export type District_Sum_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** update columns of table "district" */
export type District_Update_Column =
  /** column name */
  | 'code'
  /** column name */
  | 'id'
  /** column name */
  | 'maxlatitude'
  /** column name */
  | 'maxlongitude'
  /** column name */
  | 'minlatitude'
  /** column name */
  | 'minlongitude'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_id';

export type District_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<District_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<District_Set_Input>;
  /** filter the rows which have to be updated */
  where: District_Bool_Exp;
};

/** aggregate var_pop on columns */
export type District_Var_Pop_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "district" */
export type District_Var_Pop_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type District_Var_Samp_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "district" */
export type District_Var_Samp_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type District_Variance_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "district" */
export type District_Variance_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** columns and relationships of "message" */
export type Message = {
  /** An object relationship */
  chat_thread: Chat_Thread;
  chat_thread_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  is_read?: Maybe<Scalars['Boolean']['output']>;
  message: Scalars['String']['output'];
  /** An object relationship */
  receiver: User;
  receiver_id: Scalars['uuid']['output'];
  /** An object relationship */
  sender: User;
  sender_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "message" */
export type Message_Aggregate = {
  aggregate?: Maybe<Message_Aggregate_Fields>;
  nodes: Array<Message>;
};

export type Message_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Message_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Message_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Message_Aggregate_Bool_Exp_Count>;
};

export type Message_Aggregate_Bool_Exp_Bool_And = {
  arguments: Message_Select_Column_Message_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Message_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Message_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Message_Select_Column_Message_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Message_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Message_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Message_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Message_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "message" */
export type Message_Aggregate_Fields = {
  avg?: Maybe<Message_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Message_Max_Fields>;
  min?: Maybe<Message_Min_Fields>;
  stddev?: Maybe<Message_Stddev_Fields>;
  stddev_pop?: Maybe<Message_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Message_Stddev_Samp_Fields>;
  sum?: Maybe<Message_Sum_Fields>;
  var_pop?: Maybe<Message_Var_Pop_Fields>;
  var_samp?: Maybe<Message_Var_Samp_Fields>;
  variance?: Maybe<Message_Variance_Fields>;
};


/** aggregate fields of "message" */
export type Message_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Message_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "message" */
export type Message_Aggregate_Order_By = {
  avg?: InputMaybe<Message_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Message_Max_Order_By>;
  min?: InputMaybe<Message_Min_Order_By>;
  stddev?: InputMaybe<Message_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Message_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Message_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Message_Sum_Order_By>;
  var_pop?: InputMaybe<Message_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Message_Var_Samp_Order_By>;
  variance?: InputMaybe<Message_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "message" */
export type Message_Arr_Rel_Insert_Input = {
  data: Array<Message_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Message_On_Conflict>;
};

/** aggregate avg on columns */
export type Message_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "message" */
export type Message_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "message". All fields are combined with a logical 'AND'. */
export type Message_Bool_Exp = {
  _and?: InputMaybe<Array<Message_Bool_Exp>>;
  _not?: InputMaybe<Message_Bool_Exp>;
  _or?: InputMaybe<Array<Message_Bool_Exp>>;
  chat_thread?: InputMaybe<Chat_Thread_Bool_Exp>;
  chat_thread_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>;
  is_read?: InputMaybe<Boolean_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  receiver?: InputMaybe<User_Bool_Exp>;
  receiver_id?: InputMaybe<Uuid_Comparison_Exp>;
  sender?: InputMaybe<User_Bool_Exp>;
  sender_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "message" */
export type Message_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'message_pkey';

/** input type for incrementing numeric columns in table "message" */
export type Message_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "message" */
export type Message_Insert_Input = {
  chat_thread?: InputMaybe<Chat_Thread_Obj_Rel_Insert_Input>;
  chat_thread_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<User_Obj_Rel_Insert_Input>;
  receiver_id?: InputMaybe<Scalars['uuid']['input']>;
  sender?: InputMaybe<User_Obj_Rel_Insert_Input>;
  sender_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Message_Max_Fields = {
  chat_thread_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  receiver_id?: Maybe<Scalars['uuid']['output']>;
  sender_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "message" */
export type Message_Max_Order_By = {
  chat_thread_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Message_Min_Fields = {
  chat_thread_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  receiver_id?: Maybe<Scalars['uuid']['output']>;
  sender_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "message" */
export type Message_Min_Order_By = {
  chat_thread_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "message" */
export type Message_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Message>;
};

/** on_conflict condition type for table "message" */
export type Message_On_Conflict = {
  constraint: Message_Constraint;
  update_columns?: Array<Message_Update_Column>;
  where?: InputMaybe<Message_Bool_Exp>;
};

/** Ordering options when selecting data from "message". */
export type Message_Order_By = {
  chat_thread?: InputMaybe<Chat_Thread_Order_By>;
  chat_thread_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_deleted?: InputMaybe<Order_By>;
  is_read?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  receiver?: InputMaybe<User_Order_By>;
  receiver_id?: InputMaybe<Order_By>;
  sender?: InputMaybe<User_Order_By>;
  sender_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: message */
export type Message_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "message" */
export type Message_Select_Column =
  /** column name */
  | 'chat_thread_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'is_deleted'
  /** column name */
  | 'is_read'
  /** column name */
  | 'message'
  /** column name */
  | 'receiver_id'
  /** column name */
  | 'sender_id'
  /** column name */
  | 'updated_at';

/** select "message_aggregate_bool_exp_bool_and_arguments_columns" columns of table "message" */
export type Message_Select_Column_Message_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_deleted'
  /** column name */
  | 'is_read';

/** select "message_aggregate_bool_exp_bool_or_arguments_columns" columns of table "message" */
export type Message_Select_Column_Message_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_deleted'
  /** column name */
  | 'is_read';

/** input type for updating data in table "message" */
export type Message_Set_Input = {
  chat_thread_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  receiver_id?: InputMaybe<Scalars['uuid']['input']>;
  sender_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Message_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "message" */
export type Message_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Message_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "message" */
export type Message_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Message_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "message" */
export type Message_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "message" */
export type Message_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Message_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Message_Stream_Cursor_Value_Input = {
  chat_thread_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  receiver_id?: InputMaybe<Scalars['uuid']['input']>;
  sender_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Message_Sum_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "message" */
export type Message_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "message" */
export type Message_Update_Column =
  /** column name */
  | 'chat_thread_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'is_deleted'
  /** column name */
  | 'is_read'
  /** column name */
  | 'message'
  /** column name */
  | 'receiver_id'
  /** column name */
  | 'sender_id'
  /** column name */
  | 'updated_at';

export type Message_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Message_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Message_Set_Input>;
  /** filter the rows which have to be updated */
  where: Message_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Message_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "message" */
export type Message_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Message_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "message" */
export type Message_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Message_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "message" */
export type Message_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "address_type" */
  delete_address_type?: Maybe<Address_Type_Mutation_Response>;
  /** delete single row from the table: "address_type" */
  delete_address_type_by_pk?: Maybe<Address_Type>;
  /** delete data from the table: "answer" */
  delete_answer?: Maybe<Answer_Mutation_Response>;
  /** delete single row from the table: "answer" */
  delete_answer_by_pk?: Maybe<Answer>;
  /** delete data from the table: "cart" */
  delete_cart?: Maybe<Cart_Mutation_Response>;
  /** delete single row from the table: "cart" */
  delete_cart_by_pk?: Maybe<Cart>;
  /** delete data from the table: "category" */
  delete_category?: Maybe<Category_Mutation_Response>;
  /** delete single row from the table: "category" */
  delete_category_by_pk?: Maybe<Category>;
  /** delete data from the table: "chat_thread" */
  delete_chat_thread?: Maybe<Chat_Thread_Mutation_Response>;
  /** delete single row from the table: "chat_thread" */
  delete_chat_thread_by_pk?: Maybe<Chat_Thread>;
  /** delete data from the table: "city" */
  delete_city?: Maybe<City_Mutation_Response>;
  /** delete single row from the table: "city" */
  delete_city_by_pk?: Maybe<City>;
  /** delete data from the table: "company" */
  delete_company?: Maybe<Company_Mutation_Response>;
  /** delete single row from the table: "company" */
  delete_company_by_pk?: Maybe<Company>;
  /** delete data from the table: "company_category" */
  delete_company_category?: Maybe<Company_Category_Mutation_Response>;
  /** delete single row from the table: "company_category" */
  delete_company_category_by_pk?: Maybe<Company_Category>;
  /** delete data from the table: "company_type" */
  delete_company_type?: Maybe<Company_Type_Mutation_Response>;
  /** delete single row from the table: "company_type" */
  delete_company_type_by_pk?: Maybe<Company_Type>;
  /** delete data from the table: "coupon" */
  delete_coupon?: Maybe<Coupon_Mutation_Response>;
  /** delete single row from the table: "coupon" */
  delete_coupon_by_pk?: Maybe<Coupon>;
  /** delete data from the table: "customizable_area" */
  delete_customizable_area?: Maybe<Customizable_Area_Mutation_Response>;
  /** delete single row from the table: "customizable_area" */
  delete_customizable_area_by_pk?: Maybe<Customizable_Area>;
  /** delete data from the table: "delivery_type" */
  delete_delivery_type?: Maybe<Delivery_Type_Mutation_Response>;
  /** delete single row from the table: "delivery_type" */
  delete_delivery_type_by_pk?: Maybe<Delivery_Type>;
  /** delete data from the table: "district" */
  delete_district?: Maybe<District_Mutation_Response>;
  /** delete single row from the table: "district" */
  delete_district_by_pk?: Maybe<District>;
  /** delete data from the table: "message" */
  delete_message?: Maybe<Message_Mutation_Response>;
  /** delete single row from the table: "message" */
  delete_message_by_pk?: Maybe<Message>;
  /** delete data from the table: "order" */
  delete_order?: Maybe<Order_Mutation_Response>;
  /** delete data from the table: "order_address" */
  delete_order_address?: Maybe<Order_Address_Mutation_Response>;
  /** delete single row from the table: "order_address" */
  delete_order_address_by_pk?: Maybe<Order_Address>;
  /** delete single row from the table: "order" */
  delete_order_by_pk?: Maybe<Order>;
  /** delete data from the table: "order_item" */
  delete_order_item?: Maybe<Order_Item_Mutation_Response>;
  /** delete single row from the table: "order_item" */
  delete_order_item_by_pk?: Maybe<Order_Item>;
  /** delete data from the table: "order_item_special_image" */
  delete_order_item_special_image?: Maybe<Order_Item_Special_Image_Mutation_Response>;
  /** delete single row from the table: "order_item_special_image" */
  delete_order_item_special_image_by_pk?: Maybe<Order_Item_Special_Image>;
  /** delete data from the table: "order_item_special_text" */
  delete_order_item_special_text?: Maybe<Order_Item_Special_Text_Mutation_Response>;
  /** delete single row from the table: "order_item_special_text" */
  delete_order_item_special_text_by_pk?: Maybe<Order_Item_Special_Text>;
  /** delete data from the table: "order_status" */
  delete_order_status?: Maybe<Order_Status_Mutation_Response>;
  /** delete single row from the table: "order_status" */
  delete_order_status_by_pk?: Maybe<Order_Status>;
  /** delete data from the table: "order_tenant" */
  delete_order_tenant?: Maybe<Order_Tenant_Mutation_Response>;
  /** delete single row from the table: "order_tenant" */
  delete_order_tenant_by_pk?: Maybe<Order_Tenant>;
  /** delete data from the table: "order_tenant_invoice" */
  delete_order_tenant_invoice?: Maybe<Order_Tenant_Invoice_Mutation_Response>;
  /** delete single row from the table: "order_tenant_invoice" */
  delete_order_tenant_invoice_by_pk?: Maybe<Order_Tenant_Invoice>;
  /** delete data from the table: "payment_status" */
  delete_payment_status?: Maybe<Payment_Status_Mutation_Response>;
  /** delete single row from the table: "payment_status" */
  delete_payment_status_by_pk?: Maybe<Payment_Status>;
  /** delete data from the table: "product" */
  delete_product?: Maybe<Product_Mutation_Response>;
  /** delete single row from the table: "product" */
  delete_product_by_pk?: Maybe<Product>;
  /** delete data from the table: "product_customizable_area" */
  delete_product_customizable_area?: Maybe<Product_Customizable_Area_Mutation_Response>;
  /** delete single row from the table: "product_customizable_area" */
  delete_product_customizable_area_by_pk?: Maybe<Product_Customizable_Area>;
  /** delete data from the table: "quarter" */
  delete_quarter?: Maybe<Quarter_Mutation_Response>;
  /** delete single row from the table: "quarter" */
  delete_quarter_by_pk?: Maybe<Quarter>;
  /** delete data from the table: "question" */
  delete_question?: Maybe<Question_Mutation_Response>;
  /** delete single row from the table: "question" */
  delete_question_by_pk?: Maybe<Question>;
  /** delete data from the table: "review" */
  delete_review?: Maybe<Review_Mutation_Response>;
  /** delete single row from the table: "review" */
  delete_review_by_pk?: Maybe<Review>;
  /** delete data from the table: "role" */
  delete_role?: Maybe<Role_Mutation_Response>;
  /** delete single row from the table: "role" */
  delete_role_by_pk?: Maybe<Role>;
  /** delete data from the table: "search_location_result" */
  delete_search_location_result?: Maybe<Search_Location_Result_Mutation_Response>;
  /** delete data from the table: "session" */
  delete_session?: Maybe<Session_Mutation_Response>;
  /** delete single row from the table: "session" */
  delete_session_by_pk?: Maybe<Session>;
  /** delete data from the table: "system_banner" */
  delete_system_banner?: Maybe<System_Banner_Mutation_Response>;
  /** delete single row from the table: "system_banner" */
  delete_system_banner_by_pk?: Maybe<System_Banner>;
  /** delete data from the table: "tenant" */
  delete_tenant?: Maybe<Tenant_Mutation_Response>;
  /** delete data from the table: "tenant_address" */
  delete_tenant_address?: Maybe<Tenant_Address_Mutation_Response>;
  /** delete single row from the table: "tenant_address" */
  delete_tenant_address_by_pk?: Maybe<Tenant_Address>;
  /** delete single row from the table: "tenant" */
  delete_tenant_by_pk?: Maybe<Tenant>;
  /** delete data from the table: "tenant_category" */
  delete_tenant_category?: Maybe<Tenant_Category_Mutation_Response>;
  /** delete single row from the table: "tenant_category" */
  delete_tenant_category_by_pk?: Maybe<Tenant_Category>;
  /** delete data from the table: "tenant_shipping_place" */
  delete_tenant_shipping_place?: Maybe<Tenant_Shipping_Place_Mutation_Response>;
  /** delete single row from the table: "tenant_shipping_place" */
  delete_tenant_shipping_place_by_pk?: Maybe<Tenant_Shipping_Place>;
  /** delete data from the table: "ticket" */
  delete_ticket?: Maybe<Ticket_Mutation_Response>;
  /** delete data from the table: "ticket_answer" */
  delete_ticket_answer?: Maybe<Ticket_Answer_Mutation_Response>;
  /** delete single row from the table: "ticket_answer" */
  delete_ticket_answer_by_pk?: Maybe<Ticket_Answer>;
  /** delete single row from the table: "ticket" */
  delete_ticket_by_pk?: Maybe<Ticket>;
  /** delete data from the table: "ticket_status" */
  delete_ticket_status?: Maybe<Ticket_Status_Mutation_Response>;
  /** delete single row from the table: "ticket_status" */
  delete_ticket_status_by_pk?: Maybe<Ticket_Status>;
  /** delete data from the table: "transaction" */
  delete_transaction?: Maybe<Transaction_Mutation_Response>;
  /** delete single row from the table: "transaction" */
  delete_transaction_by_pk?: Maybe<Transaction>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete data from the table: "user_address" */
  delete_user_address?: Maybe<User_Address_Mutation_Response>;
  /** delete single row from the table: "user_address" */
  delete_user_address_by_pk?: Maybe<User_Address>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** delete data from the table: "user_coupon" */
  delete_user_coupon?: Maybe<User_Coupon_Mutation_Response>;
  /** delete single row from the table: "user_coupon" */
  delete_user_coupon_by_pk?: Maybe<User_Coupon>;
  /** delete data from the table: "user_favorite" */
  delete_user_favorite?: Maybe<User_Favorite_Mutation_Response>;
  /** delete single row from the table: "user_favorite" */
  delete_user_favorite_by_pk?: Maybe<User_Favorite>;
  email_verify?: Maybe<EmailVerifyOutput>;
  /** forgot_password */
  forgot_password?: Maybe<ForgotPasswordOutput>;
  /** insert data into the table: "address_type" */
  insert_address_type?: Maybe<Address_Type_Mutation_Response>;
  /** insert a single row into the table: "address_type" */
  insert_address_type_one?: Maybe<Address_Type>;
  /** insert data into the table: "answer" */
  insert_answer?: Maybe<Answer_Mutation_Response>;
  /** insert a single row into the table: "answer" */
  insert_answer_one?: Maybe<Answer>;
  /** insert data into the table: "cart" */
  insert_cart?: Maybe<Cart_Mutation_Response>;
  /** insert a single row into the table: "cart" */
  insert_cart_one?: Maybe<Cart>;
  /** insert data into the table: "category" */
  insert_category?: Maybe<Category_Mutation_Response>;
  /** insert a single row into the table: "category" */
  insert_category_one?: Maybe<Category>;
  /** insert data into the table: "chat_thread" */
  insert_chat_thread?: Maybe<Chat_Thread_Mutation_Response>;
  /** insert a single row into the table: "chat_thread" */
  insert_chat_thread_one?: Maybe<Chat_Thread>;
  /** insert data into the table: "city" */
  insert_city?: Maybe<City_Mutation_Response>;
  /** insert a single row into the table: "city" */
  insert_city_one?: Maybe<City>;
  /** insert data into the table: "company" */
  insert_company?: Maybe<Company_Mutation_Response>;
  /** insert data into the table: "company_category" */
  insert_company_category?: Maybe<Company_Category_Mutation_Response>;
  /** insert a single row into the table: "company_category" */
  insert_company_category_one?: Maybe<Company_Category>;
  /** insert a single row into the table: "company" */
  insert_company_one?: Maybe<Company>;
  /** insert data into the table: "company_type" */
  insert_company_type?: Maybe<Company_Type_Mutation_Response>;
  /** insert a single row into the table: "company_type" */
  insert_company_type_one?: Maybe<Company_Type>;
  /** insert data into the table: "coupon" */
  insert_coupon?: Maybe<Coupon_Mutation_Response>;
  /** insert a single row into the table: "coupon" */
  insert_coupon_one?: Maybe<Coupon>;
  /** insert data into the table: "customizable_area" */
  insert_customizable_area?: Maybe<Customizable_Area_Mutation_Response>;
  /** insert a single row into the table: "customizable_area" */
  insert_customizable_area_one?: Maybe<Customizable_Area>;
  /** insert data into the table: "delivery_type" */
  insert_delivery_type?: Maybe<Delivery_Type_Mutation_Response>;
  /** insert a single row into the table: "delivery_type" */
  insert_delivery_type_one?: Maybe<Delivery_Type>;
  /** insert data into the table: "district" */
  insert_district?: Maybe<District_Mutation_Response>;
  /** insert a single row into the table: "district" */
  insert_district_one?: Maybe<District>;
  /** insert data into the table: "message" */
  insert_message?: Maybe<Message_Mutation_Response>;
  /** insert a single row into the table: "message" */
  insert_message_one?: Maybe<Message>;
  /** insert data into the table: "order" */
  insert_order?: Maybe<Order_Mutation_Response>;
  /** insert data into the table: "order_address" */
  insert_order_address?: Maybe<Order_Address_Mutation_Response>;
  /** insert a single row into the table: "order_address" */
  insert_order_address_one?: Maybe<Order_Address>;
  /** insert data into the table: "order_item" */
  insert_order_item?: Maybe<Order_Item_Mutation_Response>;
  /** insert a single row into the table: "order_item" */
  insert_order_item_one?: Maybe<Order_Item>;
  /** insert data into the table: "order_item_special_image" */
  insert_order_item_special_image?: Maybe<Order_Item_Special_Image_Mutation_Response>;
  /** insert a single row into the table: "order_item_special_image" */
  insert_order_item_special_image_one?: Maybe<Order_Item_Special_Image>;
  /** insert data into the table: "order_item_special_text" */
  insert_order_item_special_text?: Maybe<Order_Item_Special_Text_Mutation_Response>;
  /** insert a single row into the table: "order_item_special_text" */
  insert_order_item_special_text_one?: Maybe<Order_Item_Special_Text>;
  /** insert a single row into the table: "order" */
  insert_order_one?: Maybe<Order>;
  /** insert data into the table: "order_status" */
  insert_order_status?: Maybe<Order_Status_Mutation_Response>;
  /** insert a single row into the table: "order_status" */
  insert_order_status_one?: Maybe<Order_Status>;
  /** insert data into the table: "order_tenant" */
  insert_order_tenant?: Maybe<Order_Tenant_Mutation_Response>;
  /** insert data into the table: "order_tenant_invoice" */
  insert_order_tenant_invoice?: Maybe<Order_Tenant_Invoice_Mutation_Response>;
  /** insert a single row into the table: "order_tenant_invoice" */
  insert_order_tenant_invoice_one?: Maybe<Order_Tenant_Invoice>;
  /** insert a single row into the table: "order_tenant" */
  insert_order_tenant_one?: Maybe<Order_Tenant>;
  /** insert data into the table: "payment_status" */
  insert_payment_status?: Maybe<Payment_Status_Mutation_Response>;
  /** insert a single row into the table: "payment_status" */
  insert_payment_status_one?: Maybe<Payment_Status>;
  /** insert data into the table: "product" */
  insert_product?: Maybe<Product_Mutation_Response>;
  /** insert data into the table: "product_customizable_area" */
  insert_product_customizable_area?: Maybe<Product_Customizable_Area_Mutation_Response>;
  /** insert a single row into the table: "product_customizable_area" */
  insert_product_customizable_area_one?: Maybe<Product_Customizable_Area>;
  /** insert a single row into the table: "product" */
  insert_product_one?: Maybe<Product>;
  /** insert data into the table: "quarter" */
  insert_quarter?: Maybe<Quarter_Mutation_Response>;
  /** insert a single row into the table: "quarter" */
  insert_quarter_one?: Maybe<Quarter>;
  /** insert data into the table: "question" */
  insert_question?: Maybe<Question_Mutation_Response>;
  /** insert a single row into the table: "question" */
  insert_question_one?: Maybe<Question>;
  /** insert data into the table: "review" */
  insert_review?: Maybe<Review_Mutation_Response>;
  /** insert a single row into the table: "review" */
  insert_review_one?: Maybe<Review>;
  /** insert data into the table: "role" */
  insert_role?: Maybe<Role_Mutation_Response>;
  /** insert a single row into the table: "role" */
  insert_role_one?: Maybe<Role>;
  /** insert data into the table: "search_location_result" */
  insert_search_location_result?: Maybe<Search_Location_Result_Mutation_Response>;
  /** insert a single row into the table: "search_location_result" */
  insert_search_location_result_one?: Maybe<Search_Location_Result>;
  /** insert data into the table: "session" */
  insert_session?: Maybe<Session_Mutation_Response>;
  /** insert a single row into the table: "session" */
  insert_session_one?: Maybe<Session>;
  /** insert data into the table: "system_banner" */
  insert_system_banner?: Maybe<System_Banner_Mutation_Response>;
  /** insert a single row into the table: "system_banner" */
  insert_system_banner_one?: Maybe<System_Banner>;
  /** insert data into the table: "tenant" */
  insert_tenant?: Maybe<Tenant_Mutation_Response>;
  /** insert data into the table: "tenant_address" */
  insert_tenant_address?: Maybe<Tenant_Address_Mutation_Response>;
  /** insert a single row into the table: "tenant_address" */
  insert_tenant_address_one?: Maybe<Tenant_Address>;
  /** insert data into the table: "tenant_category" */
  insert_tenant_category?: Maybe<Tenant_Category_Mutation_Response>;
  /** insert a single row into the table: "tenant_category" */
  insert_tenant_category_one?: Maybe<Tenant_Category>;
  /** insert a single row into the table: "tenant" */
  insert_tenant_one?: Maybe<Tenant>;
  /** insert data into the table: "tenant_shipping_place" */
  insert_tenant_shipping_place?: Maybe<Tenant_Shipping_Place_Mutation_Response>;
  /** insert a single row into the table: "tenant_shipping_place" */
  insert_tenant_shipping_place_one?: Maybe<Tenant_Shipping_Place>;
  /** insert data into the table: "ticket" */
  insert_ticket?: Maybe<Ticket_Mutation_Response>;
  /** insert data into the table: "ticket_answer" */
  insert_ticket_answer?: Maybe<Ticket_Answer_Mutation_Response>;
  /** insert a single row into the table: "ticket_answer" */
  insert_ticket_answer_one?: Maybe<Ticket_Answer>;
  /** insert a single row into the table: "ticket" */
  insert_ticket_one?: Maybe<Ticket>;
  /** insert data into the table: "ticket_status" */
  insert_ticket_status?: Maybe<Ticket_Status_Mutation_Response>;
  /** insert a single row into the table: "ticket_status" */
  insert_ticket_status_one?: Maybe<Ticket_Status>;
  /** insert data into the table: "transaction" */
  insert_transaction?: Maybe<Transaction_Mutation_Response>;
  /** insert a single row into the table: "transaction" */
  insert_transaction_one?: Maybe<Transaction>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert data into the table: "user_address" */
  insert_user_address?: Maybe<User_Address_Mutation_Response>;
  /** insert a single row into the table: "user_address" */
  insert_user_address_one?: Maybe<User_Address>;
  /** insert data into the table: "user_coupon" */
  insert_user_coupon?: Maybe<User_Coupon_Mutation_Response>;
  /** insert a single row into the table: "user_coupon" */
  insert_user_coupon_one?: Maybe<User_Coupon>;
  /** insert data into the table: "user_favorite" */
  insert_user_favorite?: Maybe<User_Favorite_Mutation_Response>;
  /** insert a single row into the table: "user_favorite" */
  insert_user_favorite_one?: Maybe<User_Favorite>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  login?: Maybe<LoginOutput>;
  refresh_token?: Maybe<RefreshTokenOutput>;
  register?: Maybe<RegisterOutput>;
  reset_password?: Maybe<ResetPasswordOutput>;
  /** update data of the table: "address_type" */
  update_address_type?: Maybe<Address_Type_Mutation_Response>;
  /** update single row of the table: "address_type" */
  update_address_type_by_pk?: Maybe<Address_Type>;
  /** update multiples rows of table: "address_type" */
  update_address_type_many?: Maybe<Array<Maybe<Address_Type_Mutation_Response>>>;
  /** update data of the table: "answer" */
  update_answer?: Maybe<Answer_Mutation_Response>;
  /** update single row of the table: "answer" */
  update_answer_by_pk?: Maybe<Answer>;
  /** update multiples rows of table: "answer" */
  update_answer_many?: Maybe<Array<Maybe<Answer_Mutation_Response>>>;
  /** update data of the table: "cart" */
  update_cart?: Maybe<Cart_Mutation_Response>;
  /** update single row of the table: "cart" */
  update_cart_by_pk?: Maybe<Cart>;
  /** update multiples rows of table: "cart" */
  update_cart_many?: Maybe<Array<Maybe<Cart_Mutation_Response>>>;
  /** update data of the table: "category" */
  update_category?: Maybe<Category_Mutation_Response>;
  /** update single row of the table: "category" */
  update_category_by_pk?: Maybe<Category>;
  /** update multiples rows of table: "category" */
  update_category_many?: Maybe<Array<Maybe<Category_Mutation_Response>>>;
  /** update data of the table: "chat_thread" */
  update_chat_thread?: Maybe<Chat_Thread_Mutation_Response>;
  /** update single row of the table: "chat_thread" */
  update_chat_thread_by_pk?: Maybe<Chat_Thread>;
  /** update multiples rows of table: "chat_thread" */
  update_chat_thread_many?: Maybe<Array<Maybe<Chat_Thread_Mutation_Response>>>;
  /** update data of the table: "city" */
  update_city?: Maybe<City_Mutation_Response>;
  /** update single row of the table: "city" */
  update_city_by_pk?: Maybe<City>;
  /** update multiples rows of table: "city" */
  update_city_many?: Maybe<Array<Maybe<City_Mutation_Response>>>;
  /** update data of the table: "company" */
  update_company?: Maybe<Company_Mutation_Response>;
  /** update single row of the table: "company" */
  update_company_by_pk?: Maybe<Company>;
  /** update data of the table: "company_category" */
  update_company_category?: Maybe<Company_Category_Mutation_Response>;
  /** update single row of the table: "company_category" */
  update_company_category_by_pk?: Maybe<Company_Category>;
  /** update multiples rows of table: "company_category" */
  update_company_category_many?: Maybe<Array<Maybe<Company_Category_Mutation_Response>>>;
  /** update multiples rows of table: "company" */
  update_company_many?: Maybe<Array<Maybe<Company_Mutation_Response>>>;
  /** update data of the table: "company_type" */
  update_company_type?: Maybe<Company_Type_Mutation_Response>;
  /** update single row of the table: "company_type" */
  update_company_type_by_pk?: Maybe<Company_Type>;
  /** update multiples rows of table: "company_type" */
  update_company_type_many?: Maybe<Array<Maybe<Company_Type_Mutation_Response>>>;
  /** update data of the table: "coupon" */
  update_coupon?: Maybe<Coupon_Mutation_Response>;
  /** update single row of the table: "coupon" */
  update_coupon_by_pk?: Maybe<Coupon>;
  /** update multiples rows of table: "coupon" */
  update_coupon_many?: Maybe<Array<Maybe<Coupon_Mutation_Response>>>;
  /** update data of the table: "customizable_area" */
  update_customizable_area?: Maybe<Customizable_Area_Mutation_Response>;
  /** update single row of the table: "customizable_area" */
  update_customizable_area_by_pk?: Maybe<Customizable_Area>;
  /** update multiples rows of table: "customizable_area" */
  update_customizable_area_many?: Maybe<Array<Maybe<Customizable_Area_Mutation_Response>>>;
  /** update data of the table: "delivery_type" */
  update_delivery_type?: Maybe<Delivery_Type_Mutation_Response>;
  /** update single row of the table: "delivery_type" */
  update_delivery_type_by_pk?: Maybe<Delivery_Type>;
  /** update multiples rows of table: "delivery_type" */
  update_delivery_type_many?: Maybe<Array<Maybe<Delivery_Type_Mutation_Response>>>;
  /** update data of the table: "district" */
  update_district?: Maybe<District_Mutation_Response>;
  /** update single row of the table: "district" */
  update_district_by_pk?: Maybe<District>;
  /** update multiples rows of table: "district" */
  update_district_many?: Maybe<Array<Maybe<District_Mutation_Response>>>;
  /** update data of the table: "message" */
  update_message?: Maybe<Message_Mutation_Response>;
  /** update single row of the table: "message" */
  update_message_by_pk?: Maybe<Message>;
  /** update multiples rows of table: "message" */
  update_message_many?: Maybe<Array<Maybe<Message_Mutation_Response>>>;
  /** update data of the table: "order" */
  update_order?: Maybe<Order_Mutation_Response>;
  /** update data of the table: "order_address" */
  update_order_address?: Maybe<Order_Address_Mutation_Response>;
  /** update single row of the table: "order_address" */
  update_order_address_by_pk?: Maybe<Order_Address>;
  /** update multiples rows of table: "order_address" */
  update_order_address_many?: Maybe<Array<Maybe<Order_Address_Mutation_Response>>>;
  /** update single row of the table: "order" */
  update_order_by_pk?: Maybe<Order>;
  /** update data of the table: "order_item" */
  update_order_item?: Maybe<Order_Item_Mutation_Response>;
  /** update single row of the table: "order_item" */
  update_order_item_by_pk?: Maybe<Order_Item>;
  /** update multiples rows of table: "order_item" */
  update_order_item_many?: Maybe<Array<Maybe<Order_Item_Mutation_Response>>>;
  /** update data of the table: "order_item_special_image" */
  update_order_item_special_image?: Maybe<Order_Item_Special_Image_Mutation_Response>;
  /** update single row of the table: "order_item_special_image" */
  update_order_item_special_image_by_pk?: Maybe<Order_Item_Special_Image>;
  /** update multiples rows of table: "order_item_special_image" */
  update_order_item_special_image_many?: Maybe<Array<Maybe<Order_Item_Special_Image_Mutation_Response>>>;
  /** update data of the table: "order_item_special_text" */
  update_order_item_special_text?: Maybe<Order_Item_Special_Text_Mutation_Response>;
  /** update single row of the table: "order_item_special_text" */
  update_order_item_special_text_by_pk?: Maybe<Order_Item_Special_Text>;
  /** update multiples rows of table: "order_item_special_text" */
  update_order_item_special_text_many?: Maybe<Array<Maybe<Order_Item_Special_Text_Mutation_Response>>>;
  /** update multiples rows of table: "order" */
  update_order_many?: Maybe<Array<Maybe<Order_Mutation_Response>>>;
  /** update data of the table: "order_status" */
  update_order_status?: Maybe<Order_Status_Mutation_Response>;
  /** update single row of the table: "order_status" */
  update_order_status_by_pk?: Maybe<Order_Status>;
  /** update multiples rows of table: "order_status" */
  update_order_status_many?: Maybe<Array<Maybe<Order_Status_Mutation_Response>>>;
  /** update data of the table: "order_tenant" */
  update_order_tenant?: Maybe<Order_Tenant_Mutation_Response>;
  /** update single row of the table: "order_tenant" */
  update_order_tenant_by_pk?: Maybe<Order_Tenant>;
  /** update data of the table: "order_tenant_invoice" */
  update_order_tenant_invoice?: Maybe<Order_Tenant_Invoice_Mutation_Response>;
  /** update single row of the table: "order_tenant_invoice" */
  update_order_tenant_invoice_by_pk?: Maybe<Order_Tenant_Invoice>;
  /** update multiples rows of table: "order_tenant_invoice" */
  update_order_tenant_invoice_many?: Maybe<Array<Maybe<Order_Tenant_Invoice_Mutation_Response>>>;
  /** update multiples rows of table: "order_tenant" */
  update_order_tenant_many?: Maybe<Array<Maybe<Order_Tenant_Mutation_Response>>>;
  /** update data of the table: "payment_status" */
  update_payment_status?: Maybe<Payment_Status_Mutation_Response>;
  /** update single row of the table: "payment_status" */
  update_payment_status_by_pk?: Maybe<Payment_Status>;
  /** update multiples rows of table: "payment_status" */
  update_payment_status_many?: Maybe<Array<Maybe<Payment_Status_Mutation_Response>>>;
  /** update data of the table: "product" */
  update_product?: Maybe<Product_Mutation_Response>;
  /** update single row of the table: "product" */
  update_product_by_pk?: Maybe<Product>;
  /** update data of the table: "product_customizable_area" */
  update_product_customizable_area?: Maybe<Product_Customizable_Area_Mutation_Response>;
  /** update single row of the table: "product_customizable_area" */
  update_product_customizable_area_by_pk?: Maybe<Product_Customizable_Area>;
  /** update multiples rows of table: "product_customizable_area" */
  update_product_customizable_area_many?: Maybe<Array<Maybe<Product_Customizable_Area_Mutation_Response>>>;
  /** update multiples rows of table: "product" */
  update_product_many?: Maybe<Array<Maybe<Product_Mutation_Response>>>;
  /** update data of the table: "quarter" */
  update_quarter?: Maybe<Quarter_Mutation_Response>;
  /** update single row of the table: "quarter" */
  update_quarter_by_pk?: Maybe<Quarter>;
  /** update multiples rows of table: "quarter" */
  update_quarter_many?: Maybe<Array<Maybe<Quarter_Mutation_Response>>>;
  /** update data of the table: "question" */
  update_question?: Maybe<Question_Mutation_Response>;
  /** update single row of the table: "question" */
  update_question_by_pk?: Maybe<Question>;
  /** update multiples rows of table: "question" */
  update_question_many?: Maybe<Array<Maybe<Question_Mutation_Response>>>;
  /** update data of the table: "review" */
  update_review?: Maybe<Review_Mutation_Response>;
  /** update single row of the table: "review" */
  update_review_by_pk?: Maybe<Review>;
  /** update multiples rows of table: "review" */
  update_review_many?: Maybe<Array<Maybe<Review_Mutation_Response>>>;
  /** update data of the table: "role" */
  update_role?: Maybe<Role_Mutation_Response>;
  /** update single row of the table: "role" */
  update_role_by_pk?: Maybe<Role>;
  /** update multiples rows of table: "role" */
  update_role_many?: Maybe<Array<Maybe<Role_Mutation_Response>>>;
  /** update data of the table: "search_location_result" */
  update_search_location_result?: Maybe<Search_Location_Result_Mutation_Response>;
  /** update multiples rows of table: "search_location_result" */
  update_search_location_result_many?: Maybe<Array<Maybe<Search_Location_Result_Mutation_Response>>>;
  /** update data of the table: "session" */
  update_session?: Maybe<Session_Mutation_Response>;
  /** update single row of the table: "session" */
  update_session_by_pk?: Maybe<Session>;
  /** update multiples rows of table: "session" */
  update_session_many?: Maybe<Array<Maybe<Session_Mutation_Response>>>;
  /** update data of the table: "system_banner" */
  update_system_banner?: Maybe<System_Banner_Mutation_Response>;
  /** update single row of the table: "system_banner" */
  update_system_banner_by_pk?: Maybe<System_Banner>;
  /** update multiples rows of table: "system_banner" */
  update_system_banner_many?: Maybe<Array<Maybe<System_Banner_Mutation_Response>>>;
  /** update data of the table: "tenant" */
  update_tenant?: Maybe<Tenant_Mutation_Response>;
  /** update data of the table: "tenant_address" */
  update_tenant_address?: Maybe<Tenant_Address_Mutation_Response>;
  /** update single row of the table: "tenant_address" */
  update_tenant_address_by_pk?: Maybe<Tenant_Address>;
  /** update multiples rows of table: "tenant_address" */
  update_tenant_address_many?: Maybe<Array<Maybe<Tenant_Address_Mutation_Response>>>;
  /** update single row of the table: "tenant" */
  update_tenant_by_pk?: Maybe<Tenant>;
  /** update data of the table: "tenant_category" */
  update_tenant_category?: Maybe<Tenant_Category_Mutation_Response>;
  /** update single row of the table: "tenant_category" */
  update_tenant_category_by_pk?: Maybe<Tenant_Category>;
  /** update multiples rows of table: "tenant_category" */
  update_tenant_category_many?: Maybe<Array<Maybe<Tenant_Category_Mutation_Response>>>;
  /** update multiples rows of table: "tenant" */
  update_tenant_many?: Maybe<Array<Maybe<Tenant_Mutation_Response>>>;
  /** update data of the table: "tenant_shipping_place" */
  update_tenant_shipping_place?: Maybe<Tenant_Shipping_Place_Mutation_Response>;
  /** update single row of the table: "tenant_shipping_place" */
  update_tenant_shipping_place_by_pk?: Maybe<Tenant_Shipping_Place>;
  /** update multiples rows of table: "tenant_shipping_place" */
  update_tenant_shipping_place_many?: Maybe<Array<Maybe<Tenant_Shipping_Place_Mutation_Response>>>;
  /** update data of the table: "ticket" */
  update_ticket?: Maybe<Ticket_Mutation_Response>;
  /** update data of the table: "ticket_answer" */
  update_ticket_answer?: Maybe<Ticket_Answer_Mutation_Response>;
  /** update single row of the table: "ticket_answer" */
  update_ticket_answer_by_pk?: Maybe<Ticket_Answer>;
  /** update multiples rows of table: "ticket_answer" */
  update_ticket_answer_many?: Maybe<Array<Maybe<Ticket_Answer_Mutation_Response>>>;
  /** update single row of the table: "ticket" */
  update_ticket_by_pk?: Maybe<Ticket>;
  /** update multiples rows of table: "ticket" */
  update_ticket_many?: Maybe<Array<Maybe<Ticket_Mutation_Response>>>;
  /** update data of the table: "ticket_status" */
  update_ticket_status?: Maybe<Ticket_Status_Mutation_Response>;
  /** update single row of the table: "ticket_status" */
  update_ticket_status_by_pk?: Maybe<Ticket_Status>;
  /** update multiples rows of table: "ticket_status" */
  update_ticket_status_many?: Maybe<Array<Maybe<Ticket_Status_Mutation_Response>>>;
  /** update data of the table: "transaction" */
  update_transaction?: Maybe<Transaction_Mutation_Response>;
  /** update single row of the table: "transaction" */
  update_transaction_by_pk?: Maybe<Transaction>;
  /** update multiples rows of table: "transaction" */
  update_transaction_many?: Maybe<Array<Maybe<Transaction_Mutation_Response>>>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update data of the table: "user_address" */
  update_user_address?: Maybe<User_Address_Mutation_Response>;
  /** update single row of the table: "user_address" */
  update_user_address_by_pk?: Maybe<User_Address>;
  /** update multiples rows of table: "user_address" */
  update_user_address_many?: Maybe<Array<Maybe<User_Address_Mutation_Response>>>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update data of the table: "user_coupon" */
  update_user_coupon?: Maybe<User_Coupon_Mutation_Response>;
  /** update single row of the table: "user_coupon" */
  update_user_coupon_by_pk?: Maybe<User_Coupon>;
  /** update multiples rows of table: "user_coupon" */
  update_user_coupon_many?: Maybe<Array<Maybe<User_Coupon_Mutation_Response>>>;
  /** update data of the table: "user_favorite" */
  update_user_favorite?: Maybe<User_Favorite_Mutation_Response>;
  /** update single row of the table: "user_favorite" */
  update_user_favorite_by_pk?: Maybe<User_Favorite>;
  /** update multiples rows of table: "user_favorite" */
  update_user_favorite_many?: Maybe<Array<Maybe<User_Favorite_Mutation_Response>>>;
  /** update multiples rows of table: "user" */
  update_user_many?: Maybe<Array<Maybe<User_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Address_TypeArgs = {
  where: Address_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Address_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_AnswerArgs = {
  where: Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Answer_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CartArgs = {
  where: Cart_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Cart_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CategoryArgs = {
  where: Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Category_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Chat_ThreadArgs = {
  where: Chat_Thread_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chat_Thread_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CityArgs = {
  where: City_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_City_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CompanyArgs = {
  where: Company_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Company_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Company_CategoryArgs = {
  where: Company_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Company_Category_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Company_TypeArgs = {
  where: Company_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Company_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CouponArgs = {
  where: Coupon_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Coupon_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Customizable_AreaArgs = {
  where: Customizable_Area_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Customizable_Area_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Delivery_TypeArgs = {
  where: Delivery_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Delivery_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_DistrictArgs = {
  where: District_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_District_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_MessageArgs = {
  where: Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Message_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_OrderArgs = {
  where: Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_AddressArgs = {
  where: Order_Address_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Address_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Order_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Order_ItemArgs = {
  where: Order_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Item_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Order_Item_Special_ImageArgs = {
  where: Order_Item_Special_Image_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Item_Special_Image_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Order_Item_Special_TextArgs = {
  where: Order_Item_Special_Text_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Item_Special_Text_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Order_StatusArgs = {
  where: Order_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Order_TenantArgs = {
  where: Order_Tenant_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Tenant_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Order_Tenant_InvoiceArgs = {
  where: Order_Tenant_Invoice_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_Tenant_Invoice_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Payment_StatusArgs = {
  where: Payment_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Payment_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ProductArgs = {
  where: Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Product_Customizable_AreaArgs = {
  where: Product_Customizable_Area_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Product_Customizable_Area_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_QuarterArgs = {
  where: Quarter_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quarter_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_QuestionArgs = {
  where: Question_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Question_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ReviewArgs = {
  where: Review_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Review_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_RoleArgs = {
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Role_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Search_Location_ResultArgs = {
  where: Search_Location_Result_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_SessionArgs = {
  where: Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Session_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_System_BannerArgs = {
  where: System_Banner_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_System_Banner_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TenantArgs = {
  where: Tenant_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tenant_AddressArgs = {
  where: Tenant_Address_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tenant_Address_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Tenant_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Tenant_CategoryArgs = {
  where: Tenant_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tenant_Category_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Tenant_Shipping_PlaceArgs = {
  where: Tenant_Shipping_Place_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tenant_Shipping_Place_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TicketArgs = {
  where: Ticket_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ticket_AnswerArgs = {
  where: Ticket_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ticket_Answer_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Ticket_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Ticket_StatusArgs = {
  where: Ticket_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ticket_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TransactionArgs = {
  where: Transaction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transaction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_AddressArgs = {
  where: User_Address_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Address_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_CouponArgs = {
  where: User_Coupon_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Coupon_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_FavoriteArgs = {
  where: User_Favorite_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Favorite_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootEmail_VerifyArgs = {
  args: EmailVerifyInput;
};


/** mutation root */
export type Mutation_RootForgot_PasswordArgs = {
  args: ForgotPasswordInput;
};


/** mutation root */
export type Mutation_RootInsert_Address_TypeArgs = {
  objects: Array<Address_Type_Insert_Input>;
  on_conflict?: InputMaybe<Address_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Address_Type_OneArgs = {
  object: Address_Type_Insert_Input;
  on_conflict?: InputMaybe<Address_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AnswerArgs = {
  objects: Array<Answer_Insert_Input>;
  on_conflict?: InputMaybe<Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Answer_OneArgs = {
  object: Answer_Insert_Input;
  on_conflict?: InputMaybe<Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CartArgs = {
  objects: Array<Cart_Insert_Input>;
  on_conflict?: InputMaybe<Cart_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Cart_OneArgs = {
  object: Cart_Insert_Input;
  on_conflict?: InputMaybe<Cart_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CategoryArgs = {
  objects: Array<Category_Insert_Input>;
  on_conflict?: InputMaybe<Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Category_OneArgs = {
  object: Category_Insert_Input;
  on_conflict?: InputMaybe<Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_ThreadArgs = {
  objects: Array<Chat_Thread_Insert_Input>;
  on_conflict?: InputMaybe<Chat_Thread_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_Thread_OneArgs = {
  object: Chat_Thread_Insert_Input;
  on_conflict?: InputMaybe<Chat_Thread_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CityArgs = {
  objects: Array<City_Insert_Input>;
  on_conflict?: InputMaybe<City_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_City_OneArgs = {
  object: City_Insert_Input;
  on_conflict?: InputMaybe<City_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompanyArgs = {
  objects: Array<Company_Insert_Input>;
  on_conflict?: InputMaybe<Company_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Company_CategoryArgs = {
  objects: Array<Company_Category_Insert_Input>;
  on_conflict?: InputMaybe<Company_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Company_Category_OneArgs = {
  object: Company_Category_Insert_Input;
  on_conflict?: InputMaybe<Company_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Company_OneArgs = {
  object: Company_Insert_Input;
  on_conflict?: InputMaybe<Company_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Company_TypeArgs = {
  objects: Array<Company_Type_Insert_Input>;
  on_conflict?: InputMaybe<Company_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Company_Type_OneArgs = {
  object: Company_Type_Insert_Input;
  on_conflict?: InputMaybe<Company_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CouponArgs = {
  objects: Array<Coupon_Insert_Input>;
  on_conflict?: InputMaybe<Coupon_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Coupon_OneArgs = {
  object: Coupon_Insert_Input;
  on_conflict?: InputMaybe<Coupon_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Customizable_AreaArgs = {
  objects: Array<Customizable_Area_Insert_Input>;
  on_conflict?: InputMaybe<Customizable_Area_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Customizable_Area_OneArgs = {
  object: Customizable_Area_Insert_Input;
  on_conflict?: InputMaybe<Customizable_Area_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Delivery_TypeArgs = {
  objects: Array<Delivery_Type_Insert_Input>;
  on_conflict?: InputMaybe<Delivery_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Delivery_Type_OneArgs = {
  object: Delivery_Type_Insert_Input;
  on_conflict?: InputMaybe<Delivery_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DistrictArgs = {
  objects: Array<District_Insert_Input>;
  on_conflict?: InputMaybe<District_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_District_OneArgs = {
  object: District_Insert_Input;
  on_conflict?: InputMaybe<District_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MessageArgs = {
  objects: Array<Message_Insert_Input>;
  on_conflict?: InputMaybe<Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Message_OneArgs = {
  object: Message_Insert_Input;
  on_conflict?: InputMaybe<Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrderArgs = {
  objects: Array<Order_Insert_Input>;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_AddressArgs = {
  objects: Array<Order_Address_Insert_Input>;
  on_conflict?: InputMaybe<Order_Address_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Address_OneArgs = {
  object: Order_Address_Insert_Input;
  on_conflict?: InputMaybe<Order_Address_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_ItemArgs = {
  objects: Array<Order_Item_Insert_Input>;
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Item_OneArgs = {
  object: Order_Item_Insert_Input;
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Item_Special_ImageArgs = {
  objects: Array<Order_Item_Special_Image_Insert_Input>;
  on_conflict?: InputMaybe<Order_Item_Special_Image_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Item_Special_Image_OneArgs = {
  object: Order_Item_Special_Image_Insert_Input;
  on_conflict?: InputMaybe<Order_Item_Special_Image_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Item_Special_TextArgs = {
  objects: Array<Order_Item_Special_Text_Insert_Input>;
  on_conflict?: InputMaybe<Order_Item_Special_Text_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Item_Special_Text_OneArgs = {
  object: Order_Item_Special_Text_Insert_Input;
  on_conflict?: InputMaybe<Order_Item_Special_Text_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_OneArgs = {
  object: Order_Insert_Input;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_StatusArgs = {
  objects: Array<Order_Status_Insert_Input>;
  on_conflict?: InputMaybe<Order_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Status_OneArgs = {
  object: Order_Status_Insert_Input;
  on_conflict?: InputMaybe<Order_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_TenantArgs = {
  objects: Array<Order_Tenant_Insert_Input>;
  on_conflict?: InputMaybe<Order_Tenant_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Tenant_InvoiceArgs = {
  objects: Array<Order_Tenant_Invoice_Insert_Input>;
  on_conflict?: InputMaybe<Order_Tenant_Invoice_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Tenant_Invoice_OneArgs = {
  object: Order_Tenant_Invoice_Insert_Input;
  on_conflict?: InputMaybe<Order_Tenant_Invoice_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_Tenant_OneArgs = {
  object: Order_Tenant_Insert_Input;
  on_conflict?: InputMaybe<Order_Tenant_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payment_StatusArgs = {
  objects: Array<Payment_Status_Insert_Input>;
  on_conflict?: InputMaybe<Payment_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payment_Status_OneArgs = {
  object: Payment_Status_Insert_Input;
  on_conflict?: InputMaybe<Payment_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductArgs = {
  objects: Array<Product_Insert_Input>;
  on_conflict?: InputMaybe<Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Customizable_AreaArgs = {
  objects: Array<Product_Customizable_Area_Insert_Input>;
  on_conflict?: InputMaybe<Product_Customizable_Area_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_Customizable_Area_OneArgs = {
  object: Product_Customizable_Area_Insert_Input;
  on_conflict?: InputMaybe<Product_Customizable_Area_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Product_OneArgs = {
  object: Product_Insert_Input;
  on_conflict?: InputMaybe<Product_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuarterArgs = {
  objects: Array<Quarter_Insert_Input>;
  on_conflict?: InputMaybe<Quarter_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quarter_OneArgs = {
  object: Quarter_Insert_Input;
  on_conflict?: InputMaybe<Quarter_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestionArgs = {
  objects: Array<Question_Insert_Input>;
  on_conflict?: InputMaybe<Question_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Question_OneArgs = {
  object: Question_Insert_Input;
  on_conflict?: InputMaybe<Question_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ReviewArgs = {
  objects: Array<Review_Insert_Input>;
  on_conflict?: InputMaybe<Review_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Review_OneArgs = {
  object: Review_Insert_Input;
  on_conflict?: InputMaybe<Review_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RoleArgs = {
  objects: Array<Role_Insert_Input>;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Role_OneArgs = {
  object: Role_Insert_Input;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Search_Location_ResultArgs = {
  objects: Array<Search_Location_Result_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Search_Location_Result_OneArgs = {
  object: Search_Location_Result_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_SessionArgs = {
  objects: Array<Session_Insert_Input>;
  on_conflict?: InputMaybe<Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Session_OneArgs = {
  object: Session_Insert_Input;
  on_conflict?: InputMaybe<Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_System_BannerArgs = {
  objects: Array<System_Banner_Insert_Input>;
  on_conflict?: InputMaybe<System_Banner_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_System_Banner_OneArgs = {
  object: System_Banner_Insert_Input;
  on_conflict?: InputMaybe<System_Banner_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TenantArgs = {
  objects: Array<Tenant_Insert_Input>;
  on_conflict?: InputMaybe<Tenant_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tenant_AddressArgs = {
  objects: Array<Tenant_Address_Insert_Input>;
  on_conflict?: InputMaybe<Tenant_Address_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tenant_Address_OneArgs = {
  object: Tenant_Address_Insert_Input;
  on_conflict?: InputMaybe<Tenant_Address_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tenant_CategoryArgs = {
  objects: Array<Tenant_Category_Insert_Input>;
  on_conflict?: InputMaybe<Tenant_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tenant_Category_OneArgs = {
  object: Tenant_Category_Insert_Input;
  on_conflict?: InputMaybe<Tenant_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tenant_OneArgs = {
  object: Tenant_Insert_Input;
  on_conflict?: InputMaybe<Tenant_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tenant_Shipping_PlaceArgs = {
  objects: Array<Tenant_Shipping_Place_Insert_Input>;
  on_conflict?: InputMaybe<Tenant_Shipping_Place_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tenant_Shipping_Place_OneArgs = {
  object: Tenant_Shipping_Place_Insert_Input;
  on_conflict?: InputMaybe<Tenant_Shipping_Place_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TicketArgs = {
  objects: Array<Ticket_Insert_Input>;
  on_conflict?: InputMaybe<Ticket_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ticket_AnswerArgs = {
  objects: Array<Ticket_Answer_Insert_Input>;
  on_conflict?: InputMaybe<Ticket_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ticket_Answer_OneArgs = {
  object: Ticket_Answer_Insert_Input;
  on_conflict?: InputMaybe<Ticket_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ticket_OneArgs = {
  object: Ticket_Insert_Input;
  on_conflict?: InputMaybe<Ticket_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ticket_StatusArgs = {
  objects: Array<Ticket_Status_Insert_Input>;
  on_conflict?: InputMaybe<Ticket_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ticket_Status_OneArgs = {
  object: Ticket_Status_Insert_Input;
  on_conflict?: InputMaybe<Ticket_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TransactionArgs = {
  objects: Array<Transaction_Insert_Input>;
  on_conflict?: InputMaybe<Transaction_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Transaction_OneArgs = {
  object: Transaction_Insert_Input;
  on_conflict?: InputMaybe<Transaction_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_AddressArgs = {
  objects: Array<User_Address_Insert_Input>;
  on_conflict?: InputMaybe<User_Address_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Address_OneArgs = {
  object: User_Address_Insert_Input;
  on_conflict?: InputMaybe<User_Address_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_CouponArgs = {
  objects: Array<User_Coupon_Insert_Input>;
  on_conflict?: InputMaybe<User_Coupon_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Coupon_OneArgs = {
  object: User_Coupon_Insert_Input;
  on_conflict?: InputMaybe<User_Coupon_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_FavoriteArgs = {
  objects: Array<User_Favorite_Insert_Input>;
  on_conflict?: InputMaybe<User_Favorite_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Favorite_OneArgs = {
  object: User_Favorite_Insert_Input;
  on_conflict?: InputMaybe<User_Favorite_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootLoginArgs = {
  args: LoginInput;
};


/** mutation root */
export type Mutation_RootRegisterArgs = {
  args: RegisterInput;
};


/** mutation root */
export type Mutation_RootReset_PasswordArgs = {
  args: ResetPasswordInput;
};


/** mutation root */
export type Mutation_RootUpdate_Address_TypeArgs = {
  _set?: InputMaybe<Address_Type_Set_Input>;
  where: Address_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Address_Type_By_PkArgs = {
  _set?: InputMaybe<Address_Type_Set_Input>;
  pk_columns: Address_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Address_Type_ManyArgs = {
  updates: Array<Address_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AnswerArgs = {
  _inc?: InputMaybe<Answer_Inc_Input>;
  _set?: InputMaybe<Answer_Set_Input>;
  where: Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_By_PkArgs = {
  _inc?: InputMaybe<Answer_Inc_Input>;
  _set?: InputMaybe<Answer_Set_Input>;
  pk_columns: Answer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Answer_ManyArgs = {
  updates: Array<Answer_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CartArgs = {
  _append?: InputMaybe<Cart_Append_Input>;
  _delete_at_path?: InputMaybe<Cart_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Cart_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Cart_Delete_Key_Input>;
  _prepend?: InputMaybe<Cart_Prepend_Input>;
  _set?: InputMaybe<Cart_Set_Input>;
  where: Cart_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Cart_By_PkArgs = {
  _append?: InputMaybe<Cart_Append_Input>;
  _delete_at_path?: InputMaybe<Cart_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Cart_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Cart_Delete_Key_Input>;
  _prepend?: InputMaybe<Cart_Prepend_Input>;
  _set?: InputMaybe<Cart_Set_Input>;
  pk_columns: Cart_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Cart_ManyArgs = {
  updates: Array<Cart_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CategoryArgs = {
  _inc?: InputMaybe<Category_Inc_Input>;
  _set?: InputMaybe<Category_Set_Input>;
  where: Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Category_By_PkArgs = {
  _inc?: InputMaybe<Category_Inc_Input>;
  _set?: InputMaybe<Category_Set_Input>;
  pk_columns: Category_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Category_ManyArgs = {
  updates: Array<Category_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_ThreadArgs = {
  _inc?: InputMaybe<Chat_Thread_Inc_Input>;
  _set?: InputMaybe<Chat_Thread_Set_Input>;
  where: Chat_Thread_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Thread_By_PkArgs = {
  _inc?: InputMaybe<Chat_Thread_Inc_Input>;
  _set?: InputMaybe<Chat_Thread_Set_Input>;
  pk_columns: Chat_Thread_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Thread_ManyArgs = {
  updates: Array<Chat_Thread_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CityArgs = {
  _inc?: InputMaybe<City_Inc_Input>;
  _set?: InputMaybe<City_Set_Input>;
  where: City_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_City_By_PkArgs = {
  _inc?: InputMaybe<City_Inc_Input>;
  _set?: InputMaybe<City_Set_Input>;
  pk_columns: City_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_City_ManyArgs = {
  updates: Array<City_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CompanyArgs = {
  _set?: InputMaybe<Company_Set_Input>;
  where: Company_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Company_By_PkArgs = {
  _set?: InputMaybe<Company_Set_Input>;
  pk_columns: Company_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Company_CategoryArgs = {
  _inc?: InputMaybe<Company_Category_Inc_Input>;
  _set?: InputMaybe<Company_Category_Set_Input>;
  where: Company_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Company_Category_By_PkArgs = {
  _inc?: InputMaybe<Company_Category_Inc_Input>;
  _set?: InputMaybe<Company_Category_Set_Input>;
  pk_columns: Company_Category_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Company_Category_ManyArgs = {
  updates: Array<Company_Category_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Company_ManyArgs = {
  updates: Array<Company_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Company_TypeArgs = {
  _set?: InputMaybe<Company_Type_Set_Input>;
  where: Company_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Company_Type_By_PkArgs = {
  _set?: InputMaybe<Company_Type_Set_Input>;
  pk_columns: Company_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Company_Type_ManyArgs = {
  updates: Array<Company_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CouponArgs = {
  _inc?: InputMaybe<Coupon_Inc_Input>;
  _set?: InputMaybe<Coupon_Set_Input>;
  where: Coupon_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Coupon_By_PkArgs = {
  _inc?: InputMaybe<Coupon_Inc_Input>;
  _set?: InputMaybe<Coupon_Set_Input>;
  pk_columns: Coupon_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Coupon_ManyArgs = {
  updates: Array<Coupon_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Customizable_AreaArgs = {
  _inc?: InputMaybe<Customizable_Area_Inc_Input>;
  _set?: InputMaybe<Customizable_Area_Set_Input>;
  where: Customizable_Area_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Customizable_Area_By_PkArgs = {
  _inc?: InputMaybe<Customizable_Area_Inc_Input>;
  _set?: InputMaybe<Customizable_Area_Set_Input>;
  pk_columns: Customizable_Area_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Customizable_Area_ManyArgs = {
  updates: Array<Customizable_Area_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Delivery_TypeArgs = {
  _set?: InputMaybe<Delivery_Type_Set_Input>;
  where: Delivery_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Delivery_Type_By_PkArgs = {
  _set?: InputMaybe<Delivery_Type_Set_Input>;
  pk_columns: Delivery_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Delivery_Type_ManyArgs = {
  updates: Array<Delivery_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_DistrictArgs = {
  _inc?: InputMaybe<District_Inc_Input>;
  _set?: InputMaybe<District_Set_Input>;
  where: District_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_District_By_PkArgs = {
  _inc?: InputMaybe<District_Inc_Input>;
  _set?: InputMaybe<District_Set_Input>;
  pk_columns: District_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_District_ManyArgs = {
  updates: Array<District_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_MessageArgs = {
  _inc?: InputMaybe<Message_Inc_Input>;
  _set?: InputMaybe<Message_Set_Input>;
  where: Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Message_By_PkArgs = {
  _inc?: InputMaybe<Message_Inc_Input>;
  _set?: InputMaybe<Message_Set_Input>;
  pk_columns: Message_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Message_ManyArgs = {
  updates: Array<Message_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_OrderArgs = {
  _inc?: InputMaybe<Order_Inc_Input>;
  _set?: InputMaybe<Order_Set_Input>;
  where: Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_AddressArgs = {
  _inc?: InputMaybe<Order_Address_Inc_Input>;
  _set?: InputMaybe<Order_Address_Set_Input>;
  where: Order_Address_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Address_By_PkArgs = {
  _inc?: InputMaybe<Order_Address_Inc_Input>;
  _set?: InputMaybe<Order_Address_Set_Input>;
  pk_columns: Order_Address_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Address_ManyArgs = {
  updates: Array<Order_Address_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Order_By_PkArgs = {
  _inc?: InputMaybe<Order_Inc_Input>;
  _set?: InputMaybe<Order_Set_Input>;
  pk_columns: Order_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_ItemArgs = {
  _inc?: InputMaybe<Order_Item_Inc_Input>;
  _set?: InputMaybe<Order_Item_Set_Input>;
  where: Order_Item_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_By_PkArgs = {
  _inc?: InputMaybe<Order_Item_Inc_Input>;
  _set?: InputMaybe<Order_Item_Set_Input>;
  pk_columns: Order_Item_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_ManyArgs = {
  updates: Array<Order_Item_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_Special_ImageArgs = {
  _inc?: InputMaybe<Order_Item_Special_Image_Inc_Input>;
  _set?: InputMaybe<Order_Item_Special_Image_Set_Input>;
  where: Order_Item_Special_Image_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_Special_Image_By_PkArgs = {
  _inc?: InputMaybe<Order_Item_Special_Image_Inc_Input>;
  _set?: InputMaybe<Order_Item_Special_Image_Set_Input>;
  pk_columns: Order_Item_Special_Image_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_Special_Image_ManyArgs = {
  updates: Array<Order_Item_Special_Image_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_Special_TextArgs = {
  _inc?: InputMaybe<Order_Item_Special_Text_Inc_Input>;
  _set?: InputMaybe<Order_Item_Special_Text_Set_Input>;
  where: Order_Item_Special_Text_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_Special_Text_By_PkArgs = {
  _inc?: InputMaybe<Order_Item_Special_Text_Inc_Input>;
  _set?: InputMaybe<Order_Item_Special_Text_Set_Input>;
  pk_columns: Order_Item_Special_Text_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Item_Special_Text_ManyArgs = {
  updates: Array<Order_Item_Special_Text_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Order_ManyArgs = {
  updates: Array<Order_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Order_StatusArgs = {
  _set?: InputMaybe<Order_Status_Set_Input>;
  where: Order_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Status_By_PkArgs = {
  _set?: InputMaybe<Order_Status_Set_Input>;
  pk_columns: Order_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Status_ManyArgs = {
  updates: Array<Order_Status_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Order_TenantArgs = {
  _inc?: InputMaybe<Order_Tenant_Inc_Input>;
  _set?: InputMaybe<Order_Tenant_Set_Input>;
  where: Order_Tenant_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Tenant_By_PkArgs = {
  _inc?: InputMaybe<Order_Tenant_Inc_Input>;
  _set?: InputMaybe<Order_Tenant_Set_Input>;
  pk_columns: Order_Tenant_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Tenant_InvoiceArgs = {
  _inc?: InputMaybe<Order_Tenant_Invoice_Inc_Input>;
  _set?: InputMaybe<Order_Tenant_Invoice_Set_Input>;
  where: Order_Tenant_Invoice_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Tenant_Invoice_By_PkArgs = {
  _inc?: InputMaybe<Order_Tenant_Invoice_Inc_Input>;
  _set?: InputMaybe<Order_Tenant_Invoice_Set_Input>;
  pk_columns: Order_Tenant_Invoice_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Tenant_Invoice_ManyArgs = {
  updates: Array<Order_Tenant_Invoice_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Order_Tenant_ManyArgs = {
  updates: Array<Order_Tenant_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_StatusArgs = {
  _set?: InputMaybe<Payment_Status_Set_Input>;
  where: Payment_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_Status_By_PkArgs = {
  _set?: InputMaybe<Payment_Status_Set_Input>;
  pk_columns: Payment_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_Status_ManyArgs = {
  updates: Array<Payment_Status_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ProductArgs = {
  _append?: InputMaybe<Product_Append_Input>;
  _delete_at_path?: InputMaybe<Product_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Product_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Product_Delete_Key_Input>;
  _inc?: InputMaybe<Product_Inc_Input>;
  _prepend?: InputMaybe<Product_Prepend_Input>;
  _set?: InputMaybe<Product_Set_Input>;
  where: Product_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_By_PkArgs = {
  _append?: InputMaybe<Product_Append_Input>;
  _delete_at_path?: InputMaybe<Product_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Product_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Product_Delete_Key_Input>;
  _inc?: InputMaybe<Product_Inc_Input>;
  _prepend?: InputMaybe<Product_Prepend_Input>;
  _set?: InputMaybe<Product_Set_Input>;
  pk_columns: Product_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Customizable_AreaArgs = {
  _inc?: InputMaybe<Product_Customizable_Area_Inc_Input>;
  _set?: InputMaybe<Product_Customizable_Area_Set_Input>;
  where: Product_Customizable_Area_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Customizable_Area_By_PkArgs = {
  _inc?: InputMaybe<Product_Customizable_Area_Inc_Input>;
  _set?: InputMaybe<Product_Customizable_Area_Set_Input>;
  pk_columns: Product_Customizable_Area_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Product_Customizable_Area_ManyArgs = {
  updates: Array<Product_Customizable_Area_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Product_ManyArgs = {
  updates: Array<Product_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_QuarterArgs = {
  _inc?: InputMaybe<Quarter_Inc_Input>;
  _set?: InputMaybe<Quarter_Set_Input>;
  where: Quarter_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Quarter_By_PkArgs = {
  _inc?: InputMaybe<Quarter_Inc_Input>;
  _set?: InputMaybe<Quarter_Set_Input>;
  pk_columns: Quarter_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Quarter_ManyArgs = {
  updates: Array<Quarter_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_QuestionArgs = {
  _inc?: InputMaybe<Question_Inc_Input>;
  _set?: InputMaybe<Question_Set_Input>;
  where: Question_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Question_By_PkArgs = {
  _inc?: InputMaybe<Question_Inc_Input>;
  _set?: InputMaybe<Question_Set_Input>;
  pk_columns: Question_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Question_ManyArgs = {
  updates: Array<Question_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ReviewArgs = {
  _inc?: InputMaybe<Review_Inc_Input>;
  _set?: InputMaybe<Review_Set_Input>;
  where: Review_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Review_By_PkArgs = {
  _inc?: InputMaybe<Review_Inc_Input>;
  _set?: InputMaybe<Review_Set_Input>;
  pk_columns: Review_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Review_ManyArgs = {
  updates: Array<Review_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_RoleArgs = {
  _set?: InputMaybe<Role_Set_Input>;
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Role_By_PkArgs = {
  _set?: InputMaybe<Role_Set_Input>;
  pk_columns: Role_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Role_ManyArgs = {
  updates: Array<Role_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Search_Location_ResultArgs = {
  _inc?: InputMaybe<Search_Location_Result_Inc_Input>;
  _set?: InputMaybe<Search_Location_Result_Set_Input>;
  where: Search_Location_Result_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Search_Location_Result_ManyArgs = {
  updates: Array<Search_Location_Result_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SessionArgs = {
  _set?: InputMaybe<Session_Set_Input>;
  where: Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Session_By_PkArgs = {
  _set?: InputMaybe<Session_Set_Input>;
  pk_columns: Session_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Session_ManyArgs = {
  updates: Array<Session_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_System_BannerArgs = {
  _set?: InputMaybe<System_Banner_Set_Input>;
  where: System_Banner_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_System_Banner_By_PkArgs = {
  _set?: InputMaybe<System_Banner_Set_Input>;
  pk_columns: System_Banner_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_System_Banner_ManyArgs = {
  updates: Array<System_Banner_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TenantArgs = {
  _inc?: InputMaybe<Tenant_Inc_Input>;
  _set?: InputMaybe<Tenant_Set_Input>;
  where: Tenant_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_AddressArgs = {
  _inc?: InputMaybe<Tenant_Address_Inc_Input>;
  _set?: InputMaybe<Tenant_Address_Set_Input>;
  where: Tenant_Address_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_Address_By_PkArgs = {
  _inc?: InputMaybe<Tenant_Address_Inc_Input>;
  _set?: InputMaybe<Tenant_Address_Set_Input>;
  pk_columns: Tenant_Address_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_Address_ManyArgs = {
  updates: Array<Tenant_Address_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_By_PkArgs = {
  _inc?: InputMaybe<Tenant_Inc_Input>;
  _set?: InputMaybe<Tenant_Set_Input>;
  pk_columns: Tenant_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_CategoryArgs = {
  _inc?: InputMaybe<Tenant_Category_Inc_Input>;
  _set?: InputMaybe<Tenant_Category_Set_Input>;
  where: Tenant_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_Category_By_PkArgs = {
  _inc?: InputMaybe<Tenant_Category_Inc_Input>;
  _set?: InputMaybe<Tenant_Category_Set_Input>;
  pk_columns: Tenant_Category_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_Category_ManyArgs = {
  updates: Array<Tenant_Category_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_ManyArgs = {
  updates: Array<Tenant_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_Shipping_PlaceArgs = {
  _inc?: InputMaybe<Tenant_Shipping_Place_Inc_Input>;
  _set?: InputMaybe<Tenant_Shipping_Place_Set_Input>;
  where: Tenant_Shipping_Place_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_Shipping_Place_By_PkArgs = {
  _inc?: InputMaybe<Tenant_Shipping_Place_Inc_Input>;
  _set?: InputMaybe<Tenant_Shipping_Place_Set_Input>;
  pk_columns: Tenant_Shipping_Place_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Tenant_Shipping_Place_ManyArgs = {
  updates: Array<Tenant_Shipping_Place_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TicketArgs = {
  _inc?: InputMaybe<Ticket_Inc_Input>;
  _set?: InputMaybe<Ticket_Set_Input>;
  where: Ticket_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ticket_AnswerArgs = {
  _inc?: InputMaybe<Ticket_Answer_Inc_Input>;
  _set?: InputMaybe<Ticket_Answer_Set_Input>;
  where: Ticket_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ticket_Answer_By_PkArgs = {
  _inc?: InputMaybe<Ticket_Answer_Inc_Input>;
  _set?: InputMaybe<Ticket_Answer_Set_Input>;
  pk_columns: Ticket_Answer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ticket_Answer_ManyArgs = {
  updates: Array<Ticket_Answer_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Ticket_By_PkArgs = {
  _inc?: InputMaybe<Ticket_Inc_Input>;
  _set?: InputMaybe<Ticket_Set_Input>;
  pk_columns: Ticket_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ticket_ManyArgs = {
  updates: Array<Ticket_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Ticket_StatusArgs = {
  _set?: InputMaybe<Ticket_Status_Set_Input>;
  where: Ticket_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ticket_Status_By_PkArgs = {
  _set?: InputMaybe<Ticket_Status_Set_Input>;
  pk_columns: Ticket_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ticket_Status_ManyArgs = {
  updates: Array<Ticket_Status_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TransactionArgs = {
  _set?: InputMaybe<Transaction_Set_Input>;
  where: Transaction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Transaction_By_PkArgs = {
  _set?: InputMaybe<Transaction_Set_Input>;
  pk_columns: Transaction_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Transaction_ManyArgs = {
  updates: Array<Transaction_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_AddressArgs = {
  _inc?: InputMaybe<User_Address_Inc_Input>;
  _set?: InputMaybe<User_Address_Set_Input>;
  where: User_Address_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Address_By_PkArgs = {
  _inc?: InputMaybe<User_Address_Inc_Input>;
  _set?: InputMaybe<User_Address_Set_Input>;
  pk_columns: User_Address_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Address_ManyArgs = {
  updates: Array<User_Address_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_CouponArgs = {
  _set?: InputMaybe<User_Coupon_Set_Input>;
  where: User_Coupon_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Coupon_By_PkArgs = {
  _set?: InputMaybe<User_Coupon_Set_Input>;
  pk_columns: User_Coupon_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Coupon_ManyArgs = {
  updates: Array<User_Coupon_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_FavoriteArgs = {
  _inc?: InputMaybe<User_Favorite_Inc_Input>;
  _set?: InputMaybe<User_Favorite_Set_Input>;
  where: User_Favorite_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Favorite_By_PkArgs = {
  _inc?: InputMaybe<User_Favorite_Inc_Input>;
  _set?: InputMaybe<User_Favorite_Set_Input>;
  pk_columns: User_Favorite_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Favorite_ManyArgs = {
  updates: Array<User_Favorite_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_ManyArgs = {
  updates: Array<User_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** columns and relationships of "order" */
export type Order = {
  created_at: Scalars['timestamptz']['output'];
  delivery_date?: Maybe<Scalars['timestamptz']['output']>;
  delivery_time?: Maybe<Scalars['String']['output']>;
  guest_id?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  order_addresses: Array<Order_Address>;
  /** An aggregate relationship */
  order_addresses_aggregate: Order_Address_Aggregate;
  order_no?: Maybe<Scalars['bigint']['output']>;
  paymentConversationId?: Maybe<Scalars['String']['output']>;
  payment_status?: Maybe<Payment_Status_Enum>;
  /** An object relationship */
  payment_status_relation?: Maybe<Payment_Status>;
  sender_mail?: Maybe<Scalars['String']['output']>;
  sender_phone?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  tenant_orders: Array<Order_Tenant>;
  /** An aggregate relationship */
  tenant_orders_aggregate: Order_Tenant_Aggregate;
  total_amount: Scalars['numeric']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "order" */
export type OrderOrder_AddressesArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


/** columns and relationships of "order" */
export type OrderOrder_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


/** columns and relationships of "order" */
export type OrderTenant_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Order_By>>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};


/** columns and relationships of "order" */
export type OrderTenant_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Order_By>>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};

/** columns and relationships of "order_address" */
export type Order_Address = {
  address: Scalars['String']['output'];
  address_title: Scalars['String']['output'];
  /** An object relationship */
  city: City;
  city_id: Scalars['Int']['output'];
  /** An object relationship */
  district: District;
  district_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** An object relationship */
  order: Order;
  order_id: Scalars['uuid']['output'];
  /** An object relationship */
  quarter: Quarter;
  quarter_id: Scalars['Int']['output'];
  receiver_firstname: Scalars['String']['output'];
  receiver_phone: Scalars['String']['output'];
  receiver_surname: Scalars['String']['output'];
};

/** aggregated selection of "order_address" */
export type Order_Address_Aggregate = {
  aggregate?: Maybe<Order_Address_Aggregate_Fields>;
  nodes: Array<Order_Address>;
};

export type Order_Address_Aggregate_Bool_Exp = {
  count?: InputMaybe<Order_Address_Aggregate_Bool_Exp_Count>;
};

export type Order_Address_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Order_Address_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Order_Address_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "order_address" */
export type Order_Address_Aggregate_Fields = {
  avg?: Maybe<Order_Address_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Order_Address_Max_Fields>;
  min?: Maybe<Order_Address_Min_Fields>;
  stddev?: Maybe<Order_Address_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Address_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Address_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Address_Sum_Fields>;
  var_pop?: Maybe<Order_Address_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Address_Var_Samp_Fields>;
  variance?: Maybe<Order_Address_Variance_Fields>;
};


/** aggregate fields of "order_address" */
export type Order_Address_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Address_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "order_address" */
export type Order_Address_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Address_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Address_Max_Order_By>;
  min?: InputMaybe<Order_Address_Min_Order_By>;
  stddev?: InputMaybe<Order_Address_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Address_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Address_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Address_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Address_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Address_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Address_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order_address" */
export type Order_Address_Arr_Rel_Insert_Input = {
  data: Array<Order_Address_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Address_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Address_Avg_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "order_address" */
export type Order_Address_Avg_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order_address". All fields are combined with a logical 'AND'. */
export type Order_Address_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Address_Bool_Exp>>;
  _not?: InputMaybe<Order_Address_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Address_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  address_title?: InputMaybe<String_Comparison_Exp>;
  city?: InputMaybe<City_Bool_Exp>;
  city_id?: InputMaybe<Int_Comparison_Exp>;
  district?: InputMaybe<District_Bool_Exp>;
  district_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  order?: InputMaybe<Order_Bool_Exp>;
  order_id?: InputMaybe<Uuid_Comparison_Exp>;
  quarter?: InputMaybe<Quarter_Bool_Exp>;
  quarter_id?: InputMaybe<Int_Comparison_Exp>;
  receiver_firstname?: InputMaybe<String_Comparison_Exp>;
  receiver_phone?: InputMaybe<String_Comparison_Exp>;
  receiver_surname?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_address" */
export type Order_Address_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'order_address_pkey';

/** input type for incrementing numeric columns in table "order_address" */
export type Order_Address_Inc_Input = {
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "order_address" */
export type Order_Address_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_title?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<City_Obj_Rel_Insert_Input>;
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district?: InputMaybe<District_Obj_Rel_Insert_Input>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Order_Obj_Rel_Insert_Input>;
  order_id?: InputMaybe<Scalars['uuid']['input']>;
  quarter?: InputMaybe<Quarter_Obj_Rel_Insert_Input>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  receiver_firstname?: InputMaybe<Scalars['String']['input']>;
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  receiver_surname?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Order_Address_Max_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  address_title?: Maybe<Scalars['String']['output']>;
  city_id?: Maybe<Scalars['Int']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  order_id?: Maybe<Scalars['uuid']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  receiver_firstname?: Maybe<Scalars['String']['output']>;
  receiver_phone?: Maybe<Scalars['String']['output']>;
  receiver_surname?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "order_address" */
export type Order_Address_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  address_title?: InputMaybe<Order_By>;
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  receiver_firstname?: InputMaybe<Order_By>;
  receiver_phone?: InputMaybe<Order_By>;
  receiver_surname?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Address_Min_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  address_title?: Maybe<Scalars['String']['output']>;
  city_id?: Maybe<Scalars['Int']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  order_id?: Maybe<Scalars['uuid']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  receiver_firstname?: Maybe<Scalars['String']['output']>;
  receiver_phone?: Maybe<Scalars['String']['output']>;
  receiver_surname?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "order_address" */
export type Order_Address_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  address_title?: InputMaybe<Order_By>;
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  receiver_firstname?: InputMaybe<Order_By>;
  receiver_phone?: InputMaybe<Order_By>;
  receiver_surname?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order_address" */
export type Order_Address_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Address>;
};

/** on_conflict condition type for table "order_address" */
export type Order_Address_On_Conflict = {
  constraint: Order_Address_Constraint;
  update_columns?: Array<Order_Address_Update_Column>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};

/** Ordering options when selecting data from "order_address". */
export type Order_Address_Order_By = {
  address?: InputMaybe<Order_By>;
  address_title?: InputMaybe<Order_By>;
  city?: InputMaybe<City_Order_By>;
  city_id?: InputMaybe<Order_By>;
  district?: InputMaybe<District_Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_Order_By>;
  order_id?: InputMaybe<Order_By>;
  quarter?: InputMaybe<Quarter_Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  receiver_firstname?: InputMaybe<Order_By>;
  receiver_phone?: InputMaybe<Order_By>;
  receiver_surname?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order_address */
export type Order_Address_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "order_address" */
export type Order_Address_Select_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'address_title'
  /** column name */
  | 'city_id'
  /** column name */
  | 'district_id'
  /** column name */
  | 'id'
  /** column name */
  | 'order_id'
  /** column name */
  | 'quarter_id'
  /** column name */
  | 'receiver_firstname'
  /** column name */
  | 'receiver_phone'
  /** column name */
  | 'receiver_surname';

/** input type for updating data in table "order_address" */
export type Order_Address_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_title?: InputMaybe<Scalars['String']['input']>;
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  order_id?: InputMaybe<Scalars['uuid']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  receiver_firstname?: InputMaybe<Scalars['String']['input']>;
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  receiver_surname?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Order_Address_Stddev_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "order_address" */
export type Order_Address_Stddev_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Address_Stddev_Pop_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "order_address" */
export type Order_Address_Stddev_Pop_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Address_Stddev_Samp_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "order_address" */
export type Order_Address_Stddev_Samp_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "order_address" */
export type Order_Address_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Address_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Address_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_title?: InputMaybe<Scalars['String']['input']>;
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  order_id?: InputMaybe<Scalars['uuid']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  receiver_firstname?: InputMaybe<Scalars['String']['input']>;
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  receiver_surname?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Order_Address_Sum_Fields = {
  city_id?: Maybe<Scalars['Int']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "order_address" */
export type Order_Address_Sum_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** update columns of table "order_address" */
export type Order_Address_Update_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'address_title'
  /** column name */
  | 'city_id'
  /** column name */
  | 'district_id'
  /** column name */
  | 'id'
  /** column name */
  | 'order_id'
  /** column name */
  | 'quarter_id'
  /** column name */
  | 'receiver_firstname'
  /** column name */
  | 'receiver_phone'
  /** column name */
  | 'receiver_surname';

export type Order_Address_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Order_Address_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Address_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Address_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Order_Address_Var_Pop_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "order_address" */
export type Order_Address_Var_Pop_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Address_Var_Samp_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "order_address" */
export type Order_Address_Var_Samp_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Address_Variance_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "order_address" */
export type Order_Address_Variance_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregated selection of "order" */
export type Order_Aggregate = {
  aggregate?: Maybe<Order_Aggregate_Fields>;
  nodes: Array<Order>;
};

export type Order_Aggregate_Bool_Exp = {
  count?: InputMaybe<Order_Aggregate_Bool_Exp_Count>;
};

export type Order_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Order_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Order_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "order" */
export type Order_Aggregate_Fields = {
  avg?: Maybe<Order_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Order_Max_Fields>;
  min?: Maybe<Order_Min_Fields>;
  stddev?: Maybe<Order_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Sum_Fields>;
  var_pop?: Maybe<Order_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Var_Samp_Fields>;
  variance?: Maybe<Order_Variance_Fields>;
};


/** aggregate fields of "order" */
export type Order_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "order" */
export type Order_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Max_Order_By>;
  min?: InputMaybe<Order_Min_Order_By>;
  stddev?: InputMaybe<Order_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order" */
export type Order_Arr_Rel_Insert_Input = {
  data: Array<Order_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Avg_Fields = {
  order_no?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "order" */
export type Order_Avg_Order_By = {
  order_no?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order". All fields are combined with a logical 'AND'. */
export type Order_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Bool_Exp>>;
  _not?: InputMaybe<Order_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  delivery_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  delivery_time?: InputMaybe<String_Comparison_Exp>;
  guest_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  order_addresses?: InputMaybe<Order_Address_Bool_Exp>;
  order_addresses_aggregate?: InputMaybe<Order_Address_Aggregate_Bool_Exp>;
  order_no?: InputMaybe<Bigint_Comparison_Exp>;
  paymentConversationId?: InputMaybe<String_Comparison_Exp>;
  payment_status?: InputMaybe<Payment_Status_Enum_Comparison_Exp>;
  payment_status_relation?: InputMaybe<Payment_Status_Bool_Exp>;
  sender_mail?: InputMaybe<String_Comparison_Exp>;
  sender_phone?: InputMaybe<String_Comparison_Exp>;
  tenant_orders?: InputMaybe<Order_Tenant_Bool_Exp>;
  tenant_orders_aggregate?: InputMaybe<Order_Tenant_Aggregate_Bool_Exp>;
  total_amount?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** column ordering options */
export type Order_By =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

/** unique or primary key constraints on table "order" */
export type Order_Constraint =
  /** unique or primary key constraint on columns "order_no" */
  | 'order_order_no_key'
  /** unique or primary key constraint on columns "id" */
  | 'order_pkey';

/** input type for incrementing numeric columns in table "order" */
export type Order_Inc_Input = {
  order_no?: InputMaybe<Scalars['bigint']['input']>;
  total_amount?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "order" */
export type Order_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_date?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_time?: InputMaybe<Scalars['String']['input']>;
  guest_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  order_addresses?: InputMaybe<Order_Address_Arr_Rel_Insert_Input>;
  order_no?: InputMaybe<Scalars['bigint']['input']>;
  paymentConversationId?: InputMaybe<Scalars['String']['input']>;
  payment_status?: InputMaybe<Payment_Status_Enum>;
  payment_status_relation?: InputMaybe<Payment_Status_Obj_Rel_Insert_Input>;
  sender_mail?: InputMaybe<Scalars['String']['input']>;
  sender_phone?: InputMaybe<Scalars['String']['input']>;
  tenant_orders?: InputMaybe<Order_Tenant_Arr_Rel_Insert_Input>;
  total_amount?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "order_item" */
export type Order_Item = {
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  delivery_date?: Maybe<Scalars['timestamp']['output']>;
  delivery_time?: Maybe<Scalars['String']['output']>;
  id: Scalars['bigint']['output'];
  /** A computed field, executes function "generate_order_item_no" */
  order_item_no?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  order_item_special_images: Array<Order_Item_Special_Image>;
  /** An aggregate relationship */
  order_item_special_images_aggregate: Order_Item_Special_Image_Aggregate;
  /** An array relationship */
  order_item_special_texts: Array<Order_Item_Special_Text>;
  /** An aggregate relationship */
  order_item_special_texts_aggregate: Order_Item_Special_Text_Aggregate;
  /** An object relationship */
  order_tenant?: Maybe<Order_Tenant>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  /** An object relationship */
  product: Product;
  product_id: Scalars['bigint']['output'];
  quantity: Scalars['Int']['output'];
  status?: Maybe<Order_Status_Enum>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "order_item" */
export type Order_ItemOrder_Item_Special_ImagesArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Image_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Image_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
};


/** columns and relationships of "order_item" */
export type Order_ItemOrder_Item_Special_Images_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Image_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Image_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
};


/** columns and relationships of "order_item" */
export type Order_ItemOrder_Item_Special_TextsArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Text_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Text_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
};


/** columns and relationships of "order_item" */
export type Order_ItemOrder_Item_Special_Texts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Text_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Text_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
};

/** aggregated selection of "order_item" */
export type Order_Item_Aggregate = {
  aggregate?: Maybe<Order_Item_Aggregate_Fields>;
  nodes: Array<Order_Item>;
};

export type Order_Item_Aggregate_Bool_Exp = {
  count?: InputMaybe<Order_Item_Aggregate_Bool_Exp_Count>;
};

export type Order_Item_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Order_Item_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Order_Item_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "order_item" */
export type Order_Item_Aggregate_Fields = {
  avg?: Maybe<Order_Item_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Order_Item_Max_Fields>;
  min?: Maybe<Order_Item_Min_Fields>;
  stddev?: Maybe<Order_Item_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Item_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Item_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Item_Sum_Fields>;
  var_pop?: Maybe<Order_Item_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Item_Var_Samp_Fields>;
  variance?: Maybe<Order_Item_Variance_Fields>;
};


/** aggregate fields of "order_item" */
export type Order_Item_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Item_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "order_item" */
export type Order_Item_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Item_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Item_Max_Order_By>;
  min?: InputMaybe<Order_Item_Min_Order_By>;
  stddev?: InputMaybe<Order_Item_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Item_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Item_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Item_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Item_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Item_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Item_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order_item" */
export type Order_Item_Arr_Rel_Insert_Input = {
  data: Array<Order_Item_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Item_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Item_Avg_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "order_item" */
export type Order_Item_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order_item". All fields are combined with a logical 'AND'. */
export type Order_Item_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Item_Bool_Exp>>;
  _not?: InputMaybe<Order_Item_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Item_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  delivery_date?: InputMaybe<Timestamp_Comparison_Exp>;
  delivery_time?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  order_item_no?: InputMaybe<String_Comparison_Exp>;
  order_item_special_images?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
  order_item_special_images_aggregate?: InputMaybe<Order_Item_Special_Image_Aggregate_Bool_Exp>;
  order_item_special_texts?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
  order_item_special_texts_aggregate?: InputMaybe<Order_Item_Special_Text_Aggregate_Bool_Exp>;
  order_tenant?: InputMaybe<Order_Tenant_Bool_Exp>;
  order_tenant_id?: InputMaybe<Bigint_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<Bigint_Comparison_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<Order_Status_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_item" */
export type Order_Item_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'order_item_pkey';

/** input type for incrementing numeric columns in table "order_item" */
export type Order_Item_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "order_item" */
export type Order_Item_Insert_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_date?: InputMaybe<Scalars['timestamp']['input']>;
  delivery_time?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_item_special_images?: InputMaybe<Order_Item_Special_Image_Arr_Rel_Insert_Input>;
  order_item_special_texts?: InputMaybe<Order_Item_Special_Text_Arr_Rel_Insert_Input>;
  order_tenant?: InputMaybe<Order_Tenant_Obj_Rel_Insert_Input>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Order_Status_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Order_Item_Max_Fields = {
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  delivery_date?: Maybe<Scalars['timestamp']['output']>;
  delivery_time?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "generate_order_item_no" */
  order_item_no?: Maybe<Scalars['String']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  product_id?: Maybe<Scalars['bigint']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "order_item" */
export type Order_Item_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  delivery_date?: InputMaybe<Order_By>;
  delivery_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Item_Min_Fields = {
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  delivery_date?: Maybe<Scalars['timestamp']['output']>;
  delivery_time?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "generate_order_item_no" */
  order_item_no?: Maybe<Scalars['String']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  product_id?: Maybe<Scalars['bigint']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "order_item" */
export type Order_Item_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  delivery_date?: InputMaybe<Order_By>;
  delivery_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order_item" */
export type Order_Item_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Item>;
};

/** on_conflict condition type for table "order_item" */
export type Order_Item_On_Conflict = {
  constraint: Order_Item_Constraint;
  update_columns?: Array<Order_Item_Update_Column>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};

/** Ordering options when selecting data from "order_item". */
export type Order_Item_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  delivery_date?: InputMaybe<Order_By>;
  delivery_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_item_no?: InputMaybe<Order_By>;
  order_item_special_images_aggregate?: InputMaybe<Order_Item_Special_Image_Aggregate_Order_By>;
  order_item_special_texts_aggregate?: InputMaybe<Order_Item_Special_Text_Aggregate_Order_By>;
  order_tenant?: InputMaybe<Order_Tenant_Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order_item */
export type Order_Item_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "order_item" */
export type Order_Item_Select_Column =
  /** column name */
  | 'amount'
  /** column name */
  | 'created_at'
  /** column name */
  | 'delivery_date'
  /** column name */
  | 'delivery_time'
  /** column name */
  | 'id'
  /** column name */
  | 'order_tenant_id'
  /** column name */
  | 'product_id'
  /** column name */
  | 'quantity'
  /** column name */
  | 'status'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "order_item" */
export type Order_Item_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_date?: InputMaybe<Scalars['timestamp']['input']>;
  delivery_time?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Order_Status_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "order_item_special_image" */
export type Order_Item_Special_Image = {
  id: Scalars['bigint']['output'];
  image_url: Scalars['String']['output'];
  order_item_id: Scalars['bigint']['output'];
};

/** aggregated selection of "order_item_special_image" */
export type Order_Item_Special_Image_Aggregate = {
  aggregate?: Maybe<Order_Item_Special_Image_Aggregate_Fields>;
  nodes: Array<Order_Item_Special_Image>;
};

export type Order_Item_Special_Image_Aggregate_Bool_Exp = {
  count?: InputMaybe<Order_Item_Special_Image_Aggregate_Bool_Exp_Count>;
};

export type Order_Item_Special_Image_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Order_Item_Special_Image_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "order_item_special_image" */
export type Order_Item_Special_Image_Aggregate_Fields = {
  avg?: Maybe<Order_Item_Special_Image_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Order_Item_Special_Image_Max_Fields>;
  min?: Maybe<Order_Item_Special_Image_Min_Fields>;
  stddev?: Maybe<Order_Item_Special_Image_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Item_Special_Image_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Item_Special_Image_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Item_Special_Image_Sum_Fields>;
  var_pop?: Maybe<Order_Item_Special_Image_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Item_Special_Image_Var_Samp_Fields>;
  variance?: Maybe<Order_Item_Special_Image_Variance_Fields>;
};


/** aggregate fields of "order_item_special_image" */
export type Order_Item_Special_Image_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Item_Special_Image_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "order_item_special_image" */
export type Order_Item_Special_Image_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Item_Special_Image_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Item_Special_Image_Max_Order_By>;
  min?: InputMaybe<Order_Item_Special_Image_Min_Order_By>;
  stddev?: InputMaybe<Order_Item_Special_Image_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Item_Special_Image_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Item_Special_Image_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Item_Special_Image_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Item_Special_Image_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Item_Special_Image_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Item_Special_Image_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order_item_special_image" */
export type Order_Item_Special_Image_Arr_Rel_Insert_Input = {
  data: Array<Order_Item_Special_Image_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Item_Special_Image_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Item_Special_Image_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order_item_special_image". All fields are combined with a logical 'AND'. */
export type Order_Item_Special_Image_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Item_Special_Image_Bool_Exp>>;
  _not?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Item_Special_Image_Bool_Exp>>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  order_item_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_item_special_image" */
export type Order_Item_Special_Image_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'order_item_special_image_pkey';

/** input type for incrementing numeric columns in table "order_item_special_image" */
export type Order_Item_Special_Image_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_item_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "order_item_special_image" */
export type Order_Item_Special_Image_Insert_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  order_item_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Order_Item_Special_Image_Max_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  order_item_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Item_Special_Image_Min_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  order_item_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order_item_special_image" */
export type Order_Item_Special_Image_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Item_Special_Image>;
};

/** on_conflict condition type for table "order_item_special_image" */
export type Order_Item_Special_Image_On_Conflict = {
  constraint: Order_Item_Special_Image_Constraint;
  update_columns?: Array<Order_Item_Special_Image_Update_Column>;
  where?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
};

/** Ordering options when selecting data from "order_item_special_image". */
export type Order_Item_Special_Image_Order_By = {
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order_item_special_image */
export type Order_Item_Special_Image_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Select_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'image_url'
  /** column name */
  | 'order_item_id';

/** input type for updating data in table "order_item_special_image" */
export type Order_Item_Special_Image_Set_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  order_item_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Order_Item_Special_Image_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Item_Special_Image_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Item_Special_Image_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "order_item_special_image" */
export type Order_Item_Special_Image_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Item_Special_Image_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Item_Special_Image_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  order_item_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Order_Item_Special_Image_Sum_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
  order_item_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** update columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Update_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'image_url'
  /** column name */
  | 'order_item_id';

export type Order_Item_Special_Image_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Order_Item_Special_Image_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Item_Special_Image_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Item_Special_Image_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Order_Item_Special_Image_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Item_Special_Image_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Item_Special_Image_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "order_item_special_image" */
export type Order_Item_Special_Image_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "order_item_special_text" */
export type Order_Item_Special_Text = {
  content: Scalars['String']['output'];
  id: Scalars['bigint']['output'];
  order_item_id: Scalars['bigint']['output'];
};

/** aggregated selection of "order_item_special_text" */
export type Order_Item_Special_Text_Aggregate = {
  aggregate?: Maybe<Order_Item_Special_Text_Aggregate_Fields>;
  nodes: Array<Order_Item_Special_Text>;
};

export type Order_Item_Special_Text_Aggregate_Bool_Exp = {
  count?: InputMaybe<Order_Item_Special_Text_Aggregate_Bool_Exp_Count>;
};

export type Order_Item_Special_Text_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Order_Item_Special_Text_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "order_item_special_text" */
export type Order_Item_Special_Text_Aggregate_Fields = {
  avg?: Maybe<Order_Item_Special_Text_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Order_Item_Special_Text_Max_Fields>;
  min?: Maybe<Order_Item_Special_Text_Min_Fields>;
  stddev?: Maybe<Order_Item_Special_Text_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Item_Special_Text_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Item_Special_Text_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Item_Special_Text_Sum_Fields>;
  var_pop?: Maybe<Order_Item_Special_Text_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Item_Special_Text_Var_Samp_Fields>;
  variance?: Maybe<Order_Item_Special_Text_Variance_Fields>;
};


/** aggregate fields of "order_item_special_text" */
export type Order_Item_Special_Text_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Item_Special_Text_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "order_item_special_text" */
export type Order_Item_Special_Text_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Item_Special_Text_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Item_Special_Text_Max_Order_By>;
  min?: InputMaybe<Order_Item_Special_Text_Min_Order_By>;
  stddev?: InputMaybe<Order_Item_Special_Text_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Item_Special_Text_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Item_Special_Text_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Item_Special_Text_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Item_Special_Text_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Item_Special_Text_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Item_Special_Text_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order_item_special_text" */
export type Order_Item_Special_Text_Arr_Rel_Insert_Input = {
  data: Array<Order_Item_Special_Text_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Item_Special_Text_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Item_Special_Text_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order_item_special_text". All fields are combined with a logical 'AND'. */
export type Order_Item_Special_Text_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Item_Special_Text_Bool_Exp>>;
  _not?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Item_Special_Text_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  order_item_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_item_special_text" */
export type Order_Item_Special_Text_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'order_item_special_text_pkey';

/** input type for incrementing numeric columns in table "order_item_special_text" */
export type Order_Item_Special_Text_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_item_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "order_item_special_text" */
export type Order_Item_Special_Text_Insert_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_item_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Order_Item_Special_Text_Max_Fields = {
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  order_item_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Max_Order_By = {
  content?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Item_Special_Text_Min_Fields = {
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  order_item_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Min_Order_By = {
  content?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order_item_special_text" */
export type Order_Item_Special_Text_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Item_Special_Text>;
};

/** on_conflict condition type for table "order_item_special_text" */
export type Order_Item_Special_Text_On_Conflict = {
  constraint: Order_Item_Special_Text_Constraint;
  update_columns?: Array<Order_Item_Special_Text_Update_Column>;
  where?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
};

/** Ordering options when selecting data from "order_item_special_text". */
export type Order_Item_Special_Text_Order_By = {
  content?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order_item_special_text */
export type Order_Item_Special_Text_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Select_Column =
  /** column name */
  | 'content'
  /** column name */
  | 'id'
  /** column name */
  | 'order_item_id';

/** input type for updating data in table "order_item_special_text" */
export type Order_Item_Special_Text_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_item_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Order_Item_Special_Text_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Item_Special_Text_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Item_Special_Text_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "order_item_special_text" */
export type Order_Item_Special_Text_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Item_Special_Text_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Item_Special_Text_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_item_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Order_Item_Special_Text_Sum_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
  order_item_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** update columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Update_Column =
  /** column name */
  | 'content'
  /** column name */
  | 'id'
  /** column name */
  | 'order_item_id';

export type Order_Item_Special_Text_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Order_Item_Special_Text_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Item_Special_Text_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Item_Special_Text_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Order_Item_Special_Text_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Item_Special_Text_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Item_Special_Text_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_item_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "order_item_special_text" */
export type Order_Item_Special_Text_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  order_item_id?: InputMaybe<Order_By>;
};

/** aggregate stddev on columns */
export type Order_Item_Stddev_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "order_item" */
export type Order_Item_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Item_Stddev_Pop_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "order_item" */
export type Order_Item_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Item_Stddev_Samp_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "order_item" */
export type Order_Item_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "order_item" */
export type Order_Item_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Item_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Item_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_date?: InputMaybe<Scalars['timestamp']['input']>;
  delivery_time?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Order_Status_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Order_Item_Sum_Fields = {
  amount?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  product_id?: Maybe<Scalars['bigint']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "order_item" */
export type Order_Item_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** update columns of table "order_item" */
export type Order_Item_Update_Column =
  /** column name */
  | 'amount'
  /** column name */
  | 'created_at'
  /** column name */
  | 'delivery_date'
  /** column name */
  | 'delivery_time'
  /** column name */
  | 'id'
  /** column name */
  | 'order_tenant_id'
  /** column name */
  | 'product_id'
  /** column name */
  | 'quantity'
  /** column name */
  | 'status'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Order_Item_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Order_Item_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Item_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Item_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Order_Item_Var_Pop_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "order_item" */
export type Order_Item_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Item_Var_Samp_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "order_item" */
export type Order_Item_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Item_Variance_Fields = {
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "order_item" */
export type Order_Item_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type Order_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  delivery_date?: Maybe<Scalars['timestamptz']['output']>;
  delivery_time?: Maybe<Scalars['String']['output']>;
  guest_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  order_no?: Maybe<Scalars['bigint']['output']>;
  paymentConversationId?: Maybe<Scalars['String']['output']>;
  sender_mail?: Maybe<Scalars['String']['output']>;
  sender_phone?: Maybe<Scalars['String']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "order" */
export type Order_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  delivery_date?: InputMaybe<Order_By>;
  delivery_time?: InputMaybe<Order_By>;
  guest_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_no?: InputMaybe<Order_By>;
  paymentConversationId?: InputMaybe<Order_By>;
  sender_mail?: InputMaybe<Order_By>;
  sender_phone?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  delivery_date?: Maybe<Scalars['timestamptz']['output']>;
  delivery_time?: Maybe<Scalars['String']['output']>;
  guest_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  order_no?: Maybe<Scalars['bigint']['output']>;
  paymentConversationId?: Maybe<Scalars['String']['output']>;
  sender_mail?: Maybe<Scalars['String']['output']>;
  sender_phone?: Maybe<Scalars['String']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "order" */
export type Order_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  delivery_date?: InputMaybe<Order_By>;
  delivery_time?: InputMaybe<Order_By>;
  guest_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_no?: InputMaybe<Order_By>;
  paymentConversationId?: InputMaybe<Order_By>;
  sender_mail?: InputMaybe<Order_By>;
  sender_phone?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order" */
export type Order_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Order>;
};

/** input type for inserting object relation for remote table "order" */
export type Order_Obj_Rel_Insert_Input = {
  data: Order_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** on_conflict condition type for table "order" */
export type Order_On_Conflict = {
  constraint: Order_Constraint;
  update_columns?: Array<Order_Update_Column>;
  where?: InputMaybe<Order_Bool_Exp>;
};

/** Ordering options when selecting data from "order". */
export type Order_Order_By = {
  created_at?: InputMaybe<Order_By>;
  delivery_date?: InputMaybe<Order_By>;
  delivery_time?: InputMaybe<Order_By>;
  guest_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_addresses_aggregate?: InputMaybe<Order_Address_Aggregate_Order_By>;
  order_no?: InputMaybe<Order_By>;
  paymentConversationId?: InputMaybe<Order_By>;
  payment_status?: InputMaybe<Order_By>;
  payment_status_relation?: InputMaybe<Payment_Status_Order_By>;
  sender_mail?: InputMaybe<Order_By>;
  sender_phone?: InputMaybe<Order_By>;
  tenant_orders_aggregate?: InputMaybe<Order_Tenant_Aggregate_Order_By>;
  total_amount?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order */
export type Order_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "order" */
export type Order_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'delivery_date'
  /** column name */
  | 'delivery_time'
  /** column name */
  | 'guest_id'
  /** column name */
  | 'id'
  /** column name */
  | 'order_no'
  /** column name */
  | 'paymentConversationId'
  /** column name */
  | 'payment_status'
  /** column name */
  | 'sender_mail'
  /** column name */
  | 'sender_phone'
  /** column name */
  | 'total_amount'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "order" */
export type Order_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_date?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_time?: InputMaybe<Scalars['String']['input']>;
  guest_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  order_no?: InputMaybe<Scalars['bigint']['input']>;
  paymentConversationId?: InputMaybe<Scalars['String']['input']>;
  payment_status?: InputMaybe<Payment_Status_Enum>;
  sender_mail?: InputMaybe<Scalars['String']['input']>;
  sender_phone?: InputMaybe<Scalars['String']['input']>;
  total_amount?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** columns and relationships of "order_status" */
export type Order_Status = {
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  order_tenants: Array<Order_Tenant>;
  /** An aggregate relationship */
  order_tenants_aggregate: Order_Tenant_Aggregate;
  value: Scalars['String']['output'];
};


/** columns and relationships of "order_status" */
export type Order_StatusOrder_TenantsArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Order_By>>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};


/** columns and relationships of "order_status" */
export type Order_StatusOrder_Tenants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Order_By>>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};

/** aggregated selection of "order_status" */
export type Order_Status_Aggregate = {
  aggregate?: Maybe<Order_Status_Aggregate_Fields>;
  nodes: Array<Order_Status>;
};

/** aggregate fields of "order_status" */
export type Order_Status_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Order_Status_Max_Fields>;
  min?: Maybe<Order_Status_Min_Fields>;
};


/** aggregate fields of "order_status" */
export type Order_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "order_status". All fields are combined with a logical 'AND'. */
export type Order_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Status_Bool_Exp>>;
  _not?: InputMaybe<Order_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Status_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  order_tenants?: InputMaybe<Order_Tenant_Bool_Exp>;
  order_tenants_aggregate?: InputMaybe<Order_Tenant_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_status" */
export type Order_Status_Constraint =
  /** unique or primary key constraint on columns "value" */
  | 'order_status_pkey';

export type Order_Status_Enum =
  /** Siparişin herhangi bir nedenden dolayı (stokta kalmaması, ödeme sorunları, müşteri talebi gibi) müşteri tarafından veya sistem tarafından iptal edilmesi. */
  | 'Canceled'
  /** Sipariş başarıyla işlendi, teslim edildi ve tamamlanmış olarak kabul edildi. */
  | 'Completed'
  /** Sipariş verildi ancak daha fazla işlem veya onay bekleniyor. */
  | 'Created'
  /** Sipariş müşteriye başarıyla teslim edildi. */
  | 'Delivered'
  /** Ödemenin başarısız olması veya envanterin kullanılamaması gibi sorunlar nedeniyle sipariş işleme koyulamadı. */
  | 'Failed'
  | 'Paid'
  /** Sipariş sevkiyata hazırlanıyor. */
  | 'Processing'
  /** Siparişin ödemesi müşteriye iade edilmiştir. */
  | 'Refunded'
  /** Sipariş kargoya verildi veya teslimat servisine teslim edildi. */
  | 'Shipped';

/** Boolean expression to compare columns of type "order_status_enum". All fields are combined with logical 'AND'. */
export type Order_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Order_Status_Enum>;
  _in?: InputMaybe<Array<Order_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Order_Status_Enum>;
  _nin?: InputMaybe<Array<Order_Status_Enum>>;
};

/** input type for inserting data into table "order_status" */
export type Order_Status_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  order_tenants?: InputMaybe<Order_Tenant_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Order_Status_Max_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Order_Status_Min_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "order_status" */
export type Order_Status_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Status>;
};

/** input type for inserting object relation for remote table "order_status" */
export type Order_Status_Obj_Rel_Insert_Input = {
  data: Order_Status_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Status_On_Conflict>;
};

/** on_conflict condition type for table "order_status" */
export type Order_Status_On_Conflict = {
  constraint: Order_Status_Constraint;
  update_columns?: Array<Order_Status_Update_Column>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "order_status". */
export type Order_Status_Order_By = {
  comment?: InputMaybe<Order_By>;
  order_tenants_aggregate?: InputMaybe<Order_Tenant_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order_status */
export type Order_Status_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "order_status" */
export type Order_Status_Select_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

/** input type for updating data in table "order_status" */
export type Order_Status_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "order_status" */
export type Order_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Status_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "order_status" */
export type Order_Status_Update_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

export type Order_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Status_Bool_Exp;
};

/** aggregate stddev on columns */
export type Order_Stddev_Fields = {
  order_no?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "order" */
export type Order_Stddev_Order_By = {
  order_no?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Stddev_Pop_Fields = {
  order_no?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "order" */
export type Order_Stddev_Pop_Order_By = {
  order_no?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Stddev_Samp_Fields = {
  order_no?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "order" */
export type Order_Stddev_Samp_Order_By = {
  order_no?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "order" */
export type Order_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_date?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_time?: InputMaybe<Scalars['String']['input']>;
  guest_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  order_no?: InputMaybe<Scalars['bigint']['input']>;
  paymentConversationId?: InputMaybe<Scalars['String']['input']>;
  payment_status?: InputMaybe<Payment_Status_Enum>;
  sender_mail?: InputMaybe<Scalars['String']['input']>;
  sender_phone?: InputMaybe<Scalars['String']['input']>;
  total_amount?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Order_Sum_Fields = {
  order_no?: Maybe<Scalars['bigint']['output']>;
  total_amount?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "order" */
export type Order_Sum_Order_By = {
  order_no?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "order_tenant" */
export type Order_Tenant = {
  /** An array relationship */
  chat_threads: Array<Chat_Thread>;
  /** An aggregate relationship */
  chat_threads_aggregate: Chat_Thread_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** An object relationship */
  order: Order;
  order_id: Scalars['uuid']['output'];
  /** An array relationship */
  order_items: Array<Order_Item>;
  /** An aggregate relationship */
  order_items_aggregate: Order_Item_Aggregate;
  /** An object relationship */
  order_status?: Maybe<Order_Status>;
  /** An array relationship */
  order_tenant_invoices: Array<Order_Tenant_Invoice>;
  /** An aggregate relationship */
  order_tenant_invoices_aggregate: Order_Tenant_Invoice_Aggregate;
  order_tenant_no: Scalars['bigint']['output'];
  status?: Maybe<Order_Status_Enum>;
  /** An object relationship */
  tenant: User;
  tenant_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "order_tenant" */
export type Order_TenantChat_ThreadsArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


/** columns and relationships of "order_tenant" */
export type Order_TenantChat_Threads_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


/** columns and relationships of "order_tenant" */
export type Order_TenantOrder_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "order_tenant" */
export type Order_TenantOrder_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "order_tenant" */
export type Order_TenantOrder_Tenant_InvoicesArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Invoice_Order_By>>;
  where?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
};


/** columns and relationships of "order_tenant" */
export type Order_TenantOrder_Tenant_Invoices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Invoice_Order_By>>;
  where?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
};

/** aggregated selection of "order_tenant" */
export type Order_Tenant_Aggregate = {
  aggregate?: Maybe<Order_Tenant_Aggregate_Fields>;
  nodes: Array<Order_Tenant>;
};

export type Order_Tenant_Aggregate_Bool_Exp = {
  count?: InputMaybe<Order_Tenant_Aggregate_Bool_Exp_Count>;
};

export type Order_Tenant_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Order_Tenant_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "order_tenant" */
export type Order_Tenant_Aggregate_Fields = {
  avg?: Maybe<Order_Tenant_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Order_Tenant_Max_Fields>;
  min?: Maybe<Order_Tenant_Min_Fields>;
  stddev?: Maybe<Order_Tenant_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Tenant_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Tenant_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Tenant_Sum_Fields>;
  var_pop?: Maybe<Order_Tenant_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Tenant_Var_Samp_Fields>;
  variance?: Maybe<Order_Tenant_Variance_Fields>;
};


/** aggregate fields of "order_tenant" */
export type Order_Tenant_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "order_tenant" */
export type Order_Tenant_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Tenant_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Tenant_Max_Order_By>;
  min?: InputMaybe<Order_Tenant_Min_Order_By>;
  stddev?: InputMaybe<Order_Tenant_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Tenant_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Tenant_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Tenant_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Tenant_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Tenant_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Tenant_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order_tenant" */
export type Order_Tenant_Arr_Rel_Insert_Input = {
  data: Array<Order_Tenant_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Tenant_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Tenant_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_no?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "order_tenant" */
export type Order_Tenant_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order_tenant". All fields are combined with a logical 'AND'. */
export type Order_Tenant_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Tenant_Bool_Exp>>;
  _not?: InputMaybe<Order_Tenant_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Tenant_Bool_Exp>>;
  chat_threads?: InputMaybe<Chat_Thread_Bool_Exp>;
  chat_threads_aggregate?: InputMaybe<Chat_Thread_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  order?: InputMaybe<Order_Bool_Exp>;
  order_id?: InputMaybe<Uuid_Comparison_Exp>;
  order_items?: InputMaybe<Order_Item_Bool_Exp>;
  order_items_aggregate?: InputMaybe<Order_Item_Aggregate_Bool_Exp>;
  order_status?: InputMaybe<Order_Status_Bool_Exp>;
  order_tenant_invoices?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
  order_tenant_invoices_aggregate?: InputMaybe<Order_Tenant_Invoice_Aggregate_Bool_Exp>;
  order_tenant_no?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<Order_Status_Enum_Comparison_Exp>;
  tenant?: InputMaybe<User_Bool_Exp>;
  tenant_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_tenant" */
export type Order_Tenant_Constraint =
  /** unique or primary key constraint on columns "order_tenant_no" */
  | 'order_tenant_order_tenant_no_key'
  /** unique or primary key constraint on columns "id" */
  | 'order_tenant_pkey';

/** input type for incrementing numeric columns in table "order_tenant" */
export type Order_Tenant_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_tenant_no?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "order_tenant" */
export type Order_Tenant_Insert_Input = {
  chat_threads?: InputMaybe<Chat_Thread_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order?: InputMaybe<Order_Obj_Rel_Insert_Input>;
  order_id?: InputMaybe<Scalars['uuid']['input']>;
  order_items?: InputMaybe<Order_Item_Arr_Rel_Insert_Input>;
  order_status?: InputMaybe<Order_Status_Obj_Rel_Insert_Input>;
  order_tenant_invoices?: InputMaybe<Order_Tenant_Invoice_Arr_Rel_Insert_Input>;
  order_tenant_no?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Order_Status_Enum>;
  tenant?: InputMaybe<User_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "order_tenant_invoice" */
export type Order_Tenant_Invoice = {
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  order_tenant: Order_Tenant;
  order_tenant_id: Scalars['bigint']['output'];
  pdf_url: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "order_tenant_invoice" */
export type Order_Tenant_Invoice_Aggregate = {
  aggregate?: Maybe<Order_Tenant_Invoice_Aggregate_Fields>;
  nodes: Array<Order_Tenant_Invoice>;
};

export type Order_Tenant_Invoice_Aggregate_Bool_Exp = {
  count?: InputMaybe<Order_Tenant_Invoice_Aggregate_Bool_Exp_Count>;
};

export type Order_Tenant_Invoice_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Order_Tenant_Invoice_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "order_tenant_invoice" */
export type Order_Tenant_Invoice_Aggregate_Fields = {
  avg?: Maybe<Order_Tenant_Invoice_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Order_Tenant_Invoice_Max_Fields>;
  min?: Maybe<Order_Tenant_Invoice_Min_Fields>;
  stddev?: Maybe<Order_Tenant_Invoice_Stddev_Fields>;
  stddev_pop?: Maybe<Order_Tenant_Invoice_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Order_Tenant_Invoice_Stddev_Samp_Fields>;
  sum?: Maybe<Order_Tenant_Invoice_Sum_Fields>;
  var_pop?: Maybe<Order_Tenant_Invoice_Var_Pop_Fields>;
  var_samp?: Maybe<Order_Tenant_Invoice_Var_Samp_Fields>;
  variance?: Maybe<Order_Tenant_Invoice_Variance_Fields>;
};


/** aggregate fields of "order_tenant_invoice" */
export type Order_Tenant_Invoice_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Tenant_Invoice_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Aggregate_Order_By = {
  avg?: InputMaybe<Order_Tenant_Invoice_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Tenant_Invoice_Max_Order_By>;
  min?: InputMaybe<Order_Tenant_Invoice_Min_Order_By>;
  stddev?: InputMaybe<Order_Tenant_Invoice_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Order_Tenant_Invoice_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Order_Tenant_Invoice_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Order_Tenant_Invoice_Sum_Order_By>;
  var_pop?: InputMaybe<Order_Tenant_Invoice_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Order_Tenant_Invoice_Var_Samp_Order_By>;
  variance?: InputMaybe<Order_Tenant_Invoice_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Arr_Rel_Insert_Input = {
  data: Array<Order_Tenant_Invoice_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Tenant_Invoice_On_Conflict>;
};

/** aggregate avg on columns */
export type Order_Tenant_Invoice_Avg_Fields = {
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Avg_Order_By = {
  order_tenant_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "order_tenant_invoice". All fields are combined with a logical 'AND'. */
export type Order_Tenant_Invoice_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Tenant_Invoice_Bool_Exp>>;
  _not?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Tenant_Invoice_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  order_tenant?: InputMaybe<Order_Tenant_Bool_Exp>;
  order_tenant_id?: InputMaybe<Bigint_Comparison_Exp>;
  pdf_url?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'order_tenant_invoice_id_key'
  /** unique or primary key constraint on columns "order_tenant_id" */
  | 'order_tenant_invoice_order_tenant_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'order_tenant_invoice_pkey';

/** input type for incrementing numeric columns in table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Inc_Input = {
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  order_tenant?: InputMaybe<Order_Tenant_Obj_Rel_Insert_Input>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  pdf_url?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Order_Tenant_Invoice_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  pdf_url?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  pdf_url?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Tenant_Invoice_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  pdf_url?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  pdf_url?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Tenant_Invoice>;
};

/** on_conflict condition type for table "order_tenant_invoice" */
export type Order_Tenant_Invoice_On_Conflict = {
  constraint: Order_Tenant_Invoice_Constraint;
  update_columns?: Array<Order_Tenant_Invoice_Update_Column>;
  where?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
};

/** Ordering options when selecting data from "order_tenant_invoice". */
export type Order_Tenant_Invoice_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant?: InputMaybe<Order_Tenant_Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  pdf_url?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order_tenant_invoice */
export type Order_Tenant_Invoice_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'order_tenant_id'
  /** column name */
  | 'pdf_url'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  pdf_url?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Order_Tenant_Invoice_Stddev_Fields = {
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Stddev_Order_By = {
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Tenant_Invoice_Stddev_Pop_Fields = {
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Stddev_Pop_Order_By = {
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Tenant_Invoice_Stddev_Samp_Fields = {
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Stddev_Samp_Order_By = {
  order_tenant_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Tenant_Invoice_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Tenant_Invoice_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  pdf_url?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Order_Tenant_Invoice_Sum_Fields = {
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Sum_Order_By = {
  order_tenant_id?: InputMaybe<Order_By>;
};

/** update columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'order_tenant_id'
  /** column name */
  | 'pdf_url'
  /** column name */
  | 'updated_at';

export type Order_Tenant_Invoice_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Order_Tenant_Invoice_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Tenant_Invoice_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Tenant_Invoice_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Order_Tenant_Invoice_Var_Pop_Fields = {
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Var_Pop_Order_By = {
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Tenant_Invoice_Var_Samp_Fields = {
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Var_Samp_Order_By = {
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Tenant_Invoice_Variance_Fields = {
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "order_tenant_invoice" */
export type Order_Tenant_Invoice_Variance_Order_By = {
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type Order_Tenant_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  order_id?: Maybe<Scalars['uuid']['output']>;
  order_tenant_no?: Maybe<Scalars['bigint']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "order_tenant" */
export type Order_Tenant_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Tenant_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  order_id?: Maybe<Scalars['uuid']['output']>;
  order_tenant_no?: Maybe<Scalars['bigint']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "order_tenant" */
export type Order_Tenant_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order_tenant" */
export type Order_Tenant_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Order_Tenant>;
};

/** input type for inserting object relation for remote table "order_tenant" */
export type Order_Tenant_Obj_Rel_Insert_Input = {
  data: Order_Tenant_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_Tenant_On_Conflict>;
};

/** on_conflict condition type for table "order_tenant" */
export type Order_Tenant_On_Conflict = {
  constraint: Order_Tenant_Constraint;
  update_columns?: Array<Order_Tenant_Update_Column>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};

/** Ordering options when selecting data from "order_tenant". */
export type Order_Tenant_Order_By = {
  chat_threads_aggregate?: InputMaybe<Chat_Thread_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_Order_By>;
  order_id?: InputMaybe<Order_By>;
  order_items_aggregate?: InputMaybe<Order_Item_Aggregate_Order_By>;
  order_status?: InputMaybe<Order_Status_Order_By>;
  order_tenant_invoices_aggregate?: InputMaybe<Order_Tenant_Invoice_Aggregate_Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tenant?: InputMaybe<User_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order_tenant */
export type Order_Tenant_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "order_tenant" */
export type Order_Tenant_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'order_id'
  /** column name */
  | 'order_tenant_no'
  /** column name */
  | 'status'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "order_tenant" */
export type Order_Tenant_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_id?: InputMaybe<Scalars['uuid']['input']>;
  order_tenant_no?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Order_Status_Enum>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Order_Tenant_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_no?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "order_tenant" */
export type Order_Tenant_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Order_Tenant_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_no?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "order_tenant" */
export type Order_Tenant_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Order_Tenant_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_no?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "order_tenant" */
export type Order_Tenant_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "order_tenant" */
export type Order_Tenant_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Tenant_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Tenant_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_id?: InputMaybe<Scalars['uuid']['input']>;
  order_tenant_no?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Order_Status_Enum>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Order_Tenant_Sum_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
  order_tenant_no?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "order_tenant" */
export type Order_Tenant_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
};

/** update columns of table "order_tenant" */
export type Order_Tenant_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'order_id'
  /** column name */
  | 'order_tenant_no'
  /** column name */
  | 'status'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'updated_at';

export type Order_Tenant_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Order_Tenant_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Tenant_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Tenant_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Order_Tenant_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_no?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "order_tenant" */
export type Order_Tenant_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Tenant_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_no?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "order_tenant" */
export type Order_Tenant_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Tenant_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_no?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "order_tenant" */
export type Order_Tenant_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_no?: InputMaybe<Order_By>;
};

/** update columns of table "order" */
export type Order_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'delivery_date'
  /** column name */
  | 'delivery_time'
  /** column name */
  | 'guest_id'
  /** column name */
  | 'id'
  /** column name */
  | 'order_no'
  /** column name */
  | 'paymentConversationId'
  /** column name */
  | 'payment_status'
  /** column name */
  | 'sender_mail'
  /** column name */
  | 'sender_phone'
  /** column name */
  | 'total_amount'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Order_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Order_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Order_Var_Pop_Fields = {
  order_no?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "order" */
export type Order_Var_Pop_Order_By = {
  order_no?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Order_Var_Samp_Fields = {
  order_no?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "order" */
export type Order_Var_Samp_Order_By = {
  order_no?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Order_Variance_Fields = {
  order_no?: Maybe<Scalars['Float']['output']>;
  total_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "order" */
export type Order_Variance_Order_By = {
  order_no?: InputMaybe<Order_By>;
  total_amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "payment_status" */
export type Payment_Status = {
  comment?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

/** aggregated selection of "payment_status" */
export type Payment_Status_Aggregate = {
  aggregate?: Maybe<Payment_Status_Aggregate_Fields>;
  nodes: Array<Payment_Status>;
};

/** aggregate fields of "payment_status" */
export type Payment_Status_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Payment_Status_Max_Fields>;
  min?: Maybe<Payment_Status_Min_Fields>;
};


/** aggregate fields of "payment_status" */
export type Payment_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Payment_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "payment_status". All fields are combined with a logical 'AND'. */
export type Payment_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Payment_Status_Bool_Exp>>;
  _not?: InputMaybe<Payment_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Payment_Status_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "payment_status" */
export type Payment_Status_Constraint =
  /** unique or primary key constraint on columns "value" */
  | 'payment_status_pkey';

export type Payment_Status_Enum =
  | 'FAIL'
  | 'PAID';

/** Boolean expression to compare columns of type "payment_status_enum". All fields are combined with logical 'AND'. */
export type Payment_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Payment_Status_Enum>;
  _in?: InputMaybe<Array<Payment_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Payment_Status_Enum>;
  _nin?: InputMaybe<Array<Payment_Status_Enum>>;
};

/** input type for inserting data into table "payment_status" */
export type Payment_Status_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Payment_Status_Max_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Payment_Status_Min_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "payment_status" */
export type Payment_Status_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Payment_Status>;
};

/** input type for inserting object relation for remote table "payment_status" */
export type Payment_Status_Obj_Rel_Insert_Input = {
  data: Payment_Status_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Payment_Status_On_Conflict>;
};

/** on_conflict condition type for table "payment_status" */
export type Payment_Status_On_Conflict = {
  constraint: Payment_Status_Constraint;
  update_columns?: Array<Payment_Status_Update_Column>;
  where?: InputMaybe<Payment_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "payment_status". */
export type Payment_Status_Order_By = {
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: payment_status */
export type Payment_Status_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "payment_status" */
export type Payment_Status_Select_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

/** input type for updating data in table "payment_status" */
export type Payment_Status_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "payment_status" */
export type Payment_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Payment_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Payment_Status_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "payment_status" */
export type Payment_Status_Update_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

export type Payment_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Payment_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Payment_Status_Bool_Exp;
};

/** columns and relationships of "product" */
export type Product = {
  /** An object relationship */
  category: Category;
  category_id: Scalars['Int']['output'];
  delivery_end_time?: Maybe<Scalars['timestamptz']['output']>;
  delivery_start_time?: Maybe<Scalars['timestamptz']['output']>;
  delivery_time_ranges?: Maybe<Scalars['jsonb']['output']>;
  delivery_type?: Maybe<Delivery_Type_Enum>;
  /** An object relationship */
  delivery_type_rel?: Maybe<Delivery_Type>;
  description?: Maybe<Scalars['String']['output']>;
  discount_price?: Maybe<Scalars['numeric']['output']>;
  id: Scalars['bigint']['output'];
  image_url?: Maybe<Array<Scalars['String']['output']>>;
  is_active?: Maybe<Scalars['Boolean']['output']>;
  is_service_free?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  /** An array relationship */
  order_items: Array<Order_Item>;
  /** An aggregate relationship */
  order_items_aggregate: Order_Item_Aggregate;
  price: Scalars['numeric']['output'];
  /** An array relationship */
  product_customizable_areas: Array<Product_Customizable_Area>;
  /** An aggregate relationship */
  product_customizable_areas_aggregate: Product_Customizable_Area_Aggregate;
  product_no: Scalars['String']['output'];
  properties?: Maybe<Scalars['jsonb']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  questions: Array<Question>;
  /** An aggregate relationship */
  questions_aggregate: Question_Aggregate;
  /** An array relationship */
  reviews: Array<Review>;
  /** An aggregate relationship */
  reviews_aggregate: Review_Aggregate;
  /** A computed field, executes function "generate_slug" */
  slug?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  stock_track?: Maybe<Scalars['Boolean']['output']>;
  supplier_product_code?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  tenant: User;
  tenant_id: Scalars['uuid']['output'];
  /** An array relationship */
  user_favorites: Array<User_Favorite>;
  /** An aggregate relationship */
  user_favorites_aggregate: User_Favorite_Aggregate;
};


/** columns and relationships of "product" */
export type ProductDelivery_Time_RangesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "product" */
export type ProductOrder_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductOrder_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_Customizable_AreasArgs = {
  distinct_on?: InputMaybe<Array<Product_Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Customizable_Area_Order_By>>;
  where?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductProduct_Customizable_Areas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Customizable_Area_Order_By>>;
  where?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductPropertiesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "product" */
export type ProductQuestionsArgs = {
  distinct_on?: InputMaybe<Array<Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Order_By>>;
  where?: InputMaybe<Question_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductQuestions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Order_By>>;
  where?: InputMaybe<Question_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductReviewsArgs = {
  distinct_on?: InputMaybe<Array<Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Review_Order_By>>;
  where?: InputMaybe<Review_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Review_Order_By>>;
  where?: InputMaybe<Review_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductUser_FavoritesArgs = {
  distinct_on?: InputMaybe<Array<User_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Favorite_Order_By>>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};


/** columns and relationships of "product" */
export type ProductUser_Favorites_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Favorite_Order_By>>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};

/** aggregated selection of "product" */
export type Product_Aggregate = {
  aggregate?: Maybe<Product_Aggregate_Fields>;
  nodes: Array<Product>;
};

export type Product_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Product_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Product_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Product_Aggregate_Bool_Exp_Count>;
};

export type Product_Aggregate_Bool_Exp_Bool_And = {
  arguments: Product_Select_Column_Product_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Product_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Product_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Product_Select_Column_Product_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Product_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Product_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Product_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Product_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "product" */
export type Product_Aggregate_Fields = {
  avg?: Maybe<Product_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Product_Max_Fields>;
  min?: Maybe<Product_Min_Fields>;
  stddev?: Maybe<Product_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Sum_Fields>;
  var_pop?: Maybe<Product_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Var_Samp_Fields>;
  variance?: Maybe<Product_Variance_Fields>;
};


/** aggregate fields of "product" */
export type Product_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "product" */
export type Product_Aggregate_Order_By = {
  avg?: InputMaybe<Product_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Product_Max_Order_By>;
  min?: InputMaybe<Product_Min_Order_By>;
  stddev?: InputMaybe<Product_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Product_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Product_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Product_Sum_Order_By>;
  var_pop?: InputMaybe<Product_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Product_Var_Samp_Order_By>;
  variance?: InputMaybe<Product_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Product_Append_Input = {
  delivery_time_ranges?: InputMaybe<Scalars['jsonb']['input']>;
  properties?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "product" */
export type Product_Arr_Rel_Insert_Input = {
  data: Array<Product_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Product_On_Conflict>;
};

/** aggregate avg on columns */
export type Product_Avg_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  discount_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "product" */
export type Product_Avg_Order_By = {
  category_id?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product". All fields are combined with a logical 'AND'. */
export type Product_Bool_Exp = {
  _and?: InputMaybe<Array<Product_Bool_Exp>>;
  _not?: InputMaybe<Product_Bool_Exp>;
  _or?: InputMaybe<Array<Product_Bool_Exp>>;
  category?: InputMaybe<Category_Bool_Exp>;
  category_id?: InputMaybe<Int_Comparison_Exp>;
  delivery_end_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  delivery_start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  delivery_time_ranges?: InputMaybe<Jsonb_Comparison_Exp>;
  delivery_type?: InputMaybe<Delivery_Type_Enum_Comparison_Exp>;
  delivery_type_rel?: InputMaybe<Delivery_Type_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  discount_price?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  image_url?: InputMaybe<String_Array_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  is_service_free?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order_items?: InputMaybe<Order_Item_Bool_Exp>;
  order_items_aggregate?: InputMaybe<Order_Item_Aggregate_Bool_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  product_customizable_areas?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
  product_customizable_areas_aggregate?: InputMaybe<Product_Customizable_Area_Aggregate_Bool_Exp>;
  product_no?: InputMaybe<String_Comparison_Exp>;
  properties?: InputMaybe<Jsonb_Comparison_Exp>;
  quantity?: InputMaybe<Int_Comparison_Exp>;
  questions?: InputMaybe<Question_Bool_Exp>;
  questions_aggregate?: InputMaybe<Question_Aggregate_Bool_Exp>;
  reviews?: InputMaybe<Review_Bool_Exp>;
  reviews_aggregate?: InputMaybe<Review_Aggregate_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  stock?: InputMaybe<Int_Comparison_Exp>;
  stock_track?: InputMaybe<Boolean_Comparison_Exp>;
  supplier_product_code?: InputMaybe<String_Comparison_Exp>;
  tenant?: InputMaybe<User_Bool_Exp>;
  tenant_id?: InputMaybe<Uuid_Comparison_Exp>;
  user_favorites?: InputMaybe<User_Favorite_Bool_Exp>;
  user_favorites_aggregate?: InputMaybe<User_Favorite_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "product" */
export type Product_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'product_pkey'
  /** unique or primary key constraint on columns "product_no" */
  | 'product_product_no_key';

/** columns and relationships of "product_customizable_area" */
export type Product_Customizable_Area = {
  count: Scalars['Int']['output'];
  /** An object relationship */
  customizable_area: Customizable_Area;
  customizable_area_id: Scalars['Int']['output'];
  id: Scalars['bigint']['output'];
  max_character?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  product: Product;
  product_id: Scalars['Int']['output'];
};

/** aggregated selection of "product_customizable_area" */
export type Product_Customizable_Area_Aggregate = {
  aggregate?: Maybe<Product_Customizable_Area_Aggregate_Fields>;
  nodes: Array<Product_Customizable_Area>;
};

export type Product_Customizable_Area_Aggregate_Bool_Exp = {
  count?: InputMaybe<Product_Customizable_Area_Aggregate_Bool_Exp_Count>;
};

export type Product_Customizable_Area_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Product_Customizable_Area_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "product_customizable_area" */
export type Product_Customizable_Area_Aggregate_Fields = {
  avg?: Maybe<Product_Customizable_Area_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Product_Customizable_Area_Max_Fields>;
  min?: Maybe<Product_Customizable_Area_Min_Fields>;
  stddev?: Maybe<Product_Customizable_Area_Stddev_Fields>;
  stddev_pop?: Maybe<Product_Customizable_Area_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Product_Customizable_Area_Stddev_Samp_Fields>;
  sum?: Maybe<Product_Customizable_Area_Sum_Fields>;
  var_pop?: Maybe<Product_Customizable_Area_Var_Pop_Fields>;
  var_samp?: Maybe<Product_Customizable_Area_Var_Samp_Fields>;
  variance?: Maybe<Product_Customizable_Area_Variance_Fields>;
};


/** aggregate fields of "product_customizable_area" */
export type Product_Customizable_Area_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Product_Customizable_Area_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "product_customizable_area" */
export type Product_Customizable_Area_Aggregate_Order_By = {
  avg?: InputMaybe<Product_Customizable_Area_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Product_Customizable_Area_Max_Order_By>;
  min?: InputMaybe<Product_Customizable_Area_Min_Order_By>;
  stddev?: InputMaybe<Product_Customizable_Area_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Product_Customizable_Area_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Product_Customizable_Area_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Product_Customizable_Area_Sum_Order_By>;
  var_pop?: InputMaybe<Product_Customizable_Area_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Product_Customizable_Area_Var_Samp_Order_By>;
  variance?: InputMaybe<Product_Customizable_Area_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "product_customizable_area" */
export type Product_Customizable_Area_Arr_Rel_Insert_Input = {
  data: Array<Product_Customizable_Area_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Product_Customizable_Area_On_Conflict>;
};

/** aggregate avg on columns */
export type Product_Customizable_Area_Avg_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  customizable_area_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_character?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Avg_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product_customizable_area". All fields are combined with a logical 'AND'. */
export type Product_Customizable_Area_Bool_Exp = {
  _and?: InputMaybe<Array<Product_Customizable_Area_Bool_Exp>>;
  _not?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
  _or?: InputMaybe<Array<Product_Customizable_Area_Bool_Exp>>;
  count?: InputMaybe<Int_Comparison_Exp>;
  customizable_area?: InputMaybe<Customizable_Area_Bool_Exp>;
  customizable_area_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  max_character?: InputMaybe<Int_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "product_customizable_area" */
export type Product_Customizable_Area_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'product_customizable_area_pkey';

/** input type for incrementing numeric columns in table "product_customizable_area" */
export type Product_Customizable_Area_Inc_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  customizable_area_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  max_character?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "product_customizable_area" */
export type Product_Customizable_Area_Insert_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  customizable_area?: InputMaybe<Customizable_Area_Obj_Rel_Insert_Input>;
  customizable_area_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  max_character?: InputMaybe<Scalars['Int']['input']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Product_Customizable_Area_Max_Fields = {
  count?: Maybe<Scalars['Int']['output']>;
  customizable_area_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  max_character?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Max_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Customizable_Area_Min_Fields = {
  count?: Maybe<Scalars['Int']['output']>;
  customizable_area_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  max_character?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Min_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "product_customizable_area" */
export type Product_Customizable_Area_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Product_Customizable_Area>;
};

/** on_conflict condition type for table "product_customizable_area" */
export type Product_Customizable_Area_On_Conflict = {
  constraint: Product_Customizable_Area_Constraint;
  update_columns?: Array<Product_Customizable_Area_Update_Column>;
  where?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
};

/** Ordering options when selecting data from "product_customizable_area". */
export type Product_Customizable_Area_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area?: InputMaybe<Customizable_Area_Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: product_customizable_area */
export type Product_Customizable_Area_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "product_customizable_area" */
export type Product_Customizable_Area_Select_Column =
  /** column name */
  | 'count'
  /** column name */
  | 'customizable_area_id'
  /** column name */
  | 'id'
  /** column name */
  | 'max_character'
  /** column name */
  | 'product_id';

/** input type for updating data in table "product_customizable_area" */
export type Product_Customizable_Area_Set_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  customizable_area_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  max_character?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Product_Customizable_Area_Stddev_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  customizable_area_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_character?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Stddev_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Product_Customizable_Area_Stddev_Pop_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  customizable_area_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_character?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Stddev_Pop_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Product_Customizable_Area_Stddev_Samp_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  customizable_area_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_character?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Stddev_Samp_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "product_customizable_area" */
export type Product_Customizable_Area_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Product_Customizable_Area_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Product_Customizable_Area_Stream_Cursor_Value_Input = {
  count?: InputMaybe<Scalars['Int']['input']>;
  customizable_area_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  max_character?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Product_Customizable_Area_Sum_Fields = {
  count?: Maybe<Scalars['Int']['output']>;
  customizable_area_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  max_character?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Sum_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** update columns of table "product_customizable_area" */
export type Product_Customizable_Area_Update_Column =
  /** column name */
  | 'count'
  /** column name */
  | 'customizable_area_id'
  /** column name */
  | 'id'
  /** column name */
  | 'max_character'
  /** column name */
  | 'product_id';

export type Product_Customizable_Area_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Product_Customizable_Area_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Product_Customizable_Area_Set_Input>;
  /** filter the rows which have to be updated */
  where: Product_Customizable_Area_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Product_Customizable_Area_Var_Pop_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  customizable_area_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_character?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Var_Pop_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Product_Customizable_Area_Var_Samp_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  customizable_area_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_character?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Var_Samp_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Product_Customizable_Area_Variance_Fields = {
  count?: Maybe<Scalars['Float']['output']>;
  customizable_area_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  max_character?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "product_customizable_area" */
export type Product_Customizable_Area_Variance_Order_By = {
  count?: InputMaybe<Order_By>;
  customizable_area_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_character?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Product_Delete_At_Path_Input = {
  delivery_time_ranges?: InputMaybe<Array<Scalars['String']['input']>>;
  properties?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Product_Delete_Elem_Input = {
  delivery_time_ranges?: InputMaybe<Scalars['Int']['input']>;
  properties?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Product_Delete_Key_Input = {
  delivery_time_ranges?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "product" */
export type Product_Inc_Input = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  discount_price?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "product" */
export type Product_Insert_Input = {
  category?: InputMaybe<Category_Obj_Rel_Insert_Input>;
  category_id?: InputMaybe<Scalars['Int']['input']>;
  delivery_end_time?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_time_ranges?: InputMaybe<Scalars['jsonb']['input']>;
  delivery_type?: InputMaybe<Delivery_Type_Enum>;
  delivery_type_rel?: InputMaybe<Delivery_Type_Obj_Rel_Insert_Input>;
  description?: InputMaybe<Scalars['String']['input']>;
  discount_price?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  image_url?: InputMaybe<Array<Scalars['String']['input']>>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_service_free?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order_items?: InputMaybe<Order_Item_Arr_Rel_Insert_Input>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  product_customizable_areas?: InputMaybe<Product_Customizable_Area_Arr_Rel_Insert_Input>;
  product_no?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['jsonb']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  questions?: InputMaybe<Question_Arr_Rel_Insert_Input>;
  reviews?: InputMaybe<Review_Arr_Rel_Insert_Input>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  stock_track?: InputMaybe<Scalars['Boolean']['input']>;
  supplier_product_code?: InputMaybe<Scalars['String']['input']>;
  tenant?: InputMaybe<User_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  user_favorites?: InputMaybe<User_Favorite_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Product_Max_Fields = {
  category_id?: Maybe<Scalars['Int']['output']>;
  delivery_end_time?: Maybe<Scalars['timestamptz']['output']>;
  delivery_start_time?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount_price?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  image_url?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  product_no?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "generate_slug" */
  slug?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  supplier_product_code?: Maybe<Scalars['String']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "product" */
export type Product_Max_Order_By = {
  category_id?: InputMaybe<Order_By>;
  delivery_end_time?: InputMaybe<Order_By>;
  delivery_start_time?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_no?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
  supplier_product_code?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Product_Min_Fields = {
  category_id?: Maybe<Scalars['Int']['output']>;
  delivery_end_time?: Maybe<Scalars['timestamptz']['output']>;
  delivery_start_time?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount_price?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  image_url?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  product_no?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "generate_slug" */
  slug?: Maybe<Scalars['String']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  supplier_product_code?: Maybe<Scalars['String']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "product" */
export type Product_Min_Order_By = {
  category_id?: InputMaybe<Order_By>;
  delivery_end_time?: InputMaybe<Order_By>;
  delivery_start_time?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  product_no?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
  supplier_product_code?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "product" */
export type Product_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Product>;
};

/** input type for inserting object relation for remote table "product" */
export type Product_Obj_Rel_Insert_Input = {
  data: Product_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Product_On_Conflict>;
};

/** on_conflict condition type for table "product" */
export type Product_On_Conflict = {
  constraint: Product_Constraint;
  update_columns?: Array<Product_Update_Column>;
  where?: InputMaybe<Product_Bool_Exp>;
};

/** Ordering options when selecting data from "product". */
export type Product_Order_By = {
  category?: InputMaybe<Category_Order_By>;
  category_id?: InputMaybe<Order_By>;
  delivery_end_time?: InputMaybe<Order_By>;
  delivery_start_time?: InputMaybe<Order_By>;
  delivery_time_ranges?: InputMaybe<Order_By>;
  delivery_type?: InputMaybe<Order_By>;
  delivery_type_rel?: InputMaybe<Delivery_Type_Order_By>;
  description?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  is_service_free?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order_items_aggregate?: InputMaybe<Order_Item_Aggregate_Order_By>;
  price?: InputMaybe<Order_By>;
  product_customizable_areas_aggregate?: InputMaybe<Product_Customizable_Area_Aggregate_Order_By>;
  product_no?: InputMaybe<Order_By>;
  properties?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  questions_aggregate?: InputMaybe<Question_Aggregate_Order_By>;
  reviews_aggregate?: InputMaybe<Review_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
  stock_track?: InputMaybe<Order_By>;
  supplier_product_code?: InputMaybe<Order_By>;
  tenant?: InputMaybe<User_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  user_favorites_aggregate?: InputMaybe<User_Favorite_Aggregate_Order_By>;
};

/** primary key columns input for table: product */
export type Product_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Product_Prepend_Input = {
  delivery_time_ranges?: InputMaybe<Scalars['jsonb']['input']>;
  properties?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "product" */
export type Product_Select_Column =
  /** column name */
  | 'category_id'
  /** column name */
  | 'delivery_end_time'
  /** column name */
  | 'delivery_start_time'
  /** column name */
  | 'delivery_time_ranges'
  /** column name */
  | 'delivery_type'
  /** column name */
  | 'description'
  /** column name */
  | 'discount_price'
  /** column name */
  | 'id'
  /** column name */
  | 'image_url'
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_service_free'
  /** column name */
  | 'name'
  /** column name */
  | 'price'
  /** column name */
  | 'product_no'
  /** column name */
  | 'properties'
  /** column name */
  | 'quantity'
  /** column name */
  | 'stock'
  /** column name */
  | 'stock_track'
  /** column name */
  | 'supplier_product_code'
  /** column name */
  | 'tenant_id';

/** select "product_aggregate_bool_exp_bool_and_arguments_columns" columns of table "product" */
export type Product_Select_Column_Product_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_service_free'
  /** column name */
  | 'stock_track';

/** select "product_aggregate_bool_exp_bool_or_arguments_columns" columns of table "product" */
export type Product_Select_Column_Product_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_service_free'
  /** column name */
  | 'stock_track';

/** input type for updating data in table "product" */
export type Product_Set_Input = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  delivery_end_time?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_time_ranges?: InputMaybe<Scalars['jsonb']['input']>;
  delivery_type?: InputMaybe<Delivery_Type_Enum>;
  description?: InputMaybe<Scalars['String']['input']>;
  discount_price?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  image_url?: InputMaybe<Array<Scalars['String']['input']>>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_service_free?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  product_no?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['jsonb']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  stock_track?: InputMaybe<Scalars['Boolean']['input']>;
  supplier_product_code?: InputMaybe<Scalars['String']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Product_Stddev_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  discount_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "product" */
export type Product_Stddev_Order_By = {
  category_id?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Product_Stddev_Pop_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  discount_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "product" */
export type Product_Stddev_Pop_Order_By = {
  category_id?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Product_Stddev_Samp_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  discount_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "product" */
export type Product_Stddev_Samp_Order_By = {
  category_id?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "product" */
export type Product_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Product_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Product_Stream_Cursor_Value_Input = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  delivery_end_time?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  delivery_time_ranges?: InputMaybe<Scalars['jsonb']['input']>;
  delivery_type?: InputMaybe<Delivery_Type_Enum>;
  description?: InputMaybe<Scalars['String']['input']>;
  discount_price?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  image_url?: InputMaybe<Array<Scalars['String']['input']>>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_service_free?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  product_no?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['jsonb']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  stock_track?: InputMaybe<Scalars['Boolean']['input']>;
  supplier_product_code?: InputMaybe<Scalars['String']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Product_Sum_Fields = {
  category_id?: Maybe<Scalars['Int']['output']>;
  discount_price?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  price?: Maybe<Scalars['numeric']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "product" */
export type Product_Sum_Order_By = {
  category_id?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
};

/** update columns of table "product" */
export type Product_Update_Column =
  /** column name */
  | 'category_id'
  /** column name */
  | 'delivery_end_time'
  /** column name */
  | 'delivery_start_time'
  /** column name */
  | 'delivery_time_ranges'
  /** column name */
  | 'delivery_type'
  /** column name */
  | 'description'
  /** column name */
  | 'discount_price'
  /** column name */
  | 'id'
  /** column name */
  | 'image_url'
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_service_free'
  /** column name */
  | 'name'
  /** column name */
  | 'price'
  /** column name */
  | 'product_no'
  /** column name */
  | 'properties'
  /** column name */
  | 'quantity'
  /** column name */
  | 'stock'
  /** column name */
  | 'stock_track'
  /** column name */
  | 'supplier_product_code'
  /** column name */
  | 'tenant_id';

export type Product_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Product_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Product_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Product_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Product_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Product_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Product_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Product_Set_Input>;
  /** filter the rows which have to be updated */
  where: Product_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Product_Var_Pop_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  discount_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "product" */
export type Product_Var_Pop_Order_By = {
  category_id?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Product_Var_Samp_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  discount_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "product" */
export type Product_Var_Samp_Order_By = {
  category_id?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Product_Variance_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  discount_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  stock?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "product" */
export type Product_Variance_Order_By = {
  category_id?: InputMaybe<Order_By>;
  discount_price?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  stock?: InputMaybe<Order_By>;
};

/** columns and relationships of "quarter" */
export type Quarter = {
  code: Scalars['Int']['output'];
  /** An object relationship */
  district: District;
  id: Scalars['Int']['output'];
  maxlatitude?: Maybe<Scalars['String']['output']>;
  maxlongitude?: Maybe<Scalars['String']['output']>;
  minlatitude?: Maybe<Scalars['String']['output']>;
  minlongitude?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_id: Scalars['Int']['output'];
};

/** aggregated selection of "quarter" */
export type Quarter_Aggregate = {
  aggregate?: Maybe<Quarter_Aggregate_Fields>;
  nodes: Array<Quarter>;
};

export type Quarter_Aggregate_Bool_Exp = {
  count?: InputMaybe<Quarter_Aggregate_Bool_Exp_Count>;
};

export type Quarter_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Quarter_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Quarter_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "quarter" */
export type Quarter_Aggregate_Fields = {
  avg?: Maybe<Quarter_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Quarter_Max_Fields>;
  min?: Maybe<Quarter_Min_Fields>;
  stddev?: Maybe<Quarter_Stddev_Fields>;
  stddev_pop?: Maybe<Quarter_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Quarter_Stddev_Samp_Fields>;
  sum?: Maybe<Quarter_Sum_Fields>;
  var_pop?: Maybe<Quarter_Var_Pop_Fields>;
  var_samp?: Maybe<Quarter_Var_Samp_Fields>;
  variance?: Maybe<Quarter_Variance_Fields>;
};


/** aggregate fields of "quarter" */
export type Quarter_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quarter_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "quarter" */
export type Quarter_Aggregate_Order_By = {
  avg?: InputMaybe<Quarter_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Quarter_Max_Order_By>;
  min?: InputMaybe<Quarter_Min_Order_By>;
  stddev?: InputMaybe<Quarter_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Quarter_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Quarter_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Quarter_Sum_Order_By>;
  var_pop?: InputMaybe<Quarter_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Quarter_Var_Samp_Order_By>;
  variance?: InputMaybe<Quarter_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "quarter" */
export type Quarter_Arr_Rel_Insert_Input = {
  data: Array<Quarter_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Quarter_On_Conflict>;
};

/** aggregate avg on columns */
export type Quarter_Avg_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "quarter" */
export type Quarter_Avg_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "quarter". All fields are combined with a logical 'AND'. */
export type Quarter_Bool_Exp = {
  _and?: InputMaybe<Array<Quarter_Bool_Exp>>;
  _not?: InputMaybe<Quarter_Bool_Exp>;
  _or?: InputMaybe<Array<Quarter_Bool_Exp>>;
  code?: InputMaybe<Int_Comparison_Exp>;
  district?: InputMaybe<District_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  maxlatitude?: InputMaybe<String_Comparison_Exp>;
  maxlongitude?: InputMaybe<String_Comparison_Exp>;
  minlatitude?: InputMaybe<String_Comparison_Exp>;
  minlongitude?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  parent_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "quarter" */
export type Quarter_Constraint =
  /** unique or primary key constraint on columns "code" */
  | 'quarter_code_key'
  /** unique or primary key constraint on columns "id" */
  | 'quarter_pkey';

/** input type for incrementing numeric columns in table "quarter" */
export type Quarter_Inc_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "quarter" */
export type Quarter_Insert_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  district?: InputMaybe<District_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']['input']>;
  maxlatitude?: InputMaybe<Scalars['String']['input']>;
  maxlongitude?: InputMaybe<Scalars['String']['input']>;
  minlatitude?: InputMaybe<Scalars['String']['input']>;
  minlongitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Quarter_Max_Fields = {
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  maxlatitude?: Maybe<Scalars['String']['output']>;
  maxlongitude?: Maybe<Scalars['String']['output']>;
  minlatitude?: Maybe<Scalars['String']['output']>;
  minlongitude?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "quarter" */
export type Quarter_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maxlatitude?: InputMaybe<Order_By>;
  maxlongitude?: InputMaybe<Order_By>;
  minlatitude?: InputMaybe<Order_By>;
  minlongitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quarter_Min_Fields = {
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  maxlatitude?: Maybe<Scalars['String']['output']>;
  maxlongitude?: Maybe<Scalars['String']['output']>;
  minlatitude?: Maybe<Scalars['String']['output']>;
  minlongitude?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "quarter" */
export type Quarter_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maxlatitude?: InputMaybe<Order_By>;
  maxlongitude?: InputMaybe<Order_By>;
  minlatitude?: InputMaybe<Order_By>;
  minlongitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quarter" */
export type Quarter_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Quarter>;
};

/** input type for inserting object relation for remote table "quarter" */
export type Quarter_Obj_Rel_Insert_Input = {
  data: Quarter_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Quarter_On_Conflict>;
};

/** on_conflict condition type for table "quarter" */
export type Quarter_On_Conflict = {
  constraint: Quarter_Constraint;
  update_columns?: Array<Quarter_Update_Column>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};

/** Ordering options when selecting data from "quarter". */
export type Quarter_Order_By = {
  code?: InputMaybe<Order_By>;
  district?: InputMaybe<District_Order_By>;
  id?: InputMaybe<Order_By>;
  maxlatitude?: InputMaybe<Order_By>;
  maxlongitude?: InputMaybe<Order_By>;
  minlatitude?: InputMaybe<Order_By>;
  minlongitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: quarter */
export type Quarter_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "quarter" */
export type Quarter_Select_Column =
  /** column name */
  | 'code'
  /** column name */
  | 'id'
  /** column name */
  | 'maxlatitude'
  /** column name */
  | 'maxlongitude'
  /** column name */
  | 'minlatitude'
  /** column name */
  | 'minlongitude'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_id';

/** input type for updating data in table "quarter" */
export type Quarter_Set_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  maxlatitude?: InputMaybe<Scalars['String']['input']>;
  maxlongitude?: InputMaybe<Scalars['String']['input']>;
  minlatitude?: InputMaybe<Scalars['String']['input']>;
  minlongitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Quarter_Stddev_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "quarter" */
export type Quarter_Stddev_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quarter_Stddev_Pop_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "quarter" */
export type Quarter_Stddev_Pop_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quarter_Stddev_Samp_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "quarter" */
export type Quarter_Stddev_Samp_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "quarter" */
export type Quarter_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Quarter_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Quarter_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  maxlatitude?: InputMaybe<Scalars['String']['input']>;
  maxlongitude?: InputMaybe<Scalars['String']['input']>;
  minlatitude?: InputMaybe<Scalars['String']['input']>;
  minlongitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Quarter_Sum_Fields = {
  code?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "quarter" */
export type Quarter_Sum_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** update columns of table "quarter" */
export type Quarter_Update_Column =
  /** column name */
  | 'code'
  /** column name */
  | 'id'
  /** column name */
  | 'maxlatitude'
  /** column name */
  | 'maxlongitude'
  /** column name */
  | 'minlatitude'
  /** column name */
  | 'minlongitude'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_id';

export type Quarter_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Quarter_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Quarter_Set_Input>;
  /** filter the rows which have to be updated */
  where: Quarter_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Quarter_Var_Pop_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "quarter" */
export type Quarter_Var_Pop_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quarter_Var_Samp_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "quarter" */
export type Quarter_Var_Samp_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quarter_Variance_Fields = {
  code?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "quarter" */
export type Quarter_Variance_Order_By = {
  code?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

export type Query_Root = {
  /** fetch data from the table: "address_type" */
  address_type: Array<Address_Type>;
  /** fetch aggregated fields from the table: "address_type" */
  address_type_aggregate: Address_Type_Aggregate;
  /** fetch data from the table: "address_type" using primary key columns */
  address_type_by_pk?: Maybe<Address_Type>;
  /** fetch data from the table: "answer" */
  answer: Array<Answer>;
  /** fetch aggregated fields from the table: "answer" */
  answer_aggregate: Answer_Aggregate;
  /** fetch data from the table: "answer" using primary key columns */
  answer_by_pk?: Maybe<Answer>;
  /** fetch data from the table: "cart" */
  cart: Array<Cart>;
  /** fetch aggregated fields from the table: "cart" */
  cart_aggregate: Cart_Aggregate;
  /** fetch data from the table: "cart" using primary key columns */
  cart_by_pk?: Maybe<Cart>;
  /** fetch data from the table: "category" */
  category: Array<Category>;
  /** fetch aggregated fields from the table: "category" */
  category_aggregate: Category_Aggregate;
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>;
  /** fetch data from the table: "chat_thread" */
  chat_thread: Array<Chat_Thread>;
  /** fetch aggregated fields from the table: "chat_thread" */
  chat_thread_aggregate: Chat_Thread_Aggregate;
  /** fetch data from the table: "chat_thread" using primary key columns */
  chat_thread_by_pk?: Maybe<Chat_Thread>;
  /** fetch data from the table: "city" */
  city: Array<City>;
  /** fetch aggregated fields from the table: "city" */
  city_aggregate: City_Aggregate;
  /** fetch data from the table: "city" using primary key columns */
  city_by_pk?: Maybe<City>;
  /** fetch data from the table: "company" */
  company: Array<Company>;
  /** fetch aggregated fields from the table: "company" */
  company_aggregate: Company_Aggregate;
  /** fetch data from the table: "company" using primary key columns */
  company_by_pk?: Maybe<Company>;
  /** fetch data from the table: "company_category" */
  company_category: Array<Company_Category>;
  /** fetch aggregated fields from the table: "company_category" */
  company_category_aggregate: Company_Category_Aggregate;
  /** fetch data from the table: "company_category" using primary key columns */
  company_category_by_pk?: Maybe<Company_Category>;
  /** fetch data from the table: "company_type" */
  company_type: Array<Company_Type>;
  /** fetch aggregated fields from the table: "company_type" */
  company_type_aggregate: Company_Type_Aggregate;
  /** fetch data from the table: "company_type" using primary key columns */
  company_type_by_pk?: Maybe<Company_Type>;
  /** fetch data from the table: "coupon" */
  coupon: Array<Coupon>;
  /** fetch aggregated fields from the table: "coupon" */
  coupon_aggregate: Coupon_Aggregate;
  /** fetch data from the table: "coupon" using primary key columns */
  coupon_by_pk?: Maybe<Coupon>;
  /** fetch data from the table: "customizable_area" */
  customizable_area: Array<Customizable_Area>;
  /** fetch aggregated fields from the table: "customizable_area" */
  customizable_area_aggregate: Customizable_Area_Aggregate;
  /** fetch data from the table: "customizable_area" using primary key columns */
  customizable_area_by_pk?: Maybe<Customizable_Area>;
  /** fetch data from the table: "delivery_type" */
  delivery_type: Array<Delivery_Type>;
  /** fetch aggregated fields from the table: "delivery_type" */
  delivery_type_aggregate: Delivery_Type_Aggregate;
  /** fetch data from the table: "delivery_type" using primary key columns */
  delivery_type_by_pk?: Maybe<Delivery_Type>;
  /** fetch data from the table: "district" */
  district: Array<District>;
  /** fetch aggregated fields from the table: "district" */
  district_aggregate: District_Aggregate;
  /** fetch data from the table: "district" using primary key columns */
  district_by_pk?: Maybe<District>;
  /** fetch data from the table: "message" */
  message: Array<Message>;
  /** fetch aggregated fields from the table: "message" */
  message_aggregate: Message_Aggregate;
  /** fetch data from the table: "message" using primary key columns */
  message_by_pk?: Maybe<Message>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch data from the table: "order_address" */
  order_address: Array<Order_Address>;
  /** fetch aggregated fields from the table: "order_address" */
  order_address_aggregate: Order_Address_Aggregate;
  /** fetch data from the table: "order_address" using primary key columns */
  order_address_by_pk?: Maybe<Order_Address>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
  /** fetch data from the table: "order_item" */
  order_item: Array<Order_Item>;
  /** fetch aggregated fields from the table: "order_item" */
  order_item_aggregate: Order_Item_Aggregate;
  /** fetch data from the table: "order_item" using primary key columns */
  order_item_by_pk?: Maybe<Order_Item>;
  /** fetch data from the table: "order_item_special_image" */
  order_item_special_image: Array<Order_Item_Special_Image>;
  /** fetch aggregated fields from the table: "order_item_special_image" */
  order_item_special_image_aggregate: Order_Item_Special_Image_Aggregate;
  /** fetch data from the table: "order_item_special_image" using primary key columns */
  order_item_special_image_by_pk?: Maybe<Order_Item_Special_Image>;
  /** fetch data from the table: "order_item_special_text" */
  order_item_special_text: Array<Order_Item_Special_Text>;
  /** fetch aggregated fields from the table: "order_item_special_text" */
  order_item_special_text_aggregate: Order_Item_Special_Text_Aggregate;
  /** fetch data from the table: "order_item_special_text" using primary key columns */
  order_item_special_text_by_pk?: Maybe<Order_Item_Special_Text>;
  /** fetch data from the table: "order_status" */
  order_status: Array<Order_Status>;
  /** fetch aggregated fields from the table: "order_status" */
  order_status_aggregate: Order_Status_Aggregate;
  /** fetch data from the table: "order_status" using primary key columns */
  order_status_by_pk?: Maybe<Order_Status>;
  /** fetch data from the table: "order_tenant" */
  order_tenant: Array<Order_Tenant>;
  /** fetch aggregated fields from the table: "order_tenant" */
  order_tenant_aggregate: Order_Tenant_Aggregate;
  /** fetch data from the table: "order_tenant" using primary key columns */
  order_tenant_by_pk?: Maybe<Order_Tenant>;
  /** fetch data from the table: "order_tenant_invoice" */
  order_tenant_invoice: Array<Order_Tenant_Invoice>;
  /** fetch aggregated fields from the table: "order_tenant_invoice" */
  order_tenant_invoice_aggregate: Order_Tenant_Invoice_Aggregate;
  /** fetch data from the table: "order_tenant_invoice" using primary key columns */
  order_tenant_invoice_by_pk?: Maybe<Order_Tenant_Invoice>;
  /** fetch data from the table: "payment_status" */
  payment_status: Array<Payment_Status>;
  /** fetch aggregated fields from the table: "payment_status" */
  payment_status_aggregate: Payment_Status_Aggregate;
  /** fetch data from the table: "payment_status" using primary key columns */
  payment_status_by_pk?: Maybe<Payment_Status>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  product_aggregate: Product_Aggregate;
  /** fetch data from the table: "product" using primary key columns */
  product_by_pk?: Maybe<Product>;
  /** fetch data from the table: "product_customizable_area" */
  product_customizable_area: Array<Product_Customizable_Area>;
  /** fetch aggregated fields from the table: "product_customizable_area" */
  product_customizable_area_aggregate: Product_Customizable_Area_Aggregate;
  /** fetch data from the table: "product_customizable_area" using primary key columns */
  product_customizable_area_by_pk?: Maybe<Product_Customizable_Area>;
  /** fetch data from the table: "quarter" */
  quarter: Array<Quarter>;
  /** fetch aggregated fields from the table: "quarter" */
  quarter_aggregate: Quarter_Aggregate;
  /** fetch data from the table: "quarter" using primary key columns */
  quarter_by_pk?: Maybe<Quarter>;
  /** fetch data from the table: "question" */
  question: Array<Question>;
  /** fetch aggregated fields from the table: "question" */
  question_aggregate: Question_Aggregate;
  /** fetch data from the table: "question" using primary key columns */
  question_by_pk?: Maybe<Question>;
  /** fetch data from the table: "review" */
  review: Array<Review>;
  /** fetch aggregated fields from the table: "review" */
  review_aggregate: Review_Aggregate;
  /** fetch data from the table: "review" using primary key columns */
  review_by_pk?: Maybe<Review>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: Role_Aggregate;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<Role>;
  /** execute function "search_location" which returns "quarter" */
  search_location: Array<Quarter>;
  /** execute function "search_location" and query aggregates on result of table type "quarter" */
  search_location_aggregate: Quarter_Aggregate;
  /** fetch data from the table: "search_location_result" */
  search_location_result: Array<Search_Location_Result>;
  /** fetch aggregated fields from the table: "search_location_result" */
  search_location_result_aggregate: Search_Location_Result_Aggregate;
  /** execute function "search_locationv1" which returns "search_location_result" */
  search_locationv1: Array<Search_Location_Result>;
  /** execute function "search_locationv1" and query aggregates on result of table type "search_location_result" */
  search_locationv1_aggregate: Search_Location_Result_Aggregate;
  /** execute function "search_products" which returns "product" */
  search_products: Array<Product>;
  /** execute function "search_products" and query aggregates on result of table type "product" */
  search_products_aggregate: Product_Aggregate;
  /** fetch data from the table: "session" */
  session: Array<Session>;
  /** fetch aggregated fields from the table: "session" */
  session_aggregate: Session_Aggregate;
  /** fetch data from the table: "session" using primary key columns */
  session_by_pk?: Maybe<Session>;
  /** fetch data from the table: "system_banner" */
  system_banner: Array<System_Banner>;
  /** fetch aggregated fields from the table: "system_banner" */
  system_banner_aggregate: System_Banner_Aggregate;
  /** fetch data from the table: "system_banner" using primary key columns */
  system_banner_by_pk?: Maybe<System_Banner>;
  /** fetch data from the table: "tenant" */
  tenant: Array<Tenant>;
  /** fetch data from the table: "tenant_address" */
  tenant_address: Array<Tenant_Address>;
  /** fetch aggregated fields from the table: "tenant_address" */
  tenant_address_aggregate: Tenant_Address_Aggregate;
  /** fetch data from the table: "tenant_address" using primary key columns */
  tenant_address_by_pk?: Maybe<Tenant_Address>;
  /** fetch aggregated fields from the table: "tenant" */
  tenant_aggregate: Tenant_Aggregate;
  /** fetch data from the table: "tenant" using primary key columns */
  tenant_by_pk?: Maybe<Tenant>;
  /** fetch data from the table: "tenant_category" */
  tenant_category: Array<Tenant_Category>;
  /** fetch aggregated fields from the table: "tenant_category" */
  tenant_category_aggregate: Tenant_Category_Aggregate;
  /** fetch data from the table: "tenant_category" using primary key columns */
  tenant_category_by_pk?: Maybe<Tenant_Category>;
  /** fetch data from the table: "tenant_shipping_place" */
  tenant_shipping_place: Array<Tenant_Shipping_Place>;
  /** fetch aggregated fields from the table: "tenant_shipping_place" */
  tenant_shipping_place_aggregate: Tenant_Shipping_Place_Aggregate;
  /** fetch data from the table: "tenant_shipping_place" using primary key columns */
  tenant_shipping_place_by_pk?: Maybe<Tenant_Shipping_Place>;
  /** fetch data from the table: "ticket" */
  ticket: Array<Ticket>;
  /** fetch aggregated fields from the table: "ticket" */
  ticket_aggregate: Ticket_Aggregate;
  /** fetch data from the table: "ticket_answer" */
  ticket_answer: Array<Ticket_Answer>;
  /** fetch aggregated fields from the table: "ticket_answer" */
  ticket_answer_aggregate: Ticket_Answer_Aggregate;
  /** fetch data from the table: "ticket_answer" using primary key columns */
  ticket_answer_by_pk?: Maybe<Ticket_Answer>;
  /** fetch data from the table: "ticket" using primary key columns */
  ticket_by_pk?: Maybe<Ticket>;
  /** fetch data from the table: "ticket_status" */
  ticket_status: Array<Ticket_Status>;
  /** fetch aggregated fields from the table: "ticket_status" */
  ticket_status_aggregate: Ticket_Status_Aggregate;
  /** fetch data from the table: "ticket_status" using primary key columns */
  ticket_status_by_pk?: Maybe<Ticket_Status>;
  /** fetch data from the table: "transaction" */
  transaction: Array<Transaction>;
  /** fetch aggregated fields from the table: "transaction" */
  transaction_aggregate: Transaction_Aggregate;
  /** fetch data from the table: "transaction" using primary key columns */
  transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user_address" */
  user_address: Array<User_Address>;
  /** fetch aggregated fields from the table: "user_address" */
  user_address_aggregate: User_Address_Aggregate;
  /** fetch data from the table: "user_address" using primary key columns */
  user_address_by_pk?: Maybe<User_Address>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_coupon" */
  user_coupon: Array<User_Coupon>;
  /** fetch aggregated fields from the table: "user_coupon" */
  user_coupon_aggregate: User_Coupon_Aggregate;
  /** fetch data from the table: "user_coupon" using primary key columns */
  user_coupon_by_pk?: Maybe<User_Coupon>;
  /** fetch data from the table: "user_favorite" */
  user_favorite: Array<User_Favorite>;
  /** fetch aggregated fields from the table: "user_favorite" */
  user_favorite_aggregate: User_Favorite_Aggregate;
  /** fetch data from the table: "user_favorite" using primary key columns */
  user_favorite_by_pk?: Maybe<User_Favorite>;
};


export type Query_RootAddress_TypeArgs = {
  distinct_on?: InputMaybe<Array<Address_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Type_Order_By>>;
  where?: InputMaybe<Address_Type_Bool_Exp>;
};


export type Query_RootAddress_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Type_Order_By>>;
  where?: InputMaybe<Address_Type_Bool_Exp>;
};


export type Query_RootAddress_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootAnswerArgs = {
  distinct_on?: InputMaybe<Array<Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Order_By>>;
  where?: InputMaybe<Answer_Bool_Exp>;
};


export type Query_RootAnswer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Order_By>>;
  where?: InputMaybe<Answer_Bool_Exp>;
};


export type Query_RootAnswer_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootCartArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


export type Query_RootCart_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


export type Query_RootCart_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCategoryArgs = {
  distinct_on?: InputMaybe<Array<Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Category_Order_By>>;
  where?: InputMaybe<Category_Bool_Exp>;
};


export type Query_RootCategory_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Category_Order_By>>;
  where?: InputMaybe<Category_Bool_Exp>;
};


export type Query_RootCategory_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootChat_ThreadArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


export type Query_RootChat_Thread_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


export type Query_RootChat_Thread_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCityArgs = {
  distinct_on?: InputMaybe<Array<City_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<City_Order_By>>;
  where?: InputMaybe<City_Bool_Exp>;
};


export type Query_RootCity_AggregateArgs = {
  distinct_on?: InputMaybe<Array<City_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<City_Order_By>>;
  where?: InputMaybe<City_Bool_Exp>;
};


export type Query_RootCity_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootCompanyArgs = {
  distinct_on?: InputMaybe<Array<Company_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Order_By>>;
  where?: InputMaybe<Company_Bool_Exp>;
};


export type Query_RootCompany_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Company_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Order_By>>;
  where?: InputMaybe<Company_Bool_Exp>;
};


export type Query_RootCompany_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCompany_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Company_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Category_Order_By>>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};


export type Query_RootCompany_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Company_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Category_Order_By>>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};


export type Query_RootCompany_Category_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootCompany_TypeArgs = {
  distinct_on?: InputMaybe<Array<Company_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Type_Order_By>>;
  where?: InputMaybe<Company_Type_Bool_Exp>;
};


export type Query_RootCompany_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Company_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Type_Order_By>>;
  where?: InputMaybe<Company_Type_Bool_Exp>;
};


export type Query_RootCompany_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootCouponArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Order_By>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Query_RootCoupon_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Order_By>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Query_RootCoupon_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCustomizable_AreaArgs = {
  distinct_on?: InputMaybe<Array<Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Customizable_Area_Order_By>>;
  where?: InputMaybe<Customizable_Area_Bool_Exp>;
};


export type Query_RootCustomizable_Area_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Customizable_Area_Order_By>>;
  where?: InputMaybe<Customizable_Area_Bool_Exp>;
};


export type Query_RootCustomizable_Area_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootDelivery_TypeArgs = {
  distinct_on?: InputMaybe<Array<Delivery_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delivery_Type_Order_By>>;
  where?: InputMaybe<Delivery_Type_Bool_Exp>;
};


export type Query_RootDelivery_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Delivery_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delivery_Type_Order_By>>;
  where?: InputMaybe<Delivery_Type_Bool_Exp>;
};


export type Query_RootDelivery_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootDistrictArgs = {
  distinct_on?: InputMaybe<Array<District_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<District_Order_By>>;
  where?: InputMaybe<District_Bool_Exp>;
};


export type Query_RootDistrict_AggregateArgs = {
  distinct_on?: InputMaybe<Array<District_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<District_Order_By>>;
  where?: InputMaybe<District_Bool_Exp>;
};


export type Query_RootDistrict_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootMessageArgs = {
  distinct_on?: InputMaybe<Array<Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Message_Order_By>>;
  where?: InputMaybe<Message_Bool_Exp>;
};


export type Query_RootMessage_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Message_Order_By>>;
  where?: InputMaybe<Message_Bool_Exp>;
};


export type Query_RootMessage_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Query_RootOrder_AddressArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


export type Query_RootOrder_Address_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


export type Query_RootOrder_Address_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Query_RootOrder_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootOrder_ItemArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Query_RootOrder_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Query_RootOrder_Item_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootOrder_Item_Special_ImageArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Image_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Image_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
};


export type Query_RootOrder_Item_Special_Image_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Image_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Image_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
};


export type Query_RootOrder_Item_Special_Image_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootOrder_Item_Special_TextArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Text_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Text_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
};


export type Query_RootOrder_Item_Special_Text_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Text_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Text_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
};


export type Query_RootOrder_Item_Special_Text_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootOrder_StatusArgs = {
  distinct_on?: InputMaybe<Array<Order_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Status_Order_By>>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};


export type Query_RootOrder_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Status_Order_By>>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};


export type Query_RootOrder_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootOrder_TenantArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Order_By>>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};


export type Query_RootOrder_Tenant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Order_By>>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};


export type Query_RootOrder_Tenant_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootOrder_Tenant_InvoiceArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Invoice_Order_By>>;
  where?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
};


export type Query_RootOrder_Tenant_Invoice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Invoice_Order_By>>;
  where?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
};


export type Query_RootOrder_Tenant_Invoice_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPayment_StatusArgs = {
  distinct_on?: InputMaybe<Array<Payment_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Payment_Status_Order_By>>;
  where?: InputMaybe<Payment_Status_Bool_Exp>;
};


export type Query_RootPayment_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payment_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Payment_Status_Order_By>>;
  where?: InputMaybe<Payment_Status_Bool_Exp>;
};


export type Query_RootPayment_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootProductArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Query_RootProduct_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Query_RootProduct_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootProduct_Customizable_AreaArgs = {
  distinct_on?: InputMaybe<Array<Product_Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Customizable_Area_Order_By>>;
  where?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
};


export type Query_RootProduct_Customizable_Area_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Customizable_Area_Order_By>>;
  where?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
};


export type Query_RootProduct_Customizable_Area_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootQuarterArgs = {
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


export type Query_RootQuarter_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


export type Query_RootQuarter_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootQuestionArgs = {
  distinct_on?: InputMaybe<Array<Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Order_By>>;
  where?: InputMaybe<Question_Bool_Exp>;
};


export type Query_RootQuestion_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Order_By>>;
  where?: InputMaybe<Question_Bool_Exp>;
};


export type Query_RootQuestion_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootReviewArgs = {
  distinct_on?: InputMaybe<Array<Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Review_Order_By>>;
  where?: InputMaybe<Review_Bool_Exp>;
};


export type Query_RootReview_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Review_Order_By>>;
  where?: InputMaybe<Review_Bool_Exp>;
};


export type Query_RootReview_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRole_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootSearch_LocationArgs = {
  args: Search_Location_Args;
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


export type Query_RootSearch_Location_AggregateArgs = {
  args: Search_Location_Args;
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


export type Query_RootSearch_Location_ResultArgs = {
  distinct_on?: InputMaybe<Array<Search_Location_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Search_Location_Result_Order_By>>;
  where?: InputMaybe<Search_Location_Result_Bool_Exp>;
};


export type Query_RootSearch_Location_Result_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Search_Location_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Search_Location_Result_Order_By>>;
  where?: InputMaybe<Search_Location_Result_Bool_Exp>;
};


export type Query_RootSearch_Locationv1Args = {
  args: Search_Locationv1_Args;
  distinct_on?: InputMaybe<Array<Search_Location_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Search_Location_Result_Order_By>>;
  where?: InputMaybe<Search_Location_Result_Bool_Exp>;
};


export type Query_RootSearch_Locationv1_AggregateArgs = {
  args: Search_Locationv1_Args;
  distinct_on?: InputMaybe<Array<Search_Location_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Search_Location_Result_Order_By>>;
  where?: InputMaybe<Search_Location_Result_Bool_Exp>;
};


export type Query_RootSearch_ProductsArgs = {
  args: Search_Products_Args;
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Query_RootSearch_Products_AggregateArgs = {
  args: Search_Products_Args;
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Query_RootSessionArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


export type Query_RootSession_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


export type Query_RootSession_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSystem_BannerArgs = {
  distinct_on?: InputMaybe<Array<System_Banner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<System_Banner_Order_By>>;
  where?: InputMaybe<System_Banner_Bool_Exp>;
};


export type Query_RootSystem_Banner_AggregateArgs = {
  distinct_on?: InputMaybe<Array<System_Banner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<System_Banner_Order_By>>;
  where?: InputMaybe<System_Banner_Bool_Exp>;
};


export type Query_RootSystem_Banner_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTenantArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Query_RootTenant_AddressArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Address_Order_By>>;
  where?: InputMaybe<Tenant_Address_Bool_Exp>;
};


export type Query_RootTenant_Address_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Address_Order_By>>;
  where?: InputMaybe<Tenant_Address_Bool_Exp>;
};


export type Query_RootTenant_Address_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTenant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Query_RootTenant_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTenant_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Category_Order_By>>;
  where?: InputMaybe<Tenant_Category_Bool_Exp>;
};


export type Query_RootTenant_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Category_Order_By>>;
  where?: InputMaybe<Tenant_Category_Bool_Exp>;
};


export type Query_RootTenant_Category_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootTenant_Shipping_PlaceArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Shipping_Place_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Shipping_Place_Order_By>>;
  where?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
};


export type Query_RootTenant_Shipping_Place_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Shipping_Place_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Shipping_Place_Order_By>>;
  where?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
};


export type Query_RootTenant_Shipping_Place_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootTicketArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Order_By>>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};


export type Query_RootTicket_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Order_By>>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};


export type Query_RootTicket_AnswerArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Answer_Order_By>>;
  where?: InputMaybe<Ticket_Answer_Bool_Exp>;
};


export type Query_RootTicket_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Answer_Order_By>>;
  where?: InputMaybe<Ticket_Answer_Bool_Exp>;
};


export type Query_RootTicket_Answer_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTicket_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootTicket_StatusArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Status_Order_By>>;
  where?: InputMaybe<Ticket_Status_Bool_Exp>;
};


export type Query_RootTicket_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Status_Order_By>>;
  where?: InputMaybe<Ticket_Status_Bool_Exp>;
};


export type Query_RootTicket_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootTransactionArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Query_RootTransaction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Query_RootTransaction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_AddressArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};


export type Query_RootUser_Address_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};


export type Query_RootUser_Address_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUser_CouponArgs = {
  distinct_on?: InputMaybe<Array<User_Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Coupon_Order_By>>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};


export type Query_RootUser_Coupon_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Coupon_Order_By>>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};


export type Query_RootUser_Coupon_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUser_FavoriteArgs = {
  distinct_on?: InputMaybe<Array<User_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Favorite_Order_By>>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};


export type Query_RootUser_Favorite_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Favorite_Order_By>>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};


export type Query_RootUser_Favorite_By_PkArgs = {
  id: Scalars['bigint']['input'];
};

/** User question for product */
export type Question = {
  /** An array relationship */
  answers: Array<Answer>;
  /** An aggregate relationship */
  answers_aggregate: Answer_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** An object relationship */
  product: Product;
  product_id: Scalars['bigint']['output'];
  question: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid']['output'];
};


/** User question for product */
export type QuestionAnswersArgs = {
  distinct_on?: InputMaybe<Array<Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Order_By>>;
  where?: InputMaybe<Answer_Bool_Exp>;
};


/** User question for product */
export type QuestionAnswers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Order_By>>;
  where?: InputMaybe<Answer_Bool_Exp>;
};

/** aggregated selection of "question" */
export type Question_Aggregate = {
  aggregate?: Maybe<Question_Aggregate_Fields>;
  nodes: Array<Question>;
};

export type Question_Aggregate_Bool_Exp = {
  count?: InputMaybe<Question_Aggregate_Bool_Exp_Count>;
};

export type Question_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Question_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Question_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "question" */
export type Question_Aggregate_Fields = {
  avg?: Maybe<Question_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Question_Max_Fields>;
  min?: Maybe<Question_Min_Fields>;
  stddev?: Maybe<Question_Stddev_Fields>;
  stddev_pop?: Maybe<Question_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Question_Stddev_Samp_Fields>;
  sum?: Maybe<Question_Sum_Fields>;
  var_pop?: Maybe<Question_Var_Pop_Fields>;
  var_samp?: Maybe<Question_Var_Samp_Fields>;
  variance?: Maybe<Question_Variance_Fields>;
};


/** aggregate fields of "question" */
export type Question_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Question_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "question" */
export type Question_Aggregate_Order_By = {
  avg?: InputMaybe<Question_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Question_Max_Order_By>;
  min?: InputMaybe<Question_Min_Order_By>;
  stddev?: InputMaybe<Question_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Question_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Question_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Question_Sum_Order_By>;
  var_pop?: InputMaybe<Question_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Question_Var_Samp_Order_By>;
  variance?: InputMaybe<Question_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "question" */
export type Question_Arr_Rel_Insert_Input = {
  data: Array<Question_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Question_On_Conflict>;
};

/** aggregate avg on columns */
export type Question_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "question" */
export type Question_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "question". All fields are combined with a logical 'AND'. */
export type Question_Bool_Exp = {
  _and?: InputMaybe<Array<Question_Bool_Exp>>;
  _not?: InputMaybe<Question_Bool_Exp>;
  _or?: InputMaybe<Array<Question_Bool_Exp>>;
  answers?: InputMaybe<Answer_Bool_Exp>;
  answers_aggregate?: InputMaybe<Answer_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<Bigint_Comparison_Exp>;
  question?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "question" */
export type Question_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'question_pkey';

/** input type for incrementing numeric columns in table "question" */
export type Question_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "question" */
export type Question_Insert_Input = {
  answers?: InputMaybe<Answer_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Question_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  product_id?: Maybe<Scalars['bigint']['output']>;
  question?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "question" */
export type Question_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  question?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Question_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  product_id?: Maybe<Scalars['bigint']['output']>;
  question?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "question" */
export type Question_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  question?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "question" */
export type Question_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Question>;
};

/** input type for inserting object relation for remote table "question" */
export type Question_Obj_Rel_Insert_Input = {
  data: Question_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Question_On_Conflict>;
};

/** on_conflict condition type for table "question" */
export type Question_On_Conflict = {
  constraint: Question_Constraint;
  update_columns?: Array<Question_Update_Column>;
  where?: InputMaybe<Question_Bool_Exp>;
};

/** Ordering options when selecting data from "question". */
export type Question_Order_By = {
  answers_aggregate?: InputMaybe<Answer_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
  question?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: question */
export type Question_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "question" */
export type Question_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'product_id'
  /** column name */
  | 'question'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "question" */
export type Question_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Question_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "question" */
export type Question_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Question_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "question" */
export type Question_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Question_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "question" */
export type Question_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "question" */
export type Question_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Question_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Question_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Question_Sum_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
  product_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "question" */
export type Question_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** update columns of table "question" */
export type Question_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'product_id'
  /** column name */
  | 'question'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Question_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Question_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Question_Set_Input>;
  /** filter the rows which have to be updated */
  where: Question_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Question_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "question" */
export type Question_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Question_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "question" */
export type Question_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Question_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "question" */
export type Question_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** User review for a product - User should have received that product to be able to add review */
export type Review = {
  comment?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['Int']['output'];
  /** An object relationship */
  product: Product;
  product_id: Scalars['Int']['output'];
  score?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "review" */
export type Review_Aggregate = {
  aggregate?: Maybe<Review_Aggregate_Fields>;
  nodes: Array<Review>;
};

export type Review_Aggregate_Bool_Exp = {
  count?: InputMaybe<Review_Aggregate_Bool_Exp_Count>;
};

export type Review_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Review_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Review_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "review" */
export type Review_Aggregate_Fields = {
  avg?: Maybe<Review_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Review_Max_Fields>;
  min?: Maybe<Review_Min_Fields>;
  stddev?: Maybe<Review_Stddev_Fields>;
  stddev_pop?: Maybe<Review_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Review_Stddev_Samp_Fields>;
  sum?: Maybe<Review_Sum_Fields>;
  var_pop?: Maybe<Review_Var_Pop_Fields>;
  var_samp?: Maybe<Review_Var_Samp_Fields>;
  variance?: Maybe<Review_Variance_Fields>;
};


/** aggregate fields of "review" */
export type Review_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Review_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "review" */
export type Review_Aggregate_Order_By = {
  avg?: InputMaybe<Review_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Review_Max_Order_By>;
  min?: InputMaybe<Review_Min_Order_By>;
  stddev?: InputMaybe<Review_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Review_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Review_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Review_Sum_Order_By>;
  var_pop?: InputMaybe<Review_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Review_Var_Samp_Order_By>;
  variance?: InputMaybe<Review_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "review" */
export type Review_Arr_Rel_Insert_Input = {
  data: Array<Review_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Review_On_Conflict>;
};

/** aggregate avg on columns */
export type Review_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "review" */
export type Review_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "review". All fields are combined with a logical 'AND'. */
export type Review_Bool_Exp = {
  _and?: InputMaybe<Array<Review_Bool_Exp>>;
  _not?: InputMaybe<Review_Bool_Exp>;
  _or?: InputMaybe<Array<Review_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<Int_Comparison_Exp>;
  score?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "review" */
export type Review_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'review_pkey';

/** input type for incrementing numeric columns in table "review" */
export type Review_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "review" */
export type Review_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Review_Max_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "review" */
export type Review_Max_Order_By = {
  comment?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Review_Min_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "review" */
export type Review_Min_Order_By = {
  comment?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "review" */
export type Review_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Review>;
};

/** on_conflict condition type for table "review" */
export type Review_On_Conflict = {
  constraint: Review_Constraint;
  update_columns?: Array<Review_Update_Column>;
  where?: InputMaybe<Review_Bool_Exp>;
};

/** Ordering options when selecting data from "review". */
export type Review_Order_By = {
  comment?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: review */
export type Review_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "review" */
export type Review_Select_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'product_id'
  /** column name */
  | 'score'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "review" */
export type Review_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Review_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "review" */
export type Review_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Review_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "review" */
export type Review_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Review_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "review" */
export type Review_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "review" */
export type Review_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Review_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Review_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Review_Sum_Fields = {
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "review" */
export type Review_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
};

/** update columns of table "review" */
export type Review_Update_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'product_id'
  /** column name */
  | 'score'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Review_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Review_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Review_Set_Input>;
  /** filter the rows which have to be updated */
  where: Review_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Review_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "review" */
export type Review_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Review_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "review" */
export type Review_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Review_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "review" */
export type Review_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  score?: InputMaybe<Order_By>;
};

/** columns and relationships of "role" */
export type Role = {
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  users: Array<User>;
  /** An aggregate relationship */
  users_aggregate: User_Aggregate;
  value: Scalars['String']['output'];
};


/** columns and relationships of "role" */
export type RoleUsersArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


/** columns and relationships of "role" */
export type RoleUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** aggregated selection of "role" */
export type Role_Aggregate = {
  aggregate?: Maybe<Role_Aggregate_Fields>;
  nodes: Array<Role>;
};

/** aggregate fields of "role" */
export type Role_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Role_Max_Fields>;
  min?: Maybe<Role_Min_Fields>;
};


/** aggregate fields of "role" */
export type Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "role". All fields are combined with a logical 'AND'. */
export type Role_Bool_Exp = {
  _and?: InputMaybe<Array<Role_Bool_Exp>>;
  _not?: InputMaybe<Role_Bool_Exp>;
  _or?: InputMaybe<Array<Role_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  users?: InputMaybe<User_Bool_Exp>;
  users_aggregate?: InputMaybe<User_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "role" */
export type Role_Constraint =
  /** unique or primary key constraint on columns "value" */
  | 'role_pkey';

export type Role_Enum =
  /** Satıcı Firma */
  | 'Tenant'
  /** Standart kullanici */
  | 'User';

/** Boolean expression to compare columns of type "role_enum". All fields are combined with logical 'AND'. */
export type Role_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Role_Enum>;
  _in?: InputMaybe<Array<Role_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Role_Enum>;
  _nin?: InputMaybe<Array<Role_Enum>>;
};

/** input type for inserting data into table "role" */
export type Role_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<User_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Role_Max_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Role_Min_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "role" */
export type Role_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Role>;
};

/** input type for inserting object relation for remote table "role" */
export type Role_Obj_Rel_Insert_Input = {
  data: Role_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Role_On_Conflict>;
};

/** on_conflict condition type for table "role" */
export type Role_On_Conflict = {
  constraint: Role_Constraint;
  update_columns?: Array<Role_Update_Column>;
  where?: InputMaybe<Role_Bool_Exp>;
};

/** Ordering options when selecting data from "role". */
export type Role_Order_By = {
  comment?: InputMaybe<Order_By>;
  users_aggregate?: InputMaybe<User_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: role */
export type Role_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "role" */
export type Role_Select_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

/** input type for updating data in table "role" */
export type Role_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "role" */
export type Role_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Role_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Role_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "role" */
export type Role_Update_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

export type Role_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Role_Set_Input>;
  /** filter the rows which have to be updated */
  where: Role_Bool_Exp;
};

export type Search_Location_Args = {
  search?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "search_location_result" */
export type Search_Location_Result = {
  city_id?: Maybe<Scalars['Int']['output']>;
  city_name?: Maybe<Scalars['String']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  district_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "search_location_result" */
export type Search_Location_Result_Aggregate = {
  aggregate?: Maybe<Search_Location_Result_Aggregate_Fields>;
  nodes: Array<Search_Location_Result>;
};

/** aggregate fields of "search_location_result" */
export type Search_Location_Result_Aggregate_Fields = {
  avg?: Maybe<Search_Location_Result_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Search_Location_Result_Max_Fields>;
  min?: Maybe<Search_Location_Result_Min_Fields>;
  stddev?: Maybe<Search_Location_Result_Stddev_Fields>;
  stddev_pop?: Maybe<Search_Location_Result_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Search_Location_Result_Stddev_Samp_Fields>;
  sum?: Maybe<Search_Location_Result_Sum_Fields>;
  var_pop?: Maybe<Search_Location_Result_Var_Pop_Fields>;
  var_samp?: Maybe<Search_Location_Result_Var_Samp_Fields>;
  variance?: Maybe<Search_Location_Result_Variance_Fields>;
};


/** aggregate fields of "search_location_result" */
export type Search_Location_Result_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Search_Location_Result_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Search_Location_Result_Avg_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "search_location_result". All fields are combined with a logical 'AND'. */
export type Search_Location_Result_Bool_Exp = {
  _and?: InputMaybe<Array<Search_Location_Result_Bool_Exp>>;
  _not?: InputMaybe<Search_Location_Result_Bool_Exp>;
  _or?: InputMaybe<Array<Search_Location_Result_Bool_Exp>>;
  city_id?: InputMaybe<Int_Comparison_Exp>;
  city_name?: InputMaybe<String_Comparison_Exp>;
  district_id?: InputMaybe<Int_Comparison_Exp>;
  district_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "search_location_result" */
export type Search_Location_Result_Inc_Input = {
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "search_location_result" */
export type Search_Location_Result_Insert_Input = {
  city_id?: InputMaybe<Scalars['Int']['input']>;
  city_name?: InputMaybe<Scalars['String']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  district_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Search_Location_Result_Max_Fields = {
  city_id?: Maybe<Scalars['Int']['output']>;
  city_name?: Maybe<Scalars['String']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  district_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Search_Location_Result_Min_Fields = {
  city_id?: Maybe<Scalars['Int']['output']>;
  city_name?: Maybe<Scalars['String']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  district_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "search_location_result" */
export type Search_Location_Result_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Search_Location_Result>;
};

/** Ordering options when selecting data from "search_location_result". */
export type Search_Location_Result_Order_By = {
  city_id?: InputMaybe<Order_By>;
  city_name?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  district_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "search_location_result" */
export type Search_Location_Result_Select_Column =
  /** column name */
  | 'city_id'
  /** column name */
  | 'city_name'
  /** column name */
  | 'district_id'
  /** column name */
  | 'district_name'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'type';

/** input type for updating data in table "search_location_result" */
export type Search_Location_Result_Set_Input = {
  city_id?: InputMaybe<Scalars['Int']['input']>;
  city_name?: InputMaybe<Scalars['String']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  district_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Search_Location_Result_Stddev_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Search_Location_Result_Stddev_Pop_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Search_Location_Result_Stddev_Samp_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "search_location_result" */
export type Search_Location_Result_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Search_Location_Result_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Search_Location_Result_Stream_Cursor_Value_Input = {
  city_id?: InputMaybe<Scalars['Int']['input']>;
  city_name?: InputMaybe<Scalars['String']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  district_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Search_Location_Result_Sum_Fields = {
  city_id?: Maybe<Scalars['Int']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type Search_Location_Result_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Search_Location_Result_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Search_Location_Result_Set_Input>;
  /** filter the rows which have to be updated */
  where: Search_Location_Result_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Search_Location_Result_Var_Pop_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Search_Location_Result_Var_Samp_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Search_Location_Result_Variance_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type Search_Locationv1_Args = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Search_Products_Args = {
  search?: InputMaybe<Scalars['String']['input']>;
};

/** User sessions */
export type Session = {
  access_expiry?: Maybe<Scalars['timestamp']['output']>;
  access_token: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  refresh_expiry?: Maybe<Scalars['timestamp']['output']>;
  refresh_token: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "session" */
export type Session_Aggregate = {
  aggregate?: Maybe<Session_Aggregate_Fields>;
  nodes: Array<Session>;
};

export type Session_Aggregate_Bool_Exp = {
  count?: InputMaybe<Session_Aggregate_Bool_Exp_Count>;
};

export type Session_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Session_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Session_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "session" */
export type Session_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Session_Max_Fields>;
  min?: Maybe<Session_Min_Fields>;
};


/** aggregate fields of "session" */
export type Session_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Session_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "session" */
export type Session_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Session_Max_Order_By>;
  min?: InputMaybe<Session_Min_Order_By>;
};

/** input type for inserting array relation for remote table "session" */
export type Session_Arr_Rel_Insert_Input = {
  data: Array<Session_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Session_On_Conflict>;
};

/** Boolean expression to filter rows from the table "session". All fields are combined with a logical 'AND'. */
export type Session_Bool_Exp = {
  _and?: InputMaybe<Array<Session_Bool_Exp>>;
  _not?: InputMaybe<Session_Bool_Exp>;
  _or?: InputMaybe<Array<Session_Bool_Exp>>;
  access_expiry?: InputMaybe<Timestamp_Comparison_Exp>;
  access_token?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  refresh_expiry?: InputMaybe<Timestamp_Comparison_Exp>;
  refresh_token?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "session" */
export type Session_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'session_pkey';

/** input type for inserting data into table "session" */
export type Session_Insert_Input = {
  access_expiry?: InputMaybe<Scalars['timestamp']['input']>;
  access_token?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  refresh_expiry?: InputMaybe<Scalars['timestamp']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Session_Max_Fields = {
  access_expiry?: Maybe<Scalars['timestamp']['output']>;
  access_token?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  refresh_expiry?: Maybe<Scalars['timestamp']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "session" */
export type Session_Max_Order_By = {
  access_expiry?: InputMaybe<Order_By>;
  access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refresh_expiry?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Session_Min_Fields = {
  access_expiry?: Maybe<Scalars['timestamp']['output']>;
  access_token?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  refresh_expiry?: Maybe<Scalars['timestamp']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "session" */
export type Session_Min_Order_By = {
  access_expiry?: InputMaybe<Order_By>;
  access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refresh_expiry?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "session" */
export type Session_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Session>;
};

/** on_conflict condition type for table "session" */
export type Session_On_Conflict = {
  constraint: Session_Constraint;
  update_columns?: Array<Session_Update_Column>;
  where?: InputMaybe<Session_Bool_Exp>;
};

/** Ordering options when selecting data from "session". */
export type Session_Order_By = {
  access_expiry?: InputMaybe<Order_By>;
  access_token?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refresh_expiry?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: session */
export type Session_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "session" */
export type Session_Select_Column =
  /** column name */
  | 'access_expiry'
  /** column name */
  | 'access_token'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'refresh_expiry'
  /** column name */
  | 'refresh_token'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "session" */
export type Session_Set_Input = {
  access_expiry?: InputMaybe<Scalars['timestamp']['input']>;
  access_token?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  refresh_expiry?: InputMaybe<Scalars['timestamp']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "session" */
export type Session_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Session_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Session_Stream_Cursor_Value_Input = {
  access_expiry?: InputMaybe<Scalars['timestamp']['input']>;
  access_token?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  refresh_expiry?: InputMaybe<Scalars['timestamp']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "session" */
export type Session_Update_Column =
  /** column name */
  | 'access_expiry'
  /** column name */
  | 'access_token'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'refresh_expiry'
  /** column name */
  | 'refresh_token'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Session_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Session_Set_Input>;
  /** filter the rows which have to be updated */
  where: Session_Bool_Exp;
};

export type Subscription_Root = {
  /** fetch data from the table: "address_type" */
  address_type: Array<Address_Type>;
  /** fetch aggregated fields from the table: "address_type" */
  address_type_aggregate: Address_Type_Aggregate;
  /** fetch data from the table: "address_type" using primary key columns */
  address_type_by_pk?: Maybe<Address_Type>;
  /** fetch data from the table in a streaming manner: "address_type" */
  address_type_stream: Array<Address_Type>;
  /** fetch data from the table: "answer" */
  answer: Array<Answer>;
  /** fetch aggregated fields from the table: "answer" */
  answer_aggregate: Answer_Aggregate;
  /** fetch data from the table: "answer" using primary key columns */
  answer_by_pk?: Maybe<Answer>;
  /** fetch data from the table in a streaming manner: "answer" */
  answer_stream: Array<Answer>;
  /** fetch data from the table: "cart" */
  cart: Array<Cart>;
  /** fetch aggregated fields from the table: "cart" */
  cart_aggregate: Cart_Aggregate;
  /** fetch data from the table: "cart" using primary key columns */
  cart_by_pk?: Maybe<Cart>;
  /** fetch data from the table in a streaming manner: "cart" */
  cart_stream: Array<Cart>;
  /** fetch data from the table: "category" */
  category: Array<Category>;
  /** fetch aggregated fields from the table: "category" */
  category_aggregate: Category_Aggregate;
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>;
  /** fetch data from the table in a streaming manner: "category" */
  category_stream: Array<Category>;
  /** fetch data from the table: "chat_thread" */
  chat_thread: Array<Chat_Thread>;
  /** fetch aggregated fields from the table: "chat_thread" */
  chat_thread_aggregate: Chat_Thread_Aggregate;
  /** fetch data from the table: "chat_thread" using primary key columns */
  chat_thread_by_pk?: Maybe<Chat_Thread>;
  /** fetch data from the table in a streaming manner: "chat_thread" */
  chat_thread_stream: Array<Chat_Thread>;
  /** fetch data from the table: "city" */
  city: Array<City>;
  /** fetch aggregated fields from the table: "city" */
  city_aggregate: City_Aggregate;
  /** fetch data from the table: "city" using primary key columns */
  city_by_pk?: Maybe<City>;
  /** fetch data from the table in a streaming manner: "city" */
  city_stream: Array<City>;
  /** fetch data from the table: "company" */
  company: Array<Company>;
  /** fetch aggregated fields from the table: "company" */
  company_aggregate: Company_Aggregate;
  /** fetch data from the table: "company" using primary key columns */
  company_by_pk?: Maybe<Company>;
  /** fetch data from the table: "company_category" */
  company_category: Array<Company_Category>;
  /** fetch aggregated fields from the table: "company_category" */
  company_category_aggregate: Company_Category_Aggregate;
  /** fetch data from the table: "company_category" using primary key columns */
  company_category_by_pk?: Maybe<Company_Category>;
  /** fetch data from the table in a streaming manner: "company_category" */
  company_category_stream: Array<Company_Category>;
  /** fetch data from the table in a streaming manner: "company" */
  company_stream: Array<Company>;
  /** fetch data from the table: "company_type" */
  company_type: Array<Company_Type>;
  /** fetch aggregated fields from the table: "company_type" */
  company_type_aggregate: Company_Type_Aggregate;
  /** fetch data from the table: "company_type" using primary key columns */
  company_type_by_pk?: Maybe<Company_Type>;
  /** fetch data from the table in a streaming manner: "company_type" */
  company_type_stream: Array<Company_Type>;
  /** fetch data from the table: "coupon" */
  coupon: Array<Coupon>;
  /** fetch aggregated fields from the table: "coupon" */
  coupon_aggregate: Coupon_Aggregate;
  /** fetch data from the table: "coupon" using primary key columns */
  coupon_by_pk?: Maybe<Coupon>;
  /** fetch data from the table in a streaming manner: "coupon" */
  coupon_stream: Array<Coupon>;
  /** fetch data from the table: "customizable_area" */
  customizable_area: Array<Customizable_Area>;
  /** fetch aggregated fields from the table: "customizable_area" */
  customizable_area_aggregate: Customizable_Area_Aggregate;
  /** fetch data from the table: "customizable_area" using primary key columns */
  customizable_area_by_pk?: Maybe<Customizable_Area>;
  /** fetch data from the table in a streaming manner: "customizable_area" */
  customizable_area_stream: Array<Customizable_Area>;
  /** fetch data from the table: "delivery_type" */
  delivery_type: Array<Delivery_Type>;
  /** fetch aggregated fields from the table: "delivery_type" */
  delivery_type_aggregate: Delivery_Type_Aggregate;
  /** fetch data from the table: "delivery_type" using primary key columns */
  delivery_type_by_pk?: Maybe<Delivery_Type>;
  /** fetch data from the table in a streaming manner: "delivery_type" */
  delivery_type_stream: Array<Delivery_Type>;
  /** fetch data from the table: "district" */
  district: Array<District>;
  /** fetch aggregated fields from the table: "district" */
  district_aggregate: District_Aggregate;
  /** fetch data from the table: "district" using primary key columns */
  district_by_pk?: Maybe<District>;
  /** fetch data from the table in a streaming manner: "district" */
  district_stream: Array<District>;
  /** fetch data from the table: "message" */
  message: Array<Message>;
  /** fetch aggregated fields from the table: "message" */
  message_aggregate: Message_Aggregate;
  /** fetch data from the table: "message" using primary key columns */
  message_by_pk?: Maybe<Message>;
  /** fetch data from the table in a streaming manner: "message" */
  message_stream: Array<Message>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch data from the table: "order_address" */
  order_address: Array<Order_Address>;
  /** fetch aggregated fields from the table: "order_address" */
  order_address_aggregate: Order_Address_Aggregate;
  /** fetch data from the table: "order_address" using primary key columns */
  order_address_by_pk?: Maybe<Order_Address>;
  /** fetch data from the table in a streaming manner: "order_address" */
  order_address_stream: Array<Order_Address>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
  /** fetch data from the table: "order_item" */
  order_item: Array<Order_Item>;
  /** fetch aggregated fields from the table: "order_item" */
  order_item_aggregate: Order_Item_Aggregate;
  /** fetch data from the table: "order_item" using primary key columns */
  order_item_by_pk?: Maybe<Order_Item>;
  /** fetch data from the table: "order_item_special_image" */
  order_item_special_image: Array<Order_Item_Special_Image>;
  /** fetch aggregated fields from the table: "order_item_special_image" */
  order_item_special_image_aggregate: Order_Item_Special_Image_Aggregate;
  /** fetch data from the table: "order_item_special_image" using primary key columns */
  order_item_special_image_by_pk?: Maybe<Order_Item_Special_Image>;
  /** fetch data from the table in a streaming manner: "order_item_special_image" */
  order_item_special_image_stream: Array<Order_Item_Special_Image>;
  /** fetch data from the table: "order_item_special_text" */
  order_item_special_text: Array<Order_Item_Special_Text>;
  /** fetch aggregated fields from the table: "order_item_special_text" */
  order_item_special_text_aggregate: Order_Item_Special_Text_Aggregate;
  /** fetch data from the table: "order_item_special_text" using primary key columns */
  order_item_special_text_by_pk?: Maybe<Order_Item_Special_Text>;
  /** fetch data from the table in a streaming manner: "order_item_special_text" */
  order_item_special_text_stream: Array<Order_Item_Special_Text>;
  /** fetch data from the table in a streaming manner: "order_item" */
  order_item_stream: Array<Order_Item>;
  /** fetch data from the table: "order_status" */
  order_status: Array<Order_Status>;
  /** fetch aggregated fields from the table: "order_status" */
  order_status_aggregate: Order_Status_Aggregate;
  /** fetch data from the table: "order_status" using primary key columns */
  order_status_by_pk?: Maybe<Order_Status>;
  /** fetch data from the table in a streaming manner: "order_status" */
  order_status_stream: Array<Order_Status>;
  /** fetch data from the table in a streaming manner: "order" */
  order_stream: Array<Order>;
  /** fetch data from the table: "order_tenant" */
  order_tenant: Array<Order_Tenant>;
  /** fetch aggregated fields from the table: "order_tenant" */
  order_tenant_aggregate: Order_Tenant_Aggregate;
  /** fetch data from the table: "order_tenant" using primary key columns */
  order_tenant_by_pk?: Maybe<Order_Tenant>;
  /** fetch data from the table: "order_tenant_invoice" */
  order_tenant_invoice: Array<Order_Tenant_Invoice>;
  /** fetch aggregated fields from the table: "order_tenant_invoice" */
  order_tenant_invoice_aggregate: Order_Tenant_Invoice_Aggregate;
  /** fetch data from the table: "order_tenant_invoice" using primary key columns */
  order_tenant_invoice_by_pk?: Maybe<Order_Tenant_Invoice>;
  /** fetch data from the table in a streaming manner: "order_tenant_invoice" */
  order_tenant_invoice_stream: Array<Order_Tenant_Invoice>;
  /** fetch data from the table in a streaming manner: "order_tenant" */
  order_tenant_stream: Array<Order_Tenant>;
  /** fetch data from the table: "payment_status" */
  payment_status: Array<Payment_Status>;
  /** fetch aggregated fields from the table: "payment_status" */
  payment_status_aggregate: Payment_Status_Aggregate;
  /** fetch data from the table: "payment_status" using primary key columns */
  payment_status_by_pk?: Maybe<Payment_Status>;
  /** fetch data from the table in a streaming manner: "payment_status" */
  payment_status_stream: Array<Payment_Status>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
  /** fetch aggregated fields from the table: "product" */
  product_aggregate: Product_Aggregate;
  /** fetch data from the table: "product" using primary key columns */
  product_by_pk?: Maybe<Product>;
  /** fetch data from the table: "product_customizable_area" */
  product_customizable_area: Array<Product_Customizable_Area>;
  /** fetch aggregated fields from the table: "product_customizable_area" */
  product_customizable_area_aggregate: Product_Customizable_Area_Aggregate;
  /** fetch data from the table: "product_customizable_area" using primary key columns */
  product_customizable_area_by_pk?: Maybe<Product_Customizable_Area>;
  /** fetch data from the table in a streaming manner: "product_customizable_area" */
  product_customizable_area_stream: Array<Product_Customizable_Area>;
  /** fetch data from the table in a streaming manner: "product" */
  product_stream: Array<Product>;
  /** fetch data from the table: "quarter" */
  quarter: Array<Quarter>;
  /** fetch aggregated fields from the table: "quarter" */
  quarter_aggregate: Quarter_Aggregate;
  /** fetch data from the table: "quarter" using primary key columns */
  quarter_by_pk?: Maybe<Quarter>;
  /** fetch data from the table in a streaming manner: "quarter" */
  quarter_stream: Array<Quarter>;
  /** fetch data from the table: "question" */
  question: Array<Question>;
  /** fetch aggregated fields from the table: "question" */
  question_aggregate: Question_Aggregate;
  /** fetch data from the table: "question" using primary key columns */
  question_by_pk?: Maybe<Question>;
  /** fetch data from the table in a streaming manner: "question" */
  question_stream: Array<Question>;
  /** fetch data from the table: "review" */
  review: Array<Review>;
  /** fetch aggregated fields from the table: "review" */
  review_aggregate: Review_Aggregate;
  /** fetch data from the table: "review" using primary key columns */
  review_by_pk?: Maybe<Review>;
  /** fetch data from the table in a streaming manner: "review" */
  review_stream: Array<Review>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: Role_Aggregate;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<Role>;
  /** fetch data from the table in a streaming manner: "role" */
  role_stream: Array<Role>;
  /** execute function "search_location" which returns "quarter" */
  search_location: Array<Quarter>;
  /** execute function "search_location" and query aggregates on result of table type "quarter" */
  search_location_aggregate: Quarter_Aggregate;
  /** fetch data from the table: "search_location_result" */
  search_location_result: Array<Search_Location_Result>;
  /** fetch aggregated fields from the table: "search_location_result" */
  search_location_result_aggregate: Search_Location_Result_Aggregate;
  /** fetch data from the table in a streaming manner: "search_location_result" */
  search_location_result_stream: Array<Search_Location_Result>;
  /** execute function "search_locationv1" which returns "search_location_result" */
  search_locationv1: Array<Search_Location_Result>;
  /** execute function "search_locationv1" and query aggregates on result of table type "search_location_result" */
  search_locationv1_aggregate: Search_Location_Result_Aggregate;
  /** execute function "search_products" which returns "product" */
  search_products: Array<Product>;
  /** execute function "search_products" and query aggregates on result of table type "product" */
  search_products_aggregate: Product_Aggregate;
  /** fetch data from the table: "session" */
  session: Array<Session>;
  /** fetch aggregated fields from the table: "session" */
  session_aggregate: Session_Aggregate;
  /** fetch data from the table: "session" using primary key columns */
  session_by_pk?: Maybe<Session>;
  /** fetch data from the table in a streaming manner: "session" */
  session_stream: Array<Session>;
  /** fetch data from the table: "system_banner" */
  system_banner: Array<System_Banner>;
  /** fetch aggregated fields from the table: "system_banner" */
  system_banner_aggregate: System_Banner_Aggregate;
  /** fetch data from the table: "system_banner" using primary key columns */
  system_banner_by_pk?: Maybe<System_Banner>;
  /** fetch data from the table in a streaming manner: "system_banner" */
  system_banner_stream: Array<System_Banner>;
  /** fetch data from the table: "tenant" */
  tenant: Array<Tenant>;
  /** fetch data from the table: "tenant_address" */
  tenant_address: Array<Tenant_Address>;
  /** fetch aggregated fields from the table: "tenant_address" */
  tenant_address_aggregate: Tenant_Address_Aggregate;
  /** fetch data from the table: "tenant_address" using primary key columns */
  tenant_address_by_pk?: Maybe<Tenant_Address>;
  /** fetch data from the table in a streaming manner: "tenant_address" */
  tenant_address_stream: Array<Tenant_Address>;
  /** fetch aggregated fields from the table: "tenant" */
  tenant_aggregate: Tenant_Aggregate;
  /** fetch data from the table: "tenant" using primary key columns */
  tenant_by_pk?: Maybe<Tenant>;
  /** fetch data from the table: "tenant_category" */
  tenant_category: Array<Tenant_Category>;
  /** fetch aggregated fields from the table: "tenant_category" */
  tenant_category_aggregate: Tenant_Category_Aggregate;
  /** fetch data from the table: "tenant_category" using primary key columns */
  tenant_category_by_pk?: Maybe<Tenant_Category>;
  /** fetch data from the table in a streaming manner: "tenant_category" */
  tenant_category_stream: Array<Tenant_Category>;
  /** fetch data from the table: "tenant_shipping_place" */
  tenant_shipping_place: Array<Tenant_Shipping_Place>;
  /** fetch aggregated fields from the table: "tenant_shipping_place" */
  tenant_shipping_place_aggregate: Tenant_Shipping_Place_Aggregate;
  /** fetch data from the table: "tenant_shipping_place" using primary key columns */
  tenant_shipping_place_by_pk?: Maybe<Tenant_Shipping_Place>;
  /** fetch data from the table in a streaming manner: "tenant_shipping_place" */
  tenant_shipping_place_stream: Array<Tenant_Shipping_Place>;
  /** fetch data from the table in a streaming manner: "tenant" */
  tenant_stream: Array<Tenant>;
  /** fetch data from the table: "ticket" */
  ticket: Array<Ticket>;
  /** fetch aggregated fields from the table: "ticket" */
  ticket_aggregate: Ticket_Aggregate;
  /** fetch data from the table: "ticket_answer" */
  ticket_answer: Array<Ticket_Answer>;
  /** fetch aggregated fields from the table: "ticket_answer" */
  ticket_answer_aggregate: Ticket_Answer_Aggregate;
  /** fetch data from the table: "ticket_answer" using primary key columns */
  ticket_answer_by_pk?: Maybe<Ticket_Answer>;
  /** fetch data from the table in a streaming manner: "ticket_answer" */
  ticket_answer_stream: Array<Ticket_Answer>;
  /** fetch data from the table: "ticket" using primary key columns */
  ticket_by_pk?: Maybe<Ticket>;
  /** fetch data from the table: "ticket_status" */
  ticket_status: Array<Ticket_Status>;
  /** fetch aggregated fields from the table: "ticket_status" */
  ticket_status_aggregate: Ticket_Status_Aggregate;
  /** fetch data from the table: "ticket_status" using primary key columns */
  ticket_status_by_pk?: Maybe<Ticket_Status>;
  /** fetch data from the table in a streaming manner: "ticket_status" */
  ticket_status_stream: Array<Ticket_Status>;
  /** fetch data from the table in a streaming manner: "ticket" */
  ticket_stream: Array<Ticket>;
  /** fetch data from the table: "transaction" */
  transaction: Array<Transaction>;
  /** fetch aggregated fields from the table: "transaction" */
  transaction_aggregate: Transaction_Aggregate;
  /** fetch data from the table: "transaction" using primary key columns */
  transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table in a streaming manner: "transaction" */
  transaction_stream: Array<Transaction>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user_address" */
  user_address: Array<User_Address>;
  /** fetch aggregated fields from the table: "user_address" */
  user_address_aggregate: User_Address_Aggregate;
  /** fetch data from the table: "user_address" using primary key columns */
  user_address_by_pk?: Maybe<User_Address>;
  /** fetch data from the table in a streaming manner: "user_address" */
  user_address_stream: Array<User_Address>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_coupon" */
  user_coupon: Array<User_Coupon>;
  /** fetch aggregated fields from the table: "user_coupon" */
  user_coupon_aggregate: User_Coupon_Aggregate;
  /** fetch data from the table: "user_coupon" using primary key columns */
  user_coupon_by_pk?: Maybe<User_Coupon>;
  /** fetch data from the table in a streaming manner: "user_coupon" */
  user_coupon_stream: Array<User_Coupon>;
  /** fetch data from the table: "user_favorite" */
  user_favorite: Array<User_Favorite>;
  /** fetch aggregated fields from the table: "user_favorite" */
  user_favorite_aggregate: User_Favorite_Aggregate;
  /** fetch data from the table: "user_favorite" using primary key columns */
  user_favorite_by_pk?: Maybe<User_Favorite>;
  /** fetch data from the table in a streaming manner: "user_favorite" */
  user_favorite_stream: Array<User_Favorite>;
  /** fetch data from the table in a streaming manner: "user" */
  user_stream: Array<User>;
};


export type Subscription_RootAddress_TypeArgs = {
  distinct_on?: InputMaybe<Array<Address_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Type_Order_By>>;
  where?: InputMaybe<Address_Type_Bool_Exp>;
};


export type Subscription_RootAddress_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Type_Order_By>>;
  where?: InputMaybe<Address_Type_Bool_Exp>;
};


export type Subscription_RootAddress_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootAddress_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Address_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Address_Type_Bool_Exp>;
};


export type Subscription_RootAnswerArgs = {
  distinct_on?: InputMaybe<Array<Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Order_By>>;
  where?: InputMaybe<Answer_Bool_Exp>;
};


export type Subscription_RootAnswer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Answer_Order_By>>;
  where?: InputMaybe<Answer_Bool_Exp>;
};


export type Subscription_RootAnswer_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootAnswer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Answer_Stream_Cursor_Input>>;
  where?: InputMaybe<Answer_Bool_Exp>;
};


export type Subscription_RootCartArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


export type Subscription_RootCart_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


export type Subscription_RootCart_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCart_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Cart_Stream_Cursor_Input>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


export type Subscription_RootCategoryArgs = {
  distinct_on?: InputMaybe<Array<Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Category_Order_By>>;
  where?: InputMaybe<Category_Bool_Exp>;
};


export type Subscription_RootCategory_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Category_Order_By>>;
  where?: InputMaybe<Category_Bool_Exp>;
};


export type Subscription_RootCategory_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootCategory_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Category_Stream_Cursor_Input>>;
  where?: InputMaybe<Category_Bool_Exp>;
};


export type Subscription_RootChat_ThreadArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


export type Subscription_RootChat_Thread_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


export type Subscription_RootChat_Thread_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootChat_Thread_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chat_Thread_Stream_Cursor_Input>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


export type Subscription_RootCityArgs = {
  distinct_on?: InputMaybe<Array<City_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<City_Order_By>>;
  where?: InputMaybe<City_Bool_Exp>;
};


export type Subscription_RootCity_AggregateArgs = {
  distinct_on?: InputMaybe<Array<City_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<City_Order_By>>;
  where?: InputMaybe<City_Bool_Exp>;
};


export type Subscription_RootCity_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootCity_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<City_Stream_Cursor_Input>>;
  where?: InputMaybe<City_Bool_Exp>;
};


export type Subscription_RootCompanyArgs = {
  distinct_on?: InputMaybe<Array<Company_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Order_By>>;
  where?: InputMaybe<Company_Bool_Exp>;
};


export type Subscription_RootCompany_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Company_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Order_By>>;
  where?: InputMaybe<Company_Bool_Exp>;
};


export type Subscription_RootCompany_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCompany_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Company_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Category_Order_By>>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};


export type Subscription_RootCompany_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Company_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Category_Order_By>>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};


export type Subscription_RootCompany_Category_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootCompany_Category_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Company_Category_Stream_Cursor_Input>>;
  where?: InputMaybe<Company_Category_Bool_Exp>;
};


export type Subscription_RootCompany_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Company_Stream_Cursor_Input>>;
  where?: InputMaybe<Company_Bool_Exp>;
};


export type Subscription_RootCompany_TypeArgs = {
  distinct_on?: InputMaybe<Array<Company_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Type_Order_By>>;
  where?: InputMaybe<Company_Type_Bool_Exp>;
};


export type Subscription_RootCompany_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Company_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Type_Order_By>>;
  where?: InputMaybe<Company_Type_Bool_Exp>;
};


export type Subscription_RootCompany_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootCompany_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Company_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Company_Type_Bool_Exp>;
};


export type Subscription_RootCouponArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Order_By>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Subscription_RootCoupon_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Order_By>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Subscription_RootCoupon_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCoupon_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Coupon_Stream_Cursor_Input>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Subscription_RootCustomizable_AreaArgs = {
  distinct_on?: InputMaybe<Array<Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Customizable_Area_Order_By>>;
  where?: InputMaybe<Customizable_Area_Bool_Exp>;
};


export type Subscription_RootCustomizable_Area_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Customizable_Area_Order_By>>;
  where?: InputMaybe<Customizable_Area_Bool_Exp>;
};


export type Subscription_RootCustomizable_Area_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootCustomizable_Area_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Customizable_Area_Stream_Cursor_Input>>;
  where?: InputMaybe<Customizable_Area_Bool_Exp>;
};


export type Subscription_RootDelivery_TypeArgs = {
  distinct_on?: InputMaybe<Array<Delivery_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delivery_Type_Order_By>>;
  where?: InputMaybe<Delivery_Type_Bool_Exp>;
};


export type Subscription_RootDelivery_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Delivery_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delivery_Type_Order_By>>;
  where?: InputMaybe<Delivery_Type_Bool_Exp>;
};


export type Subscription_RootDelivery_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootDelivery_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Delivery_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Delivery_Type_Bool_Exp>;
};


export type Subscription_RootDistrictArgs = {
  distinct_on?: InputMaybe<Array<District_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<District_Order_By>>;
  where?: InputMaybe<District_Bool_Exp>;
};


export type Subscription_RootDistrict_AggregateArgs = {
  distinct_on?: InputMaybe<Array<District_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<District_Order_By>>;
  where?: InputMaybe<District_Bool_Exp>;
};


export type Subscription_RootDistrict_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootDistrict_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<District_Stream_Cursor_Input>>;
  where?: InputMaybe<District_Bool_Exp>;
};


export type Subscription_RootMessageArgs = {
  distinct_on?: InputMaybe<Array<Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Message_Order_By>>;
  where?: InputMaybe<Message_Bool_Exp>;
};


export type Subscription_RootMessage_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Message_Order_By>>;
  where?: InputMaybe<Message_Bool_Exp>;
};


export type Subscription_RootMessage_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootMessage_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Message_Stream_Cursor_Input>>;
  where?: InputMaybe<Message_Bool_Exp>;
};


export type Subscription_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Subscription_RootOrder_AddressArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


export type Subscription_RootOrder_Address_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Address_Order_By>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


export type Subscription_RootOrder_Address_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootOrder_Address_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Order_Address_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Address_Bool_Exp>;
};


export type Subscription_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Subscription_RootOrder_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootOrder_ItemArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Subscription_RootOrder_Item_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Order_By>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Subscription_RootOrder_Item_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootOrder_Item_Special_ImageArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Image_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Image_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
};


export type Subscription_RootOrder_Item_Special_Image_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Image_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Image_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
};


export type Subscription_RootOrder_Item_Special_Image_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootOrder_Item_Special_Image_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Order_Item_Special_Image_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Item_Special_Image_Bool_Exp>;
};


export type Subscription_RootOrder_Item_Special_TextArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Text_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Text_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
};


export type Subscription_RootOrder_Item_Special_Text_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Item_Special_Text_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Item_Special_Text_Order_By>>;
  where?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
};


export type Subscription_RootOrder_Item_Special_Text_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootOrder_Item_Special_Text_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Order_Item_Special_Text_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Item_Special_Text_Bool_Exp>;
};


export type Subscription_RootOrder_Item_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Order_Item_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Item_Bool_Exp>;
};


export type Subscription_RootOrder_StatusArgs = {
  distinct_on?: InputMaybe<Array<Order_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Status_Order_By>>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};


export type Subscription_RootOrder_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Status_Order_By>>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};


export type Subscription_RootOrder_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootOrder_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Order_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Status_Bool_Exp>;
};


export type Subscription_RootOrder_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Order_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Subscription_RootOrder_TenantArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Order_By>>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};


export type Subscription_RootOrder_Tenant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Order_By>>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};


export type Subscription_RootOrder_Tenant_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootOrder_Tenant_InvoiceArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Invoice_Order_By>>;
  where?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
};


export type Subscription_RootOrder_Tenant_Invoice_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Tenant_Invoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Tenant_Invoice_Order_By>>;
  where?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
};


export type Subscription_RootOrder_Tenant_Invoice_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootOrder_Tenant_Invoice_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Order_Tenant_Invoice_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Tenant_Invoice_Bool_Exp>;
};


export type Subscription_RootOrder_Tenant_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Order_Tenant_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Tenant_Bool_Exp>;
};


export type Subscription_RootPayment_StatusArgs = {
  distinct_on?: InputMaybe<Array<Payment_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Payment_Status_Order_By>>;
  where?: InputMaybe<Payment_Status_Bool_Exp>;
};


export type Subscription_RootPayment_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payment_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Payment_Status_Order_By>>;
  where?: InputMaybe<Payment_Status_Bool_Exp>;
};


export type Subscription_RootPayment_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootPayment_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Payment_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Payment_Status_Bool_Exp>;
};


export type Subscription_RootProductArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Subscription_RootProduct_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Subscription_RootProduct_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootProduct_Customizable_AreaArgs = {
  distinct_on?: InputMaybe<Array<Product_Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Customizable_Area_Order_By>>;
  where?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
};


export type Subscription_RootProduct_Customizable_Area_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Customizable_Area_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Customizable_Area_Order_By>>;
  where?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
};


export type Subscription_RootProduct_Customizable_Area_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootProduct_Customizable_Area_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Product_Customizable_Area_Stream_Cursor_Input>>;
  where?: InputMaybe<Product_Customizable_Area_Bool_Exp>;
};


export type Subscription_RootProduct_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Product_Stream_Cursor_Input>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Subscription_RootQuarterArgs = {
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


export type Subscription_RootQuarter_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


export type Subscription_RootQuarter_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootQuarter_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Quarter_Stream_Cursor_Input>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


export type Subscription_RootQuestionArgs = {
  distinct_on?: InputMaybe<Array<Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Order_By>>;
  where?: InputMaybe<Question_Bool_Exp>;
};


export type Subscription_RootQuestion_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Order_By>>;
  where?: InputMaybe<Question_Bool_Exp>;
};


export type Subscription_RootQuestion_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootQuestion_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Question_Stream_Cursor_Input>>;
  where?: InputMaybe<Question_Bool_Exp>;
};


export type Subscription_RootReviewArgs = {
  distinct_on?: InputMaybe<Array<Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Review_Order_By>>;
  where?: InputMaybe<Review_Bool_Exp>;
};


export type Subscription_RootReview_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Review_Order_By>>;
  where?: InputMaybe<Review_Bool_Exp>;
};


export type Subscription_RootReview_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootReview_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Review_Stream_Cursor_Input>>;
  where?: InputMaybe<Review_Bool_Exp>;
};


export type Subscription_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRole_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootRole_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Role_Stream_Cursor_Input>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootSearch_LocationArgs = {
  args: Search_Location_Args;
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


export type Subscription_RootSearch_Location_AggregateArgs = {
  args: Search_Location_Args;
  distinct_on?: InputMaybe<Array<Quarter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quarter_Order_By>>;
  where?: InputMaybe<Quarter_Bool_Exp>;
};


export type Subscription_RootSearch_Location_ResultArgs = {
  distinct_on?: InputMaybe<Array<Search_Location_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Search_Location_Result_Order_By>>;
  where?: InputMaybe<Search_Location_Result_Bool_Exp>;
};


export type Subscription_RootSearch_Location_Result_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Search_Location_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Search_Location_Result_Order_By>>;
  where?: InputMaybe<Search_Location_Result_Bool_Exp>;
};


export type Subscription_RootSearch_Location_Result_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Search_Location_Result_Stream_Cursor_Input>>;
  where?: InputMaybe<Search_Location_Result_Bool_Exp>;
};


export type Subscription_RootSearch_Locationv1Args = {
  args: Search_Locationv1_Args;
  distinct_on?: InputMaybe<Array<Search_Location_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Search_Location_Result_Order_By>>;
  where?: InputMaybe<Search_Location_Result_Bool_Exp>;
};


export type Subscription_RootSearch_Locationv1_AggregateArgs = {
  args: Search_Locationv1_Args;
  distinct_on?: InputMaybe<Array<Search_Location_Result_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Search_Location_Result_Order_By>>;
  where?: InputMaybe<Search_Location_Result_Bool_Exp>;
};


export type Subscription_RootSearch_ProductsArgs = {
  args: Search_Products_Args;
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Subscription_RootSearch_Products_AggregateArgs = {
  args: Search_Products_Args;
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


export type Subscription_RootSessionArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


export type Subscription_RootSession_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


export type Subscription_RootSession_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSession_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Session_Stream_Cursor_Input>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


export type Subscription_RootSystem_BannerArgs = {
  distinct_on?: InputMaybe<Array<System_Banner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<System_Banner_Order_By>>;
  where?: InputMaybe<System_Banner_Bool_Exp>;
};


export type Subscription_RootSystem_Banner_AggregateArgs = {
  distinct_on?: InputMaybe<Array<System_Banner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<System_Banner_Order_By>>;
  where?: InputMaybe<System_Banner_Bool_Exp>;
};


export type Subscription_RootSystem_Banner_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSystem_Banner_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<System_Banner_Stream_Cursor_Input>>;
  where?: InputMaybe<System_Banner_Bool_Exp>;
};


export type Subscription_RootTenantArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Subscription_RootTenant_AddressArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Address_Order_By>>;
  where?: InputMaybe<Tenant_Address_Bool_Exp>;
};


export type Subscription_RootTenant_Address_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Address_Order_By>>;
  where?: InputMaybe<Tenant_Address_Bool_Exp>;
};


export type Subscription_RootTenant_Address_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTenant_Address_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tenant_Address_Stream_Cursor_Input>>;
  where?: InputMaybe<Tenant_Address_Bool_Exp>;
};


export type Subscription_RootTenant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Subscription_RootTenant_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTenant_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Category_Order_By>>;
  where?: InputMaybe<Tenant_Category_Bool_Exp>;
};


export type Subscription_RootTenant_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Category_Order_By>>;
  where?: InputMaybe<Tenant_Category_Bool_Exp>;
};


export type Subscription_RootTenant_Category_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootTenant_Category_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tenant_Category_Stream_Cursor_Input>>;
  where?: InputMaybe<Tenant_Category_Bool_Exp>;
};


export type Subscription_RootTenant_Shipping_PlaceArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Shipping_Place_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Shipping_Place_Order_By>>;
  where?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
};


export type Subscription_RootTenant_Shipping_Place_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Shipping_Place_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Shipping_Place_Order_By>>;
  where?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
};


export type Subscription_RootTenant_Shipping_Place_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootTenant_Shipping_Place_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tenant_Shipping_Place_Stream_Cursor_Input>>;
  where?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
};


export type Subscription_RootTenant_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tenant_Stream_Cursor_Input>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


export type Subscription_RootTicketArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Order_By>>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};


export type Subscription_RootTicket_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Order_By>>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};


export type Subscription_RootTicket_AnswerArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Answer_Order_By>>;
  where?: InputMaybe<Ticket_Answer_Bool_Exp>;
};


export type Subscription_RootTicket_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Answer_Order_By>>;
  where?: InputMaybe<Ticket_Answer_Bool_Exp>;
};


export type Subscription_RootTicket_Answer_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTicket_Answer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ticket_Answer_Stream_Cursor_Input>>;
  where?: InputMaybe<Ticket_Answer_Bool_Exp>;
};


export type Subscription_RootTicket_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootTicket_StatusArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Status_Order_By>>;
  where?: InputMaybe<Ticket_Status_Bool_Exp>;
};


export type Subscription_RootTicket_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Status_Order_By>>;
  where?: InputMaybe<Ticket_Status_Bool_Exp>;
};


export type Subscription_RootTicket_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootTicket_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ticket_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Ticket_Status_Bool_Exp>;
};


export type Subscription_RootTicket_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ticket_Stream_Cursor_Input>>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};


export type Subscription_RootTransactionArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Subscription_RootTransaction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transaction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transaction_Order_By>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Subscription_RootTransaction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTransaction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Transaction_Stream_Cursor_Input>>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_AddressArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};


export type Subscription_RootUser_Address_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};


export type Subscription_RootUser_Address_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootUser_Address_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Address_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_CouponArgs = {
  distinct_on?: InputMaybe<Array<User_Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Coupon_Order_By>>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};


export type Subscription_RootUser_Coupon_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Coupon_Order_By>>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};


export type Subscription_RootUser_Coupon_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_Coupon_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Coupon_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};


export type Subscription_RootUser_FavoriteArgs = {
  distinct_on?: InputMaybe<Array<User_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Favorite_Order_By>>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};


export type Subscription_RootUser_Favorite_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Favorite_Order_By>>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};


export type Subscription_RootUser_Favorite_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootUser_Favorite_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Favorite_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};


export type Subscription_RootUser_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** columns and relationships of "system_banner" */
export type System_Banner = {
  created_at: Scalars['timestamptz']['output'];
  expire_date?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  redirect_link: Scalars['String']['output'];
};

/** aggregated selection of "system_banner" */
export type System_Banner_Aggregate = {
  aggregate?: Maybe<System_Banner_Aggregate_Fields>;
  nodes: Array<System_Banner>;
};

/** aggregate fields of "system_banner" */
export type System_Banner_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<System_Banner_Max_Fields>;
  min?: Maybe<System_Banner_Min_Fields>;
};


/** aggregate fields of "system_banner" */
export type System_Banner_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<System_Banner_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "system_banner". All fields are combined with a logical 'AND'. */
export type System_Banner_Bool_Exp = {
  _and?: InputMaybe<Array<System_Banner_Bool_Exp>>;
  _not?: InputMaybe<System_Banner_Bool_Exp>;
  _or?: InputMaybe<Array<System_Banner_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  expire_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  path?: InputMaybe<String_Comparison_Exp>;
  redirect_link?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "system_banner" */
export type System_Banner_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'system_banner_pkey';

/** input type for inserting data into table "system_banner" */
export type System_Banner_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expire_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  redirect_link?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type System_Banner_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expire_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  redirect_link?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type System_Banner_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expire_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  redirect_link?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "system_banner" */
export type System_Banner_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<System_Banner>;
};

/** on_conflict condition type for table "system_banner" */
export type System_Banner_On_Conflict = {
  constraint: System_Banner_Constraint;
  update_columns?: Array<System_Banner_Update_Column>;
  where?: InputMaybe<System_Banner_Bool_Exp>;
};

/** Ordering options when selecting data from "system_banner". */
export type System_Banner_Order_By = {
  created_at?: InputMaybe<Order_By>;
  expire_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  path?: InputMaybe<Order_By>;
  redirect_link?: InputMaybe<Order_By>;
};

/** primary key columns input for table: system_banner */
export type System_Banner_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "system_banner" */
export type System_Banner_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'expire_date'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'path'
  /** column name */
  | 'redirect_link';

/** input type for updating data in table "system_banner" */
export type System_Banner_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expire_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  redirect_link?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "system_banner" */
export type System_Banner_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: System_Banner_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type System_Banner_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expire_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  redirect_link?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "system_banner" */
export type System_Banner_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'expire_date'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'path'
  /** column name */
  | 'redirect_link';

export type System_Banner_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<System_Banner_Set_Input>;
  /** filter the rows which have to be updated */
  where: System_Banner_Bool_Exp;
};

/** columns and relationships of "tenant" */
export type Tenant = {
  address?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  categories: Array<Tenant_Category>;
  /** An aggregate relationship */
  categories_aggregate: Tenant_Category_Aggregate;
  commision_rate?: Maybe<Scalars['numeric']['output']>;
  company_type?: Maybe<Company_Type_Enum>;
  /** An object relationship */
  company_type_rel?: Maybe<Company_Type>;
  created_at: Scalars['timestamptz']['output'];
  iban?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  is_active: Scalars['Boolean']['output'];
  iyzi_sub_merchant_key?: Maybe<Scalars['String']['output']>;
  legal_company_title?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  owner: User;
  owner_id: Scalars['uuid']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  quarter?: Maybe<Quarter>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  tax_office_name?: Maybe<Scalars['String']['output']>;
  tax_plate_url?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  tax_quarter?: Maybe<Quarter>;
  tax_quarter_id?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  tenant_addresses: Array<Tenant_Address>;
  /** An aggregate relationship */
  tenant_addresses_aggregate: Tenant_Address_Aggregate;
  /** An array relationship */
  tenant_shipping_places: Array<Tenant_Shipping_Place>;
  /** An aggregate relationship */
  tenant_shipping_places_aggregate: Tenant_Shipping_Place_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
  vkn_tckn?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "tenant" */
export type TenantCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Category_Order_By>>;
  where?: InputMaybe<Tenant_Category_Bool_Exp>;
};


/** columns and relationships of "tenant" */
export type TenantCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Category_Order_By>>;
  where?: InputMaybe<Tenant_Category_Bool_Exp>;
};


/** columns and relationships of "tenant" */
export type TenantTenant_AddressesArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Address_Order_By>>;
  where?: InputMaybe<Tenant_Address_Bool_Exp>;
};


/** columns and relationships of "tenant" */
export type TenantTenant_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Address_Order_By>>;
  where?: InputMaybe<Tenant_Address_Bool_Exp>;
};


/** columns and relationships of "tenant" */
export type TenantTenant_Shipping_PlacesArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Shipping_Place_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Shipping_Place_Order_By>>;
  where?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
};


/** columns and relationships of "tenant" */
export type TenantTenant_Shipping_Places_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Shipping_Place_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Shipping_Place_Order_By>>;
  where?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
};

/** columns and relationships of "tenant_address" */
export type Tenant_Address = {
  address: Scalars['String']['output'];
  /** An object relationship */
  address_type?: Maybe<Address_Type>;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  quarter: Quarter;
  quarter_id: Scalars['Int']['output'];
  /** An object relationship */
  tenant?: Maybe<Tenant>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  type?: Maybe<Address_Type_Enum>;
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "tenant_address" */
export type Tenant_Address_Aggregate = {
  aggregate?: Maybe<Tenant_Address_Aggregate_Fields>;
  nodes: Array<Tenant_Address>;
};

export type Tenant_Address_Aggregate_Bool_Exp = {
  count?: InputMaybe<Tenant_Address_Aggregate_Bool_Exp_Count>;
};

export type Tenant_Address_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Tenant_Address_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Tenant_Address_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "tenant_address" */
export type Tenant_Address_Aggregate_Fields = {
  avg?: Maybe<Tenant_Address_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Tenant_Address_Max_Fields>;
  min?: Maybe<Tenant_Address_Min_Fields>;
  stddev?: Maybe<Tenant_Address_Stddev_Fields>;
  stddev_pop?: Maybe<Tenant_Address_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tenant_Address_Stddev_Samp_Fields>;
  sum?: Maybe<Tenant_Address_Sum_Fields>;
  var_pop?: Maybe<Tenant_Address_Var_Pop_Fields>;
  var_samp?: Maybe<Tenant_Address_Var_Samp_Fields>;
  variance?: Maybe<Tenant_Address_Variance_Fields>;
};


/** aggregate fields of "tenant_address" */
export type Tenant_Address_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tenant_Address_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "tenant_address" */
export type Tenant_Address_Aggregate_Order_By = {
  avg?: InputMaybe<Tenant_Address_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tenant_Address_Max_Order_By>;
  min?: InputMaybe<Tenant_Address_Min_Order_By>;
  stddev?: InputMaybe<Tenant_Address_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Tenant_Address_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Tenant_Address_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Tenant_Address_Sum_Order_By>;
  var_pop?: InputMaybe<Tenant_Address_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Tenant_Address_Var_Samp_Order_By>;
  variance?: InputMaybe<Tenant_Address_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "tenant_address" */
export type Tenant_Address_Arr_Rel_Insert_Input = {
  data: Array<Tenant_Address_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Tenant_Address_On_Conflict>;
};

/** aggregate avg on columns */
export type Tenant_Address_Avg_Fields = {
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "tenant_address" */
export type Tenant_Address_Avg_Order_By = {
  quarter_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "tenant_address". All fields are combined with a logical 'AND'. */
export type Tenant_Address_Bool_Exp = {
  _and?: InputMaybe<Array<Tenant_Address_Bool_Exp>>;
  _not?: InputMaybe<Tenant_Address_Bool_Exp>;
  _or?: InputMaybe<Array<Tenant_Address_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  address_type?: InputMaybe<Address_Type_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  quarter?: InputMaybe<Quarter_Bool_Exp>;
  quarter_id?: InputMaybe<Int_Comparison_Exp>;
  tenant?: InputMaybe<Tenant_Bool_Exp>;
  tenant_id?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Address_Type_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "tenant_address" */
export type Tenant_Address_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'tenant_address_pkey';

/** input type for incrementing numeric columns in table "tenant_address" */
export type Tenant_Address_Inc_Input = {
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "tenant_address" */
export type Tenant_Address_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_type?: InputMaybe<Address_Type_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  quarter?: InputMaybe<Quarter_Obj_Rel_Insert_Input>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  tenant?: InputMaybe<Tenant_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Address_Type_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Tenant_Address_Max_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "tenant_address" */
export type Tenant_Address_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Tenant_Address_Min_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "tenant_address" */
export type Tenant_Address_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "tenant_address" */
export type Tenant_Address_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Tenant_Address>;
};

/** on_conflict condition type for table "tenant_address" */
export type Tenant_Address_On_Conflict = {
  constraint: Tenant_Address_Constraint;
  update_columns?: Array<Tenant_Address_Update_Column>;
  where?: InputMaybe<Tenant_Address_Bool_Exp>;
};

/** Ordering options when selecting data from "tenant_address". */
export type Tenant_Address_Order_By = {
  address?: InputMaybe<Order_By>;
  address_type?: InputMaybe<Address_Type_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter?: InputMaybe<Quarter_Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tenant?: InputMaybe<Tenant_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: tenant_address */
export type Tenant_Address_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "tenant_address" */
export type Tenant_Address_Select_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'quarter_id'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "tenant_address" */
export type Tenant_Address_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Address_Type_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Tenant_Address_Stddev_Fields = {
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "tenant_address" */
export type Tenant_Address_Stddev_Order_By = {
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Tenant_Address_Stddev_Pop_Fields = {
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "tenant_address" */
export type Tenant_Address_Stddev_Pop_Order_By = {
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Tenant_Address_Stddev_Samp_Fields = {
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "tenant_address" */
export type Tenant_Address_Stddev_Samp_Order_By = {
  quarter_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "tenant_address" */
export type Tenant_Address_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tenant_Address_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tenant_Address_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Address_Type_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Tenant_Address_Sum_Fields = {
  quarter_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "tenant_address" */
export type Tenant_Address_Sum_Order_By = {
  quarter_id?: InputMaybe<Order_By>;
};

/** update columns of table "tenant_address" */
export type Tenant_Address_Update_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'quarter_id'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at';

export type Tenant_Address_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Tenant_Address_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tenant_Address_Set_Input>;
  /** filter the rows which have to be updated */
  where: Tenant_Address_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Tenant_Address_Var_Pop_Fields = {
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "tenant_address" */
export type Tenant_Address_Var_Pop_Order_By = {
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Tenant_Address_Var_Samp_Fields = {
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "tenant_address" */
export type Tenant_Address_Var_Samp_Order_By = {
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Tenant_Address_Variance_Fields = {
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "tenant_address" */
export type Tenant_Address_Variance_Order_By = {
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregated selection of "tenant" */
export type Tenant_Aggregate = {
  aggregate?: Maybe<Tenant_Aggregate_Fields>;
  nodes: Array<Tenant>;
};

export type Tenant_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Tenant_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Tenant_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Tenant_Aggregate_Bool_Exp_Count>;
};

export type Tenant_Aggregate_Bool_Exp_Bool_And = {
  arguments: Tenant_Select_Column_Tenant_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Tenant_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Tenant_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Tenant_Select_Column_Tenant_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Tenant_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Tenant_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Tenant_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Tenant_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "tenant" */
export type Tenant_Aggregate_Fields = {
  avg?: Maybe<Tenant_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Tenant_Max_Fields>;
  min?: Maybe<Tenant_Min_Fields>;
  stddev?: Maybe<Tenant_Stddev_Fields>;
  stddev_pop?: Maybe<Tenant_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tenant_Stddev_Samp_Fields>;
  sum?: Maybe<Tenant_Sum_Fields>;
  var_pop?: Maybe<Tenant_Var_Pop_Fields>;
  var_samp?: Maybe<Tenant_Var_Samp_Fields>;
  variance?: Maybe<Tenant_Variance_Fields>;
};


/** aggregate fields of "tenant" */
export type Tenant_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tenant_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "tenant" */
export type Tenant_Aggregate_Order_By = {
  avg?: InputMaybe<Tenant_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tenant_Max_Order_By>;
  min?: InputMaybe<Tenant_Min_Order_By>;
  stddev?: InputMaybe<Tenant_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Tenant_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Tenant_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Tenant_Sum_Order_By>;
  var_pop?: InputMaybe<Tenant_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Tenant_Var_Samp_Order_By>;
  variance?: InputMaybe<Tenant_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "tenant" */
export type Tenant_Arr_Rel_Insert_Input = {
  data: Array<Tenant_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Tenant_On_Conflict>;
};

/** aggregate avg on columns */
export type Tenant_Avg_Fields = {
  commision_rate?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
  tax_quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "tenant" */
export type Tenant_Avg_Order_By = {
  commision_rate?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "tenant". All fields are combined with a logical 'AND'. */
export type Tenant_Bool_Exp = {
  _and?: InputMaybe<Array<Tenant_Bool_Exp>>;
  _not?: InputMaybe<Tenant_Bool_Exp>;
  _or?: InputMaybe<Array<Tenant_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  categories?: InputMaybe<Tenant_Category_Bool_Exp>;
  categories_aggregate?: InputMaybe<Tenant_Category_Aggregate_Bool_Exp>;
  commision_rate?: InputMaybe<Numeric_Comparison_Exp>;
  company_type?: InputMaybe<Company_Type_Enum_Comparison_Exp>;
  company_type_rel?: InputMaybe<Company_Type_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  iban?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  iyzi_sub_merchant_key?: InputMaybe<String_Comparison_Exp>;
  legal_company_title?: InputMaybe<String_Comparison_Exp>;
  logo?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owner?: InputMaybe<User_Bool_Exp>;
  owner_id?: InputMaybe<Uuid_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  quarter?: InputMaybe<Quarter_Bool_Exp>;
  quarter_id?: InputMaybe<Int_Comparison_Exp>;
  tax_office_name?: InputMaybe<String_Comparison_Exp>;
  tax_plate_url?: InputMaybe<String_Comparison_Exp>;
  tax_quarter?: InputMaybe<Quarter_Bool_Exp>;
  tax_quarter_id?: InputMaybe<Int_Comparison_Exp>;
  tenant_addresses?: InputMaybe<Tenant_Address_Bool_Exp>;
  tenant_addresses_aggregate?: InputMaybe<Tenant_Address_Aggregate_Bool_Exp>;
  tenant_shipping_places?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
  tenant_shipping_places_aggregate?: InputMaybe<Tenant_Shipping_Place_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  vkn_tckn?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "tenant_category" */
export type Tenant_Category = {
  /** An object relationship */
  category: Category;
  category_id: Scalars['Int']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** An object relationship */
  tenant: Tenant;
  tenant_id: Scalars['uuid']['output'];
};

/** aggregated selection of "tenant_category" */
export type Tenant_Category_Aggregate = {
  aggregate?: Maybe<Tenant_Category_Aggregate_Fields>;
  nodes: Array<Tenant_Category>;
};

export type Tenant_Category_Aggregate_Bool_Exp = {
  count?: InputMaybe<Tenant_Category_Aggregate_Bool_Exp_Count>;
};

export type Tenant_Category_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Tenant_Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Tenant_Category_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "tenant_category" */
export type Tenant_Category_Aggregate_Fields = {
  avg?: Maybe<Tenant_Category_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Tenant_Category_Max_Fields>;
  min?: Maybe<Tenant_Category_Min_Fields>;
  stddev?: Maybe<Tenant_Category_Stddev_Fields>;
  stddev_pop?: Maybe<Tenant_Category_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tenant_Category_Stddev_Samp_Fields>;
  sum?: Maybe<Tenant_Category_Sum_Fields>;
  var_pop?: Maybe<Tenant_Category_Var_Pop_Fields>;
  var_samp?: Maybe<Tenant_Category_Var_Samp_Fields>;
  variance?: Maybe<Tenant_Category_Variance_Fields>;
};


/** aggregate fields of "tenant_category" */
export type Tenant_Category_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tenant_Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "tenant_category" */
export type Tenant_Category_Aggregate_Order_By = {
  avg?: InputMaybe<Tenant_Category_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tenant_Category_Max_Order_By>;
  min?: InputMaybe<Tenant_Category_Min_Order_By>;
  stddev?: InputMaybe<Tenant_Category_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Tenant_Category_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Tenant_Category_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Tenant_Category_Sum_Order_By>;
  var_pop?: InputMaybe<Tenant_Category_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Tenant_Category_Var_Samp_Order_By>;
  variance?: InputMaybe<Tenant_Category_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "tenant_category" */
export type Tenant_Category_Arr_Rel_Insert_Input = {
  data: Array<Tenant_Category_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Tenant_Category_On_Conflict>;
};

/** aggregate avg on columns */
export type Tenant_Category_Avg_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "tenant_category" */
export type Tenant_Category_Avg_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "tenant_category". All fields are combined with a logical 'AND'. */
export type Tenant_Category_Bool_Exp = {
  _and?: InputMaybe<Array<Tenant_Category_Bool_Exp>>;
  _not?: InputMaybe<Tenant_Category_Bool_Exp>;
  _or?: InputMaybe<Array<Tenant_Category_Bool_Exp>>;
  category?: InputMaybe<Category_Bool_Exp>;
  category_id?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  tenant?: InputMaybe<Tenant_Bool_Exp>;
  tenant_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "tenant_category" */
export type Tenant_Category_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'tenant_category_pkey'
  /** unique or primary key constraint on columns "category_id", "tenant_id" */
  | 'tenant_category_tenant_id_category_id_key';

/** input type for incrementing numeric columns in table "tenant_category" */
export type Tenant_Category_Inc_Input = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "tenant_category" */
export type Tenant_Category_Insert_Input = {
  category?: InputMaybe<Category_Obj_Rel_Insert_Input>;
  category_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  tenant?: InputMaybe<Tenant_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Tenant_Category_Max_Fields = {
  category_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "tenant_category" */
export type Tenant_Category_Max_Order_By = {
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Tenant_Category_Min_Fields = {
  category_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "tenant_category" */
export type Tenant_Category_Min_Order_By = {
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "tenant_category" */
export type Tenant_Category_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Tenant_Category>;
};

/** on_conflict condition type for table "tenant_category" */
export type Tenant_Category_On_Conflict = {
  constraint: Tenant_Category_Constraint;
  update_columns?: Array<Tenant_Category_Update_Column>;
  where?: InputMaybe<Tenant_Category_Bool_Exp>;
};

/** Ordering options when selecting data from "tenant_category". */
export type Tenant_Category_Order_By = {
  category?: InputMaybe<Category_Order_By>;
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  tenant?: InputMaybe<Tenant_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: tenant_category */
export type Tenant_Category_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "tenant_category" */
export type Tenant_Category_Select_Column =
  /** column name */
  | 'category_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'tenant_id';

/** input type for updating data in table "tenant_category" */
export type Tenant_Category_Set_Input = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Tenant_Category_Stddev_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "tenant_category" */
export type Tenant_Category_Stddev_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Tenant_Category_Stddev_Pop_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "tenant_category" */
export type Tenant_Category_Stddev_Pop_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Tenant_Category_Stddev_Samp_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "tenant_category" */
export type Tenant_Category_Stddev_Samp_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "tenant_category" */
export type Tenant_Category_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tenant_Category_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tenant_Category_Stream_Cursor_Value_Input = {
  category_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Tenant_Category_Sum_Fields = {
  category_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "tenant_category" */
export type Tenant_Category_Sum_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "tenant_category" */
export type Tenant_Category_Update_Column =
  /** column name */
  | 'category_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'tenant_id';

export type Tenant_Category_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Tenant_Category_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tenant_Category_Set_Input>;
  /** filter the rows which have to be updated */
  where: Tenant_Category_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Tenant_Category_Var_Pop_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "tenant_category" */
export type Tenant_Category_Var_Pop_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Tenant_Category_Var_Samp_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "tenant_category" */
export type Tenant_Category_Var_Samp_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Tenant_Category_Variance_Fields = {
  category_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "tenant_category" */
export type Tenant_Category_Variance_Order_By = {
  category_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** unique or primary key constraints on table "tenant" */
export type Tenant_Constraint =
  /** unique or primary key constraint on columns "owner_id" */
  | 'tenant_owner_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'tenant_pkey';

/** input type for incrementing numeric columns in table "tenant" */
export type Tenant_Inc_Input = {
  commision_rate?: InputMaybe<Scalars['numeric']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  tax_quarter_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "tenant" */
export type Tenant_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Tenant_Category_Arr_Rel_Insert_Input>;
  commision_rate?: InputMaybe<Scalars['numeric']['input']>;
  company_type?: InputMaybe<Company_Type_Enum>;
  company_type_rel?: InputMaybe<Company_Type_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  iyzi_sub_merchant_key?: InputMaybe<Scalars['String']['input']>;
  legal_company_title?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<User_Obj_Rel_Insert_Input>;
  owner_id?: InputMaybe<Scalars['uuid']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  quarter?: InputMaybe<Quarter_Obj_Rel_Insert_Input>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  tax_office_name?: InputMaybe<Scalars['String']['input']>;
  tax_plate_url?: InputMaybe<Scalars['String']['input']>;
  tax_quarter?: InputMaybe<Quarter_Obj_Rel_Insert_Input>;
  tax_quarter_id?: InputMaybe<Scalars['Int']['input']>;
  tenant_addresses?: InputMaybe<Tenant_Address_Arr_Rel_Insert_Input>;
  tenant_shipping_places?: InputMaybe<Tenant_Shipping_Place_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  vkn_tckn?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Tenant_Max_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  commision_rate?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  iyzi_sub_merchant_key?: Maybe<Scalars['String']['output']>;
  legal_company_title?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['uuid']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  tax_office_name?: Maybe<Scalars['String']['output']>;
  tax_plate_url?: Maybe<Scalars['String']['output']>;
  tax_quarter_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  vkn_tckn?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "tenant" */
export type Tenant_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  commision_rate?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  iban?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  iyzi_sub_merchant_key?: InputMaybe<Order_By>;
  legal_company_title?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_office_name?: InputMaybe<Order_By>;
  tax_plate_url?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vkn_tckn?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Tenant_Min_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  commision_rate?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  iban?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  iyzi_sub_merchant_key?: Maybe<Scalars['String']['output']>;
  legal_company_title?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['uuid']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  tax_office_name?: Maybe<Scalars['String']['output']>;
  tax_plate_url?: Maybe<Scalars['String']['output']>;
  tax_quarter_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  vkn_tckn?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "tenant" */
export type Tenant_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  commision_rate?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  iban?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  iyzi_sub_merchant_key?: InputMaybe<Order_By>;
  legal_company_title?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_office_name?: InputMaybe<Order_By>;
  tax_plate_url?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vkn_tckn?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "tenant" */
export type Tenant_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Tenant>;
};

/** input type for inserting object relation for remote table "tenant" */
export type Tenant_Obj_Rel_Insert_Input = {
  data: Tenant_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Tenant_On_Conflict>;
};

/** on_conflict condition type for table "tenant" */
export type Tenant_On_Conflict = {
  constraint: Tenant_Constraint;
  update_columns?: Array<Tenant_Update_Column>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};

/** Ordering options when selecting data from "tenant". */
export type Tenant_Order_By = {
  address?: InputMaybe<Order_By>;
  categories_aggregate?: InputMaybe<Tenant_Category_Aggregate_Order_By>;
  commision_rate?: InputMaybe<Order_By>;
  company_type?: InputMaybe<Order_By>;
  company_type_rel?: InputMaybe<Company_Type_Order_By>;
  created_at?: InputMaybe<Order_By>;
  iban?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  iyzi_sub_merchant_key?: InputMaybe<Order_By>;
  legal_company_title?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner?: InputMaybe<User_Order_By>;
  owner_id?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  quarter?: InputMaybe<Quarter_Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_office_name?: InputMaybe<Order_By>;
  tax_plate_url?: InputMaybe<Order_By>;
  tax_quarter?: InputMaybe<Quarter_Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
  tenant_addresses_aggregate?: InputMaybe<Tenant_Address_Aggregate_Order_By>;
  tenant_shipping_places_aggregate?: InputMaybe<Tenant_Shipping_Place_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vkn_tckn?: InputMaybe<Order_By>;
};

/** primary key columns input for table: tenant */
export type Tenant_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "tenant" */
export type Tenant_Select_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'commision_rate'
  /** column name */
  | 'company_type'
  /** column name */
  | 'created_at'
  /** column name */
  | 'iban'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'iyzi_sub_merchant_key'
  /** column name */
  | 'legal_company_title'
  /** column name */
  | 'logo'
  /** column name */
  | 'name'
  /** column name */
  | 'owner_id'
  /** column name */
  | 'phone'
  /** column name */
  | 'quarter_id'
  /** column name */
  | 'tax_office_name'
  /** column name */
  | 'tax_plate_url'
  /** column name */
  | 'tax_quarter_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'vkn_tckn';

/** select "tenant_aggregate_bool_exp_bool_and_arguments_columns" columns of table "tenant" */
export type Tenant_Select_Column_Tenant_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_active';

/** select "tenant_aggregate_bool_exp_bool_or_arguments_columns" columns of table "tenant" */
export type Tenant_Select_Column_Tenant_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_active';

/** input type for updating data in table "tenant" */
export type Tenant_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  commision_rate?: InputMaybe<Scalars['numeric']['input']>;
  company_type?: InputMaybe<Company_Type_Enum>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  iyzi_sub_merchant_key?: InputMaybe<Scalars['String']['input']>;
  legal_company_title?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['uuid']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  tax_office_name?: InputMaybe<Scalars['String']['input']>;
  tax_plate_url?: InputMaybe<Scalars['String']['input']>;
  tax_quarter_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  vkn_tckn?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "tenant_shipping_place" */
export type Tenant_Shipping_Place = {
  id: Scalars['Int']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  quarter: Quarter;
  quarter_code: Scalars['Int']['output'];
  /** An object relationship */
  tenant: Tenant;
  tenant_id: Scalars['uuid']['output'];
};

/** aggregated selection of "tenant_shipping_place" */
export type Tenant_Shipping_Place_Aggregate = {
  aggregate?: Maybe<Tenant_Shipping_Place_Aggregate_Fields>;
  nodes: Array<Tenant_Shipping_Place>;
};

export type Tenant_Shipping_Place_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Tenant_Shipping_Place_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Tenant_Shipping_Place_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Tenant_Shipping_Place_Aggregate_Bool_Exp_Count>;
};

export type Tenant_Shipping_Place_Aggregate_Bool_Exp_Bool_And = {
  arguments: Tenant_Shipping_Place_Select_Column_Tenant_Shipping_Place_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Tenant_Shipping_Place_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Tenant_Shipping_Place_Select_Column_Tenant_Shipping_Place_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Tenant_Shipping_Place_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Tenant_Shipping_Place_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "tenant_shipping_place" */
export type Tenant_Shipping_Place_Aggregate_Fields = {
  avg?: Maybe<Tenant_Shipping_Place_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Tenant_Shipping_Place_Max_Fields>;
  min?: Maybe<Tenant_Shipping_Place_Min_Fields>;
  stddev?: Maybe<Tenant_Shipping_Place_Stddev_Fields>;
  stddev_pop?: Maybe<Tenant_Shipping_Place_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tenant_Shipping_Place_Stddev_Samp_Fields>;
  sum?: Maybe<Tenant_Shipping_Place_Sum_Fields>;
  var_pop?: Maybe<Tenant_Shipping_Place_Var_Pop_Fields>;
  var_samp?: Maybe<Tenant_Shipping_Place_Var_Samp_Fields>;
  variance?: Maybe<Tenant_Shipping_Place_Variance_Fields>;
};


/** aggregate fields of "tenant_shipping_place" */
export type Tenant_Shipping_Place_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tenant_Shipping_Place_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Aggregate_Order_By = {
  avg?: InputMaybe<Tenant_Shipping_Place_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tenant_Shipping_Place_Max_Order_By>;
  min?: InputMaybe<Tenant_Shipping_Place_Min_Order_By>;
  stddev?: InputMaybe<Tenant_Shipping_Place_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Tenant_Shipping_Place_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Tenant_Shipping_Place_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Tenant_Shipping_Place_Sum_Order_By>;
  var_pop?: InputMaybe<Tenant_Shipping_Place_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Tenant_Shipping_Place_Var_Samp_Order_By>;
  variance?: InputMaybe<Tenant_Shipping_Place_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Arr_Rel_Insert_Input = {
  data: Array<Tenant_Shipping_Place_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Tenant_Shipping_Place_On_Conflict>;
};

/** aggregate avg on columns */
export type Tenant_Shipping_Place_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  quarter_code?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "tenant_shipping_place". All fields are combined with a logical 'AND'. */
export type Tenant_Shipping_Place_Bool_Exp = {
  _and?: InputMaybe<Array<Tenant_Shipping_Place_Bool_Exp>>;
  _not?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
  _or?: InputMaybe<Array<Tenant_Shipping_Place_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  quarter?: InputMaybe<Quarter_Bool_Exp>;
  quarter_code?: InputMaybe<Int_Comparison_Exp>;
  tenant?: InputMaybe<Tenant_Bool_Exp>;
  tenant_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'tenant_shipping_place_pkey'
  /** unique or primary key constraint on columns "quarter_code", "tenant_id" */
  | 'tenant_shipping_place_tenant_id_quarter_code_key';

/** input type for incrementing numeric columns in table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  quarter_code?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Insert_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  quarter?: InputMaybe<Quarter_Obj_Rel_Insert_Input>;
  quarter_code?: InputMaybe<Scalars['Int']['input']>;
  tenant?: InputMaybe<Tenant_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Tenant_Shipping_Place_Max_Fields = {
  id?: Maybe<Scalars['Int']['output']>;
  quarter_code?: Maybe<Scalars['Int']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Tenant_Shipping_Place_Min_Fields = {
  id?: Maybe<Scalars['Int']['output']>;
  quarter_code?: Maybe<Scalars['Int']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Tenant_Shipping_Place>;
};

/** on_conflict condition type for table "tenant_shipping_place" */
export type Tenant_Shipping_Place_On_Conflict = {
  constraint: Tenant_Shipping_Place_Constraint;
  update_columns?: Array<Tenant_Shipping_Place_Update_Column>;
  where?: InputMaybe<Tenant_Shipping_Place_Bool_Exp>;
};

/** Ordering options when selecting data from "tenant_shipping_place". */
export type Tenant_Shipping_Place_Order_By = {
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  quarter?: InputMaybe<Quarter_Order_By>;
  quarter_code?: InputMaybe<Order_By>;
  tenant?: InputMaybe<Tenant_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: tenant_shipping_place */
export type Tenant_Shipping_Place_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Select_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'quarter_code'
  /** column name */
  | 'tenant_id';

/** select "tenant_shipping_place_aggregate_bool_exp_bool_and_arguments_columns" columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Select_Column_Tenant_Shipping_Place_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_active';

/** select "tenant_shipping_place_aggregate_bool_exp_bool_or_arguments_columns" columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Select_Column_Tenant_Shipping_Place_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_active';

/** input type for updating data in table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Set_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  quarter_code?: InputMaybe<Scalars['Int']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Tenant_Shipping_Place_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  quarter_code?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Tenant_Shipping_Place_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  quarter_code?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Tenant_Shipping_Place_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  quarter_code?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tenant_Shipping_Place_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tenant_Shipping_Place_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  quarter_code?: InputMaybe<Scalars['Int']['input']>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Tenant_Shipping_Place_Sum_Fields = {
  id?: Maybe<Scalars['Int']['output']>;
  quarter_code?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
};

/** update columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Update_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'quarter_code'
  /** column name */
  | 'tenant_id';

export type Tenant_Shipping_Place_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Tenant_Shipping_Place_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tenant_Shipping_Place_Set_Input>;
  /** filter the rows which have to be updated */
  where: Tenant_Shipping_Place_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Tenant_Shipping_Place_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  quarter_code?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Tenant_Shipping_Place_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  quarter_code?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Tenant_Shipping_Place_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  quarter_code?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "tenant_shipping_place" */
export type Tenant_Shipping_Place_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  quarter_code?: InputMaybe<Order_By>;
};

/** aggregate stddev on columns */
export type Tenant_Stddev_Fields = {
  commision_rate?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
  tax_quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "tenant" */
export type Tenant_Stddev_Order_By = {
  commision_rate?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Tenant_Stddev_Pop_Fields = {
  commision_rate?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
  tax_quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "tenant" */
export type Tenant_Stddev_Pop_Order_By = {
  commision_rate?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Tenant_Stddev_Samp_Fields = {
  commision_rate?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
  tax_quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "tenant" */
export type Tenant_Stddev_Samp_Order_By = {
  commision_rate?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "tenant" */
export type Tenant_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tenant_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tenant_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  commision_rate?: InputMaybe<Scalars['numeric']['input']>;
  company_type?: InputMaybe<Company_Type_Enum>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  iyzi_sub_merchant_key?: InputMaybe<Scalars['String']['input']>;
  legal_company_title?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['uuid']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  tax_office_name?: InputMaybe<Scalars['String']['input']>;
  tax_plate_url?: InputMaybe<Scalars['String']['input']>;
  tax_quarter_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  vkn_tckn?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Tenant_Sum_Fields = {
  commision_rate?: Maybe<Scalars['numeric']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  tax_quarter_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "tenant" */
export type Tenant_Sum_Order_By = {
  commision_rate?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
};

/** update columns of table "tenant" */
export type Tenant_Update_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'commision_rate'
  /** column name */
  | 'company_type'
  /** column name */
  | 'created_at'
  /** column name */
  | 'iban'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'iyzi_sub_merchant_key'
  /** column name */
  | 'legal_company_title'
  /** column name */
  | 'logo'
  /** column name */
  | 'name'
  /** column name */
  | 'owner_id'
  /** column name */
  | 'phone'
  /** column name */
  | 'quarter_id'
  /** column name */
  | 'tax_office_name'
  /** column name */
  | 'tax_plate_url'
  /** column name */
  | 'tax_quarter_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'vkn_tckn';

export type Tenant_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Tenant_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tenant_Set_Input>;
  /** filter the rows which have to be updated */
  where: Tenant_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Tenant_Var_Pop_Fields = {
  commision_rate?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
  tax_quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "tenant" */
export type Tenant_Var_Pop_Order_By = {
  commision_rate?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Tenant_Var_Samp_Fields = {
  commision_rate?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
  tax_quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "tenant" */
export type Tenant_Var_Samp_Order_By = {
  commision_rate?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Tenant_Variance_Fields = {
  commision_rate?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
  tax_quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "tenant" */
export type Tenant_Variance_Order_By = {
  commision_rate?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  tax_quarter_id?: InputMaybe<Order_By>;
};

/** Support tickets that opened by tenant to system admin */
export type Ticket = {
  attachments?: Maybe<Array<Scalars['String']['output']>>;
  created_at: Scalars['timestamptz']['output'];
  description: Scalars['String']['output'];
  id: Scalars['bigint']['output'];
  /** An object relationship */
  order_tenant?: Maybe<Order_Tenant>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Ticket_Status_Enum>;
  /** An object relationship */
  tenant: User;
  tenant_id: Scalars['uuid']['output'];
  /** An array relationship */
  ticket_answers: Array<Ticket_Answer>;
  /** An aggregate relationship */
  ticket_answers_aggregate: Ticket_Answer_Aggregate;
  /** An object relationship */
  ticket_status?: Maybe<Ticket_Status>;
  title: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** Support tickets that opened by tenant to system admin */
export type TicketTicket_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Answer_Order_By>>;
  where?: InputMaybe<Ticket_Answer_Bool_Exp>;
};


/** Support tickets that opened by tenant to system admin */
export type TicketTicket_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Answer_Order_By>>;
  where?: InputMaybe<Ticket_Answer_Bool_Exp>;
};

/** aggregated selection of "ticket" */
export type Ticket_Aggregate = {
  aggregate?: Maybe<Ticket_Aggregate_Fields>;
  nodes: Array<Ticket>;
};

export type Ticket_Aggregate_Bool_Exp = {
  count?: InputMaybe<Ticket_Aggregate_Bool_Exp_Count>;
};

export type Ticket_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Ticket_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Ticket_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "ticket" */
export type Ticket_Aggregate_Fields = {
  avg?: Maybe<Ticket_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Ticket_Max_Fields>;
  min?: Maybe<Ticket_Min_Fields>;
  stddev?: Maybe<Ticket_Stddev_Fields>;
  stddev_pop?: Maybe<Ticket_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Ticket_Stddev_Samp_Fields>;
  sum?: Maybe<Ticket_Sum_Fields>;
  var_pop?: Maybe<Ticket_Var_Pop_Fields>;
  var_samp?: Maybe<Ticket_Var_Samp_Fields>;
  variance?: Maybe<Ticket_Variance_Fields>;
};


/** aggregate fields of "ticket" */
export type Ticket_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ticket_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "ticket" */
export type Ticket_Aggregate_Order_By = {
  avg?: InputMaybe<Ticket_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Ticket_Max_Order_By>;
  min?: InputMaybe<Ticket_Min_Order_By>;
  stddev?: InputMaybe<Ticket_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Ticket_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Ticket_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Ticket_Sum_Order_By>;
  var_pop?: InputMaybe<Ticket_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Ticket_Var_Samp_Order_By>;
  variance?: InputMaybe<Ticket_Variance_Order_By>;
};

/** columns and relationships of "ticket_answer" */
export type Ticket_Answer = {
  answer: Scalars['String']['output'];
  author: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  ticket: Ticket;
  ticket_id: Scalars['bigint']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "ticket_answer" */
export type Ticket_Answer_Aggregate = {
  aggregate?: Maybe<Ticket_Answer_Aggregate_Fields>;
  nodes: Array<Ticket_Answer>;
};

export type Ticket_Answer_Aggregate_Bool_Exp = {
  count?: InputMaybe<Ticket_Answer_Aggregate_Bool_Exp_Count>;
};

export type Ticket_Answer_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Ticket_Answer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Ticket_Answer_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "ticket_answer" */
export type Ticket_Answer_Aggregate_Fields = {
  avg?: Maybe<Ticket_Answer_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Ticket_Answer_Max_Fields>;
  min?: Maybe<Ticket_Answer_Min_Fields>;
  stddev?: Maybe<Ticket_Answer_Stddev_Fields>;
  stddev_pop?: Maybe<Ticket_Answer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Ticket_Answer_Stddev_Samp_Fields>;
  sum?: Maybe<Ticket_Answer_Sum_Fields>;
  var_pop?: Maybe<Ticket_Answer_Var_Pop_Fields>;
  var_samp?: Maybe<Ticket_Answer_Var_Samp_Fields>;
  variance?: Maybe<Ticket_Answer_Variance_Fields>;
};


/** aggregate fields of "ticket_answer" */
export type Ticket_Answer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ticket_Answer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "ticket_answer" */
export type Ticket_Answer_Aggregate_Order_By = {
  avg?: InputMaybe<Ticket_Answer_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Ticket_Answer_Max_Order_By>;
  min?: InputMaybe<Ticket_Answer_Min_Order_By>;
  stddev?: InputMaybe<Ticket_Answer_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Ticket_Answer_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Ticket_Answer_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Ticket_Answer_Sum_Order_By>;
  var_pop?: InputMaybe<Ticket_Answer_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Ticket_Answer_Var_Samp_Order_By>;
  variance?: InputMaybe<Ticket_Answer_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ticket_answer" */
export type Ticket_Answer_Arr_Rel_Insert_Input = {
  data: Array<Ticket_Answer_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Ticket_Answer_On_Conflict>;
};

/** aggregate avg on columns */
export type Ticket_Answer_Avg_Fields = {
  ticket_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "ticket_answer" */
export type Ticket_Answer_Avg_Order_By = {
  ticket_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ticket_answer". All fields are combined with a logical 'AND'. */
export type Ticket_Answer_Bool_Exp = {
  _and?: InputMaybe<Array<Ticket_Answer_Bool_Exp>>;
  _not?: InputMaybe<Ticket_Answer_Bool_Exp>;
  _or?: InputMaybe<Array<Ticket_Answer_Bool_Exp>>;
  answer?: InputMaybe<String_Comparison_Exp>;
  author?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  ticket?: InputMaybe<Ticket_Bool_Exp>;
  ticket_id?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "ticket_answer" */
export type Ticket_Answer_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'ticket_answer_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'ticket_answer_pkey';

/** input type for incrementing numeric columns in table "ticket_answer" */
export type Ticket_Answer_Inc_Input = {
  ticket_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "ticket_answer" */
export type Ticket_Answer_Insert_Input = {
  answer?: InputMaybe<Scalars['String']['input']>;
  author?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ticket?: InputMaybe<Ticket_Obj_Rel_Insert_Input>;
  ticket_id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Ticket_Answer_Max_Fields = {
  answer?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  ticket_id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "ticket_answer" */
export type Ticket_Answer_Max_Order_By = {
  answer?: InputMaybe<Order_By>;
  author?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Ticket_Answer_Min_Fields = {
  answer?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  ticket_id?: Maybe<Scalars['bigint']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "ticket_answer" */
export type Ticket_Answer_Min_Order_By = {
  answer?: InputMaybe<Order_By>;
  author?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ticket_answer" */
export type Ticket_Answer_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ticket_Answer>;
};

/** on_conflict condition type for table "ticket_answer" */
export type Ticket_Answer_On_Conflict = {
  constraint: Ticket_Answer_Constraint;
  update_columns?: Array<Ticket_Answer_Update_Column>;
  where?: InputMaybe<Ticket_Answer_Bool_Exp>;
};

/** Ordering options when selecting data from "ticket_answer". */
export type Ticket_Answer_Order_By = {
  answer?: InputMaybe<Order_By>;
  author?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ticket?: InputMaybe<Ticket_Order_By>;
  ticket_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ticket_answer */
export type Ticket_Answer_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "ticket_answer" */
export type Ticket_Answer_Select_Column =
  /** column name */
  | 'answer'
  /** column name */
  | 'author'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ticket_id'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "ticket_answer" */
export type Ticket_Answer_Set_Input = {
  answer?: InputMaybe<Scalars['String']['input']>;
  author?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ticket_id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Ticket_Answer_Stddev_Fields = {
  ticket_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "ticket_answer" */
export type Ticket_Answer_Stddev_Order_By = {
  ticket_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Ticket_Answer_Stddev_Pop_Fields = {
  ticket_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "ticket_answer" */
export type Ticket_Answer_Stddev_Pop_Order_By = {
  ticket_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Ticket_Answer_Stddev_Samp_Fields = {
  ticket_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "ticket_answer" */
export type Ticket_Answer_Stddev_Samp_Order_By = {
  ticket_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "ticket_answer" */
export type Ticket_Answer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ticket_Answer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ticket_Answer_Stream_Cursor_Value_Input = {
  answer?: InputMaybe<Scalars['String']['input']>;
  author?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ticket_id?: InputMaybe<Scalars['bigint']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Ticket_Answer_Sum_Fields = {
  ticket_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "ticket_answer" */
export type Ticket_Answer_Sum_Order_By = {
  ticket_id?: InputMaybe<Order_By>;
};

/** update columns of table "ticket_answer" */
export type Ticket_Answer_Update_Column =
  /** column name */
  | 'answer'
  /** column name */
  | 'author'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'ticket_id'
  /** column name */
  | 'updated_at';

export type Ticket_Answer_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Ticket_Answer_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ticket_Answer_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ticket_Answer_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Ticket_Answer_Var_Pop_Fields = {
  ticket_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "ticket_answer" */
export type Ticket_Answer_Var_Pop_Order_By = {
  ticket_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Ticket_Answer_Var_Samp_Fields = {
  ticket_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "ticket_answer" */
export type Ticket_Answer_Var_Samp_Order_By = {
  ticket_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Ticket_Answer_Variance_Fields = {
  ticket_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "ticket_answer" */
export type Ticket_Answer_Variance_Order_By = {
  ticket_id?: InputMaybe<Order_By>;
};

/** input type for inserting array relation for remote table "ticket" */
export type Ticket_Arr_Rel_Insert_Input = {
  data: Array<Ticket_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Ticket_On_Conflict>;
};

/** aggregate avg on columns */
export type Ticket_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "ticket" */
export type Ticket_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ticket". All fields are combined with a logical 'AND'. */
export type Ticket_Bool_Exp = {
  _and?: InputMaybe<Array<Ticket_Bool_Exp>>;
  _not?: InputMaybe<Ticket_Bool_Exp>;
  _or?: InputMaybe<Array<Ticket_Bool_Exp>>;
  attachments?: InputMaybe<String_Array_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  order_tenant?: InputMaybe<Order_Tenant_Bool_Exp>;
  order_tenant_id?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<Ticket_Status_Enum_Comparison_Exp>;
  tenant?: InputMaybe<User_Bool_Exp>;
  tenant_id?: InputMaybe<Uuid_Comparison_Exp>;
  ticket_answers?: InputMaybe<Ticket_Answer_Bool_Exp>;
  ticket_answers_aggregate?: InputMaybe<Ticket_Answer_Aggregate_Bool_Exp>;
  ticket_status?: InputMaybe<Ticket_Status_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "ticket" */
export type Ticket_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'ticket_pkey';

/** input type for incrementing numeric columns in table "ticket" */
export type Ticket_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "ticket" */
export type Ticket_Insert_Input = {
  attachments?: InputMaybe<Array<Scalars['String']['input']>>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_tenant?: InputMaybe<Order_Tenant_Obj_Rel_Insert_Input>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Ticket_Status_Enum>;
  tenant?: InputMaybe<User_Obj_Rel_Insert_Input>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  ticket_answers?: InputMaybe<Ticket_Answer_Arr_Rel_Insert_Input>;
  ticket_status?: InputMaybe<Ticket_Status_Obj_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Ticket_Max_Fields = {
  attachments?: Maybe<Array<Scalars['String']['output']>>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "ticket" */
export type Ticket_Max_Order_By = {
  attachments?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Ticket_Min_Fields = {
  attachments?: Maybe<Array<Scalars['String']['output']>>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
  tenant_id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "ticket" */
export type Ticket_Min_Order_By = {
  attachments?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ticket" */
export type Ticket_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ticket>;
};

/** input type for inserting object relation for remote table "ticket" */
export type Ticket_Obj_Rel_Insert_Input = {
  data: Ticket_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Ticket_On_Conflict>;
};

/** on_conflict condition type for table "ticket" */
export type Ticket_On_Conflict = {
  constraint: Ticket_Constraint;
  update_columns?: Array<Ticket_Update_Column>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};

/** Ordering options when selecting data from "ticket". */
export type Ticket_Order_By = {
  attachments?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order_tenant?: InputMaybe<Order_Tenant_Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tenant?: InputMaybe<User_Order_By>;
  tenant_id?: InputMaybe<Order_By>;
  ticket_answers_aggregate?: InputMaybe<Ticket_Answer_Aggregate_Order_By>;
  ticket_status?: InputMaybe<Ticket_Status_Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ticket */
export type Ticket_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "ticket" */
export type Ticket_Select_Column =
  /** column name */
  | 'attachments'
  /** column name */
  | 'created_at'
  /** column name */
  | 'description'
  /** column name */
  | 'id'
  /** column name */
  | 'order_tenant_id'
  /** column name */
  | 'status'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'title'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "ticket" */
export type Ticket_Set_Input = {
  attachments?: InputMaybe<Array<Scalars['String']['input']>>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Ticket_Status_Enum>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "ticket_status" */
export type Ticket_Status = {
  comment: Scalars['String']['output'];
  /** An array relationship */
  tickets: Array<Ticket>;
  /** An aggregate relationship */
  tickets_aggregate: Ticket_Aggregate;
  value: Scalars['String']['output'];
};


/** columns and relationships of "ticket_status" */
export type Ticket_StatusTicketsArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Order_By>>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};


/** columns and relationships of "ticket_status" */
export type Ticket_StatusTickets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Order_By>>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};

/** aggregated selection of "ticket_status" */
export type Ticket_Status_Aggregate = {
  aggregate?: Maybe<Ticket_Status_Aggregate_Fields>;
  nodes: Array<Ticket_Status>;
};

/** aggregate fields of "ticket_status" */
export type Ticket_Status_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Ticket_Status_Max_Fields>;
  min?: Maybe<Ticket_Status_Min_Fields>;
};


/** aggregate fields of "ticket_status" */
export type Ticket_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ticket_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "ticket_status". All fields are combined with a logical 'AND'. */
export type Ticket_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Ticket_Status_Bool_Exp>>;
  _not?: InputMaybe<Ticket_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Ticket_Status_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  tickets?: InputMaybe<Ticket_Bool_Exp>;
  tickets_aggregate?: InputMaybe<Ticket_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "ticket_status" */
export type Ticket_Status_Constraint =
  /** unique or primary key constraint on columns "value" */
  | 'ticket_status_pkey';

export type Ticket_Status_Enum =
  /** ticket has been closed due timeout or solved */
  | 'Closed'
  /** ticket is in processing by system admin */
  | 'Processing'
  /** ticket answered by system admin to tenant */
  | 'Replied'
  /** ticket has been created in database */
  | 'Sent';

/** Boolean expression to compare columns of type "ticket_status_enum". All fields are combined with logical 'AND'. */
export type Ticket_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Ticket_Status_Enum>;
  _in?: InputMaybe<Array<Ticket_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Ticket_Status_Enum>;
  _nin?: InputMaybe<Array<Ticket_Status_Enum>>;
};

/** input type for inserting data into table "ticket_status" */
export type Ticket_Status_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  tickets?: InputMaybe<Ticket_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Ticket_Status_Max_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Ticket_Status_Min_Fields = {
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "ticket_status" */
export type Ticket_Status_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ticket_Status>;
};

/** input type for inserting object relation for remote table "ticket_status" */
export type Ticket_Status_Obj_Rel_Insert_Input = {
  data: Ticket_Status_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Ticket_Status_On_Conflict>;
};

/** on_conflict condition type for table "ticket_status" */
export type Ticket_Status_On_Conflict = {
  constraint: Ticket_Status_Constraint;
  update_columns?: Array<Ticket_Status_Update_Column>;
  where?: InputMaybe<Ticket_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "ticket_status". */
export type Ticket_Status_Order_By = {
  comment?: InputMaybe<Order_By>;
  tickets_aggregate?: InputMaybe<Ticket_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ticket_status */
export type Ticket_Status_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "ticket_status" */
export type Ticket_Status_Select_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

/** input type for updating data in table "ticket_status" */
export type Ticket_Status_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "ticket_status" */
export type Ticket_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ticket_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ticket_Status_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "ticket_status" */
export type Ticket_Status_Update_Column =
  /** column name */
  | 'comment'
  /** column name */
  | 'value';

export type Ticket_Status_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ticket_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ticket_Status_Bool_Exp;
};

/** aggregate stddev on columns */
export type Ticket_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "ticket" */
export type Ticket_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Ticket_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "ticket" */
export type Ticket_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Ticket_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "ticket" */
export type Ticket_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "ticket" */
export type Ticket_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ticket_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ticket_Stream_Cursor_Value_Input = {
  attachments?: InputMaybe<Array<Scalars['String']['input']>>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  order_tenant_id?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Ticket_Status_Enum>;
  tenant_id?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Ticket_Sum_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
  order_tenant_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "ticket" */
export type Ticket_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** update columns of table "ticket" */
export type Ticket_Update_Column =
  /** column name */
  | 'attachments'
  /** column name */
  | 'created_at'
  /** column name */
  | 'description'
  /** column name */
  | 'id'
  /** column name */
  | 'order_tenant_id'
  /** column name */
  | 'status'
  /** column name */
  | 'tenant_id'
  /** column name */
  | 'title'
  /** column name */
  | 'updated_at';

export type Ticket_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Ticket_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ticket_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ticket_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Ticket_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "ticket" */
export type Ticket_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Ticket_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "ticket" */
export type Ticket_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Ticket_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  order_tenant_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "ticket" */
export type Ticket_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  order_tenant_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "transaction" */
export type Transaction = {
  id: Scalars['uuid']['output'];
  iyziEventTime?: Maybe<Scalars['String']['output']>;
  iyziEventType?: Maybe<Scalars['String']['output']>;
  iyziReferenceCode?: Maybe<Scalars['String']['output']>;
  paymentConversationId?: Maybe<Scalars['String']['output']>;
  paymentId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "transaction" */
export type Transaction_Aggregate = {
  aggregate?: Maybe<Transaction_Aggregate_Fields>;
  nodes: Array<Transaction>;
};

/** aggregate fields of "transaction" */
export type Transaction_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Transaction_Max_Fields>;
  min?: Maybe<Transaction_Min_Fields>;
};


/** aggregate fields of "transaction" */
export type Transaction_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Transaction_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "transaction". All fields are combined with a logical 'AND'. */
export type Transaction_Bool_Exp = {
  _and?: InputMaybe<Array<Transaction_Bool_Exp>>;
  _not?: InputMaybe<Transaction_Bool_Exp>;
  _or?: InputMaybe<Array<Transaction_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  iyziEventTime?: InputMaybe<String_Comparison_Exp>;
  iyziEventType?: InputMaybe<String_Comparison_Exp>;
  iyziReferenceCode?: InputMaybe<String_Comparison_Exp>;
  paymentConversationId?: InputMaybe<String_Comparison_Exp>;
  paymentId?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "transaction" */
export type Transaction_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'transaction_pkey';

/** input type for inserting data into table "transaction" */
export type Transaction_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  iyziEventTime?: InputMaybe<Scalars['String']['input']>;
  iyziEventType?: InputMaybe<Scalars['String']['input']>;
  iyziReferenceCode?: InputMaybe<Scalars['String']['input']>;
  paymentConversationId?: InputMaybe<Scalars['String']['input']>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Transaction_Max_Fields = {
  id?: Maybe<Scalars['uuid']['output']>;
  iyziEventTime?: Maybe<Scalars['String']['output']>;
  iyziEventType?: Maybe<Scalars['String']['output']>;
  iyziReferenceCode?: Maybe<Scalars['String']['output']>;
  paymentConversationId?: Maybe<Scalars['String']['output']>;
  paymentId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Transaction_Min_Fields = {
  id?: Maybe<Scalars['uuid']['output']>;
  iyziEventTime?: Maybe<Scalars['String']['output']>;
  iyziEventType?: Maybe<Scalars['String']['output']>;
  iyziReferenceCode?: Maybe<Scalars['String']['output']>;
  paymentConversationId?: Maybe<Scalars['String']['output']>;
  paymentId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "transaction" */
export type Transaction_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Transaction>;
};

/** on_conflict condition type for table "transaction" */
export type Transaction_On_Conflict = {
  constraint: Transaction_Constraint;
  update_columns?: Array<Transaction_Update_Column>;
  where?: InputMaybe<Transaction_Bool_Exp>;
};

/** Ordering options when selecting data from "transaction". */
export type Transaction_Order_By = {
  id?: InputMaybe<Order_By>;
  iyziEventTime?: InputMaybe<Order_By>;
  iyziEventType?: InputMaybe<Order_By>;
  iyziReferenceCode?: InputMaybe<Order_By>;
  paymentConversationId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: transaction */
export type Transaction_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "transaction" */
export type Transaction_Select_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'iyziEventTime'
  /** column name */
  | 'iyziEventType'
  /** column name */
  | 'iyziReferenceCode'
  /** column name */
  | 'paymentConversationId'
  /** column name */
  | 'paymentId'
  /** column name */
  | 'status';

/** input type for updating data in table "transaction" */
export type Transaction_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  iyziEventTime?: InputMaybe<Scalars['String']['input']>;
  iyziEventType?: InputMaybe<Scalars['String']['input']>;
  iyziReferenceCode?: InputMaybe<Scalars['String']['input']>;
  paymentConversationId?: InputMaybe<Scalars['String']['input']>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "transaction" */
export type Transaction_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transaction_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transaction_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  iyziEventTime?: InputMaybe<Scalars['String']['input']>;
  iyziEventType?: InputMaybe<Scalars['String']['input']>;
  iyziReferenceCode?: InputMaybe<Scalars['String']['input']>;
  paymentConversationId?: InputMaybe<Scalars['String']['input']>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "transaction" */
export type Transaction_Update_Column =
  /** column name */
  | 'id'
  /** column name */
  | 'iyziEventTime'
  /** column name */
  | 'iyziEventType'
  /** column name */
  | 'iyziReferenceCode'
  /** column name */
  | 'paymentConversationId'
  /** column name */
  | 'paymentId'
  /** column name */
  | 'status';

export type Transaction_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Transaction_Set_Input>;
  /** filter the rows which have to be updated */
  where: Transaction_Bool_Exp;
};

/** columns and relationships of "user" */
export type User = {
  auth_provider?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  carts: Array<Cart>;
  /** An aggregate relationship */
  carts_aggregate: Cart_Aggregate;
  /** An array relationship */
  chat_threads_tenant: Array<Chat_Thread>;
  /** An aggregate relationship */
  chat_threads_tenant_aggregate: Chat_Thread_Aggregate;
  /** An array relationship */
  chat_threads_user: Array<Chat_Thread>;
  /** An aggregate relationship */
  chat_threads_user_aggregate: Chat_Thread_Aggregate;
  /** An array relationship */
  companies: Array<Company>;
  /** An aggregate relationship */
  companies_aggregate: Company_Aggregate;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  email_verified?: Maybe<Scalars['Boolean']['output']>;
  /** An array relationship */
  favorites: Array<User_Favorite>;
  /** An aggregate relationship */
  favorites_aggregate: User_Favorite_Aggregate;
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  identity_number?: Maybe<Scalars['String']['output']>;
  is_active_user?: Maybe<Scalars['Boolean']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  orders: Array<Order>;
  /** An aggregate relationship */
  orders_aggregate: Order_Aggregate;
  password?: Maybe<Scalars['String']['output']>;
  password_reset_token?: Maybe<Scalars['String']['output']>;
  password_reset_token_exp?: Maybe<Scalars['timestamptz']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  phone_verified?: Maybe<Scalars['Boolean']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  products: Array<Product>;
  /** An aggregate relationship */
  products_aggregate: Product_Aggregate;
  provider_id?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  questions: Array<Question>;
  /** An aggregate relationship */
  questions_aggregate: Question_Aggregate;
  reference_code?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  reviews: Array<Review>;
  /** An aggregate relationship */
  reviews_aggregate: Review_Aggregate;
  role?: Maybe<Role_Enum>;
  session_id?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  sessions: Array<Session>;
  /** An aggregate relationship */
  sessions_aggregate: Session_Aggregate;
  /** An array relationship */
  tenants: Array<Tenant>;
  /** An aggregate relationship */
  tenants_aggregate: Tenant_Aggregate;
  /** An array relationship */
  tickets: Array<Ticket>;
  /** An aggregate relationship */
  tickets_aggregate: Ticket_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  user_addresses: Array<User_Address>;
  /** An aggregate relationship */
  user_addresses_aggregate: User_Address_Aggregate;
  /** An array relationship */
  user_coupons: Array<User_Coupon>;
  /** An aggregate relationship */
  user_coupons_aggregate: User_Coupon_Aggregate;
  /** An object relationship */
  user_role?: Maybe<Role>;
  verify_token?: Maybe<Scalars['String']['output']>;
  verify_token_exp?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "user" */
export type UserCartsArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserCarts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cart_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cart_Order_By>>;
  where?: InputMaybe<Cart_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserChat_Threads_TenantArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserChat_Threads_Tenant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserChat_Threads_UserArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserChat_Threads_User_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Thread_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Thread_Order_By>>;
  where?: InputMaybe<Chat_Thread_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserCompaniesArgs = {
  distinct_on?: InputMaybe<Array<Company_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Order_By>>;
  where?: InputMaybe<Company_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserCompanies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Company_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Order_By>>;
  where?: InputMaybe<Company_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserFavoritesArgs = {
  distinct_on?: InputMaybe<Array<User_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Favorite_Order_By>>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserFavorites_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Favorite_Order_By>>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserOrdersArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserProductsArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserProducts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Product_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserQuestionsArgs = {
  distinct_on?: InputMaybe<Array<Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Order_By>>;
  where?: InputMaybe<Question_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserQuestions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Question_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Question_Order_By>>;
  where?: InputMaybe<Question_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserReviewsArgs = {
  distinct_on?: InputMaybe<Array<Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Review_Order_By>>;
  where?: InputMaybe<Review_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Review_Order_By>>;
  where?: InputMaybe<Review_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserSessionsArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Order_By>>;
  where?: InputMaybe<Session_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserTenantsArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserTenants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tenant_Order_By>>;
  where?: InputMaybe<Tenant_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserTicketsArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Order_By>>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserTickets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ticket_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ticket_Order_By>>;
  where?: InputMaybe<Ticket_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserUser_AddressesArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserUser_Addresses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Address_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Address_Order_By>>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserUser_CouponsArgs = {
  distinct_on?: InputMaybe<Array<User_Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Coupon_Order_By>>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserUser_Coupons_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Coupon_Order_By>>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};

/** columns and relationships of "user_address" */
export type User_Address = {
  address: Scalars['String']['output'];
  address_title: Scalars['String']['output'];
  /** An object relationship */
  city: City;
  city_id: Scalars['Int']['output'];
  /** An object relationship */
  district: District;
  district_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** An object relationship */
  quarter: Quarter;
  quarter_id: Scalars['Int']['output'];
  receiver_firstname: Scalars['String']['output'];
  receiver_phone: Scalars['String']['output'];
  receiver_surname: Scalars['String']['output'];
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_address" */
export type User_Address_Aggregate = {
  aggregate?: Maybe<User_Address_Aggregate_Fields>;
  nodes: Array<User_Address>;
};

export type User_Address_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Address_Aggregate_Bool_Exp_Count>;
};

export type User_Address_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Address_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Address_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_address" */
export type User_Address_Aggregate_Fields = {
  avg?: Maybe<User_Address_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Address_Max_Fields>;
  min?: Maybe<User_Address_Min_Fields>;
  stddev?: Maybe<User_Address_Stddev_Fields>;
  stddev_pop?: Maybe<User_Address_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Address_Stddev_Samp_Fields>;
  sum?: Maybe<User_Address_Sum_Fields>;
  var_pop?: Maybe<User_Address_Var_Pop_Fields>;
  var_samp?: Maybe<User_Address_Var_Samp_Fields>;
  variance?: Maybe<User_Address_Variance_Fields>;
};


/** aggregate fields of "user_address" */
export type User_Address_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Address_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_address" */
export type User_Address_Aggregate_Order_By = {
  avg?: InputMaybe<User_Address_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Address_Max_Order_By>;
  min?: InputMaybe<User_Address_Min_Order_By>;
  stddev?: InputMaybe<User_Address_Stddev_Order_By>;
  stddev_pop?: InputMaybe<User_Address_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<User_Address_Stddev_Samp_Order_By>;
  sum?: InputMaybe<User_Address_Sum_Order_By>;
  var_pop?: InputMaybe<User_Address_Var_Pop_Order_By>;
  var_samp?: InputMaybe<User_Address_Var_Samp_Order_By>;
  variance?: InputMaybe<User_Address_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_address" */
export type User_Address_Arr_Rel_Insert_Input = {
  data: Array<User_Address_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Address_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Address_Avg_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "user_address" */
export type User_Address_Avg_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_address". All fields are combined with a logical 'AND'. */
export type User_Address_Bool_Exp = {
  _and?: InputMaybe<Array<User_Address_Bool_Exp>>;
  _not?: InputMaybe<User_Address_Bool_Exp>;
  _or?: InputMaybe<Array<User_Address_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  address_title?: InputMaybe<String_Comparison_Exp>;
  city?: InputMaybe<City_Bool_Exp>;
  city_id?: InputMaybe<Int_Comparison_Exp>;
  district?: InputMaybe<District_Bool_Exp>;
  district_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  quarter?: InputMaybe<Quarter_Bool_Exp>;
  quarter_id?: InputMaybe<Int_Comparison_Exp>;
  receiver_firstname?: InputMaybe<String_Comparison_Exp>;
  receiver_phone?: InputMaybe<String_Comparison_Exp>;
  receiver_surname?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_address" */
export type User_Address_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'user_address_pkey'
  /** unique or primary key constraint on columns "user_id", "address_title" */
  | 'user_address_user_id_address_title_key';

/** input type for incrementing numeric columns in table "user_address" */
export type User_Address_Inc_Input = {
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "user_address" */
export type User_Address_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_title?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<City_Obj_Rel_Insert_Input>;
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district?: InputMaybe<District_Obj_Rel_Insert_Input>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  quarter?: InputMaybe<Quarter_Obj_Rel_Insert_Input>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  receiver_firstname?: InputMaybe<Scalars['String']['input']>;
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  receiver_surname?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Address_Max_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  address_title?: Maybe<Scalars['String']['output']>;
  city_id?: Maybe<Scalars['Int']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  receiver_firstname?: Maybe<Scalars['String']['output']>;
  receiver_phone?: Maybe<Scalars['String']['output']>;
  receiver_surname?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_address" */
export type User_Address_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  address_title?: InputMaybe<Order_By>;
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  receiver_firstname?: InputMaybe<Order_By>;
  receiver_phone?: InputMaybe<Order_By>;
  receiver_surname?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Address_Min_Fields = {
  address?: Maybe<Scalars['String']['output']>;
  address_title?: Maybe<Scalars['String']['output']>;
  city_id?: Maybe<Scalars['Int']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
  receiver_firstname?: Maybe<Scalars['String']['output']>;
  receiver_phone?: Maybe<Scalars['String']['output']>;
  receiver_surname?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_address" */
export type User_Address_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  address_title?: InputMaybe<Order_By>;
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  receiver_firstname?: InputMaybe<Order_By>;
  receiver_phone?: InputMaybe<Order_By>;
  receiver_surname?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_address" */
export type User_Address_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Address>;
};

/** on_conflict condition type for table "user_address" */
export type User_Address_On_Conflict = {
  constraint: User_Address_Constraint;
  update_columns?: Array<User_Address_Update_Column>;
  where?: InputMaybe<User_Address_Bool_Exp>;
};

/** Ordering options when selecting data from "user_address". */
export type User_Address_Order_By = {
  address?: InputMaybe<Order_By>;
  address_title?: InputMaybe<Order_By>;
  city?: InputMaybe<City_Order_By>;
  city_id?: InputMaybe<Order_By>;
  district?: InputMaybe<District_Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter?: InputMaybe<Quarter_Order_By>;
  quarter_id?: InputMaybe<Order_By>;
  receiver_firstname?: InputMaybe<Order_By>;
  receiver_phone?: InputMaybe<Order_By>;
  receiver_surname?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_address */
export type User_Address_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "user_address" */
export type User_Address_Select_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'address_title'
  /** column name */
  | 'city_id'
  /** column name */
  | 'district_id'
  /** column name */
  | 'id'
  /** column name */
  | 'quarter_id'
  /** column name */
  | 'receiver_firstname'
  /** column name */
  | 'receiver_phone'
  /** column name */
  | 'receiver_surname'
  /** column name */
  | 'user_id';

/** input type for updating data in table "user_address" */
export type User_Address_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_title?: InputMaybe<Scalars['String']['input']>;
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  receiver_firstname?: InputMaybe<Scalars['String']['input']>;
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  receiver_surname?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type User_Address_Stddev_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "user_address" */
export type User_Address_Stddev_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Address_Stddev_Pop_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "user_address" */
export type User_Address_Stddev_Pop_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Address_Stddev_Samp_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "user_address" */
export type User_Address_Stddev_Samp_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "user_address" */
export type User_Address_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Address_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Address_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_title?: InputMaybe<Scalars['String']['input']>;
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  receiver_firstname?: InputMaybe<Scalars['String']['input']>;
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  receiver_surname?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type User_Address_Sum_Fields = {
  city_id?: Maybe<Scalars['Int']['output']>;
  district_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  quarter_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "user_address" */
export type User_Address_Sum_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** update columns of table "user_address" */
export type User_Address_Update_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'address_title'
  /** column name */
  | 'city_id'
  /** column name */
  | 'district_id'
  /** column name */
  | 'id'
  /** column name */
  | 'quarter_id'
  /** column name */
  | 'receiver_firstname'
  /** column name */
  | 'receiver_phone'
  /** column name */
  | 'receiver_surname'
  /** column name */
  | 'user_id';

export type User_Address_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Address_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Address_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Address_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Address_Var_Pop_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "user_address" */
export type User_Address_Var_Pop_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Address_Var_Samp_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "user_address" */
export type User_Address_Var_Samp_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Address_Variance_Fields = {
  city_id?: Maybe<Scalars['Float']['output']>;
  district_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  quarter_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "user_address" */
export type User_Address_Variance_Order_By = {
  city_id?: InputMaybe<Order_By>;
  district_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quarter_id?: InputMaybe<Order_By>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

export type User_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<User_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<User_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<User_Aggregate_Bool_Exp_Count>;
};

export type User_Aggregate_Bool_Exp_Bool_And = {
  arguments: User_Select_Column_User_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type User_Aggregate_Bool_Exp_Bool_Or = {
  arguments: User_Select_Column_User_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type User_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Max_Order_By>;
  min?: InputMaybe<User_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  auth_provider?: InputMaybe<String_Comparison_Exp>;
  carts?: InputMaybe<Cart_Bool_Exp>;
  carts_aggregate?: InputMaybe<Cart_Aggregate_Bool_Exp>;
  chat_threads_tenant?: InputMaybe<Chat_Thread_Bool_Exp>;
  chat_threads_tenant_aggregate?: InputMaybe<Chat_Thread_Aggregate_Bool_Exp>;
  chat_threads_user?: InputMaybe<Chat_Thread_Bool_Exp>;
  chat_threads_user_aggregate?: InputMaybe<Chat_Thread_Aggregate_Bool_Exp>;
  companies?: InputMaybe<Company_Bool_Exp>;
  companies_aggregate?: InputMaybe<Company_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  email_verified?: InputMaybe<Boolean_Comparison_Exp>;
  favorites?: InputMaybe<User_Favorite_Bool_Exp>;
  favorites_aggregate?: InputMaybe<User_Favorite_Aggregate_Bool_Exp>;
  firstname?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  identity_number?: InputMaybe<String_Comparison_Exp>;
  is_active_user?: InputMaybe<Boolean_Comparison_Exp>;
  lastname?: InputMaybe<String_Comparison_Exp>;
  orders?: InputMaybe<Order_Bool_Exp>;
  orders_aggregate?: InputMaybe<Order_Aggregate_Bool_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  password_reset_token?: InputMaybe<String_Comparison_Exp>;
  password_reset_token_exp?: InputMaybe<Timestamptz_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  phone_verified?: InputMaybe<Boolean_Comparison_Exp>;
  picture?: InputMaybe<String_Comparison_Exp>;
  products?: InputMaybe<Product_Bool_Exp>;
  products_aggregate?: InputMaybe<Product_Aggregate_Bool_Exp>;
  provider_id?: InputMaybe<String_Comparison_Exp>;
  questions?: InputMaybe<Question_Bool_Exp>;
  questions_aggregate?: InputMaybe<Question_Aggregate_Bool_Exp>;
  reference_code?: InputMaybe<String_Comparison_Exp>;
  reviews?: InputMaybe<Review_Bool_Exp>;
  reviews_aggregate?: InputMaybe<Review_Aggregate_Bool_Exp>;
  role?: InputMaybe<Role_Enum_Comparison_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  sessions?: InputMaybe<Session_Bool_Exp>;
  sessions_aggregate?: InputMaybe<Session_Aggregate_Bool_Exp>;
  tenants?: InputMaybe<Tenant_Bool_Exp>;
  tenants_aggregate?: InputMaybe<Tenant_Aggregate_Bool_Exp>;
  tickets?: InputMaybe<Ticket_Bool_Exp>;
  tickets_aggregate?: InputMaybe<Ticket_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_addresses?: InputMaybe<User_Address_Bool_Exp>;
  user_addresses_aggregate?: InputMaybe<User_Address_Aggregate_Bool_Exp>;
  user_coupons?: InputMaybe<User_Coupon_Bool_Exp>;
  user_coupons_aggregate?: InputMaybe<User_Coupon_Aggregate_Bool_Exp>;
  user_role?: InputMaybe<Role_Bool_Exp>;
  verify_token?: InputMaybe<String_Comparison_Exp>;
  verify_token_exp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export type User_Constraint =
  /** unique or primary key constraint on columns "email" */
  | 'user_email_key'
  /** unique or primary key constraint on columns "id" */
  | 'user_pkey'
  /** unique or primary key constraint on columns "session_id" */
  | 'user_session_id_key';

/** columns and relationships of "user_coupon" */
export type User_Coupon = {
  /** An object relationship */
  coupon: Coupon;
  coupon_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_coupon" */
export type User_Coupon_Aggregate = {
  aggregate?: Maybe<User_Coupon_Aggregate_Fields>;
  nodes: Array<User_Coupon>;
};

export type User_Coupon_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Coupon_Aggregate_Bool_Exp_Count>;
};

export type User_Coupon_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Coupon_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Coupon_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_coupon" */
export type User_Coupon_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<User_Coupon_Max_Fields>;
  min?: Maybe<User_Coupon_Min_Fields>;
};


/** aggregate fields of "user_coupon" */
export type User_Coupon_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Coupon_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_coupon" */
export type User_Coupon_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Coupon_Max_Order_By>;
  min?: InputMaybe<User_Coupon_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_coupon" */
export type User_Coupon_Arr_Rel_Insert_Input = {
  data: Array<User_Coupon_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Coupon_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_coupon". All fields are combined with a logical 'AND'. */
export type User_Coupon_Bool_Exp = {
  _and?: InputMaybe<Array<User_Coupon_Bool_Exp>>;
  _not?: InputMaybe<User_Coupon_Bool_Exp>;
  _or?: InputMaybe<Array<User_Coupon_Bool_Exp>>;
  coupon?: InputMaybe<Coupon_Bool_Exp>;
  coupon_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_coupon" */
export type User_Coupon_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'user_coupon_pkey';

/** input type for inserting data into table "user_coupon" */
export type User_Coupon_Insert_Input = {
  coupon?: InputMaybe<Coupon_Obj_Rel_Insert_Input>;
  coupon_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Coupon_Max_Fields = {
  coupon_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_coupon" */
export type User_Coupon_Max_Order_By = {
  coupon_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Coupon_Min_Fields = {
  coupon_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_coupon" */
export type User_Coupon_Min_Order_By = {
  coupon_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_coupon" */
export type User_Coupon_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Coupon>;
};

/** on_conflict condition type for table "user_coupon" */
export type User_Coupon_On_Conflict = {
  constraint: User_Coupon_Constraint;
  update_columns?: Array<User_Coupon_Update_Column>;
  where?: InputMaybe<User_Coupon_Bool_Exp>;
};

/** Ordering options when selecting data from "user_coupon". */
export type User_Coupon_Order_By = {
  coupon?: InputMaybe<Coupon_Order_By>;
  coupon_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_coupon */
export type User_Coupon_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user_coupon" */
export type User_Coupon_Select_Column =
  /** column name */
  | 'coupon_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'user_id';

/** input type for updating data in table "user_coupon" */
export type User_Coupon_Set_Input = {
  coupon_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "user_coupon" */
export type User_Coupon_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Coupon_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Coupon_Stream_Cursor_Value_Input = {
  coupon_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_coupon" */
export type User_Coupon_Update_Column =
  /** column name */
  | 'coupon_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'user_id';

export type User_Coupon_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Coupon_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Coupon_Bool_Exp;
};

/** columns and relationships of "user_favorite" */
export type User_Favorite = {
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** An object relationship */
  product: Product;
  product_id: Scalars['bigint']['output'];
  session_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "user_favorite" */
export type User_Favorite_Aggregate = {
  aggregate?: Maybe<User_Favorite_Aggregate_Fields>;
  nodes: Array<User_Favorite>;
};

export type User_Favorite_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Favorite_Aggregate_Bool_Exp_Count>;
};

export type User_Favorite_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Favorite_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Favorite_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_favorite" */
export type User_Favorite_Aggregate_Fields = {
  avg?: Maybe<User_Favorite_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Favorite_Max_Fields>;
  min?: Maybe<User_Favorite_Min_Fields>;
  stddev?: Maybe<User_Favorite_Stddev_Fields>;
  stddev_pop?: Maybe<User_Favorite_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Favorite_Stddev_Samp_Fields>;
  sum?: Maybe<User_Favorite_Sum_Fields>;
  var_pop?: Maybe<User_Favorite_Var_Pop_Fields>;
  var_samp?: Maybe<User_Favorite_Var_Samp_Fields>;
  variance?: Maybe<User_Favorite_Variance_Fields>;
};


/** aggregate fields of "user_favorite" */
export type User_Favorite_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Favorite_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_favorite" */
export type User_Favorite_Aggregate_Order_By = {
  avg?: InputMaybe<User_Favorite_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Favorite_Max_Order_By>;
  min?: InputMaybe<User_Favorite_Min_Order_By>;
  stddev?: InputMaybe<User_Favorite_Stddev_Order_By>;
  stddev_pop?: InputMaybe<User_Favorite_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<User_Favorite_Stddev_Samp_Order_By>;
  sum?: InputMaybe<User_Favorite_Sum_Order_By>;
  var_pop?: InputMaybe<User_Favorite_Var_Pop_Order_By>;
  var_samp?: InputMaybe<User_Favorite_Var_Samp_Order_By>;
  variance?: InputMaybe<User_Favorite_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_favorite" */
export type User_Favorite_Arr_Rel_Insert_Input = {
  data: Array<User_Favorite_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Favorite_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Favorite_Avg_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "user_favorite" */
export type User_Favorite_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_favorite". All fields are combined with a logical 'AND'. */
export type User_Favorite_Bool_Exp = {
  _and?: InputMaybe<Array<User_Favorite_Bool_Exp>>;
  _not?: InputMaybe<User_Favorite_Bool_Exp>;
  _or?: InputMaybe<Array<User_Favorite_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  product?: InputMaybe<Product_Bool_Exp>;
  product_id?: InputMaybe<Bigint_Comparison_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_favorite" */
export type User_Favorite_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'user_favorite_pkey'
  /** unique or primary key constraint on columns "product_id", "user_id" */
  | 'user_favorite_user_id_product_id_key';

/** input type for incrementing numeric columns in table "user_favorite" */
export type User_Favorite_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "user_favorite" */
export type User_Favorite_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  product?: InputMaybe<Product_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Favorite_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  product_id?: Maybe<Scalars['bigint']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_favorite" */
export type User_Favorite_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Favorite_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  product_id?: Maybe<Scalars['bigint']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_favorite" */
export type User_Favorite_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_favorite" */
export type User_Favorite_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Favorite>;
};

/** on_conflict condition type for table "user_favorite" */
export type User_Favorite_On_Conflict = {
  constraint: User_Favorite_Constraint;
  update_columns?: Array<User_Favorite_Update_Column>;
  where?: InputMaybe<User_Favorite_Bool_Exp>;
};

/** Ordering options when selecting data from "user_favorite". */
export type User_Favorite_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product?: InputMaybe<Product_Order_By>;
  product_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_favorite */
export type User_Favorite_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "user_favorite" */
export type User_Favorite_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'product_id'
  /** column name */
  | 'session_id'
  /** column name */
  | 'user_id';

/** input type for updating data in table "user_favorite" */
export type User_Favorite_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type User_Favorite_Stddev_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "user_favorite" */
export type User_Favorite_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Favorite_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "user_favorite" */
export type User_Favorite_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Favorite_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "user_favorite" */
export type User_Favorite_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "user_favorite" */
export type User_Favorite_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Favorite_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Favorite_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  product_id?: InputMaybe<Scalars['bigint']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type User_Favorite_Sum_Fields = {
  id?: Maybe<Scalars['bigint']['output']>;
  product_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "user_favorite" */
export type User_Favorite_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** update columns of table "user_favorite" */
export type User_Favorite_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'product_id'
  /** column name */
  | 'session_id'
  /** column name */
  | 'user_id';

export type User_Favorite_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Favorite_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Favorite_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Favorite_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Favorite_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "user_favorite" */
export type User_Favorite_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Favorite_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "user_favorite" */
export type User_Favorite_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Favorite_Variance_Fields = {
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "user_favorite" */
export type User_Favorite_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  auth_provider?: InputMaybe<Scalars['String']['input']>;
  carts?: InputMaybe<Cart_Arr_Rel_Insert_Input>;
  chat_threads_tenant?: InputMaybe<Chat_Thread_Arr_Rel_Insert_Input>;
  chat_threads_user?: InputMaybe<Chat_Thread_Arr_Rel_Insert_Input>;
  companies?: InputMaybe<Company_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_verified?: InputMaybe<Scalars['Boolean']['input']>;
  favorites?: InputMaybe<User_Favorite_Arr_Rel_Insert_Input>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  identity_number?: InputMaybe<Scalars['String']['input']>;
  is_active_user?: InputMaybe<Scalars['Boolean']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Order_Arr_Rel_Insert_Input>;
  password?: InputMaybe<Scalars['String']['input']>;
  password_reset_token?: InputMaybe<Scalars['String']['input']>;
  password_reset_token_exp?: InputMaybe<Scalars['timestamptz']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  phone_verified?: InputMaybe<Scalars['Boolean']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Product_Arr_Rel_Insert_Input>;
  provider_id?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Question_Arr_Rel_Insert_Input>;
  reference_code?: InputMaybe<Scalars['String']['input']>;
  reviews?: InputMaybe<Review_Arr_Rel_Insert_Input>;
  role?: InputMaybe<Role_Enum>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Session_Arr_Rel_Insert_Input>;
  tenants?: InputMaybe<Tenant_Arr_Rel_Insert_Input>;
  tickets?: InputMaybe<Ticket_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_addresses?: InputMaybe<User_Address_Arr_Rel_Insert_Input>;
  user_coupons?: InputMaybe<User_Coupon_Arr_Rel_Insert_Input>;
  user_role?: InputMaybe<Role_Obj_Rel_Insert_Input>;
  verify_token?: InputMaybe<Scalars['String']['input']>;
  verify_token_exp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  auth_provider?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  identity_number?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  password_reset_token?: Maybe<Scalars['String']['output']>;
  password_reset_token_exp?: Maybe<Scalars['timestamptz']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  reference_code?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  verify_token?: Maybe<Scalars['String']['output']>;
  verify_token_exp?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  auth_provider?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  firstname?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identity_number?: InputMaybe<Order_By>;
  lastname?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  password_reset_token?: InputMaybe<Order_By>;
  password_reset_token_exp?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  provider_id?: InputMaybe<Order_By>;
  reference_code?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  verify_token?: InputMaybe<Order_By>;
  verify_token_exp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  auth_provider?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  identity_number?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  password_reset_token?: Maybe<Scalars['String']['output']>;
  password_reset_token_exp?: Maybe<Scalars['timestamptz']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  reference_code?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  verify_token?: Maybe<Scalars['String']['output']>;
  verify_token_exp?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  auth_provider?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  firstname?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identity_number?: InputMaybe<Order_By>;
  lastname?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  password_reset_token?: InputMaybe<Order_By>;
  password_reset_token_exp?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  provider_id?: InputMaybe<Order_By>;
  reference_code?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  verify_token?: InputMaybe<Order_By>;
  verify_token_exp?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** on_conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  auth_provider?: InputMaybe<Order_By>;
  carts_aggregate?: InputMaybe<Cart_Aggregate_Order_By>;
  chat_threads_tenant_aggregate?: InputMaybe<Chat_Thread_Aggregate_Order_By>;
  chat_threads_user_aggregate?: InputMaybe<Chat_Thread_Aggregate_Order_By>;
  companies_aggregate?: InputMaybe<Company_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  email_verified?: InputMaybe<Order_By>;
  favorites_aggregate?: InputMaybe<User_Favorite_Aggregate_Order_By>;
  firstname?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  identity_number?: InputMaybe<Order_By>;
  is_active_user?: InputMaybe<Order_By>;
  lastname?: InputMaybe<Order_By>;
  orders_aggregate?: InputMaybe<Order_Aggregate_Order_By>;
  password?: InputMaybe<Order_By>;
  password_reset_token?: InputMaybe<Order_By>;
  password_reset_token_exp?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  phone_verified?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  products_aggregate?: InputMaybe<Product_Aggregate_Order_By>;
  provider_id?: InputMaybe<Order_By>;
  questions_aggregate?: InputMaybe<Question_Aggregate_Order_By>;
  reference_code?: InputMaybe<Order_By>;
  reviews_aggregate?: InputMaybe<Review_Aggregate_Order_By>;
  role?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  sessions_aggregate?: InputMaybe<Session_Aggregate_Order_By>;
  tenants_aggregate?: InputMaybe<Tenant_Aggregate_Order_By>;
  tickets_aggregate?: InputMaybe<Ticket_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_addresses_aggregate?: InputMaybe<User_Address_Aggregate_Order_By>;
  user_coupons_aggregate?: InputMaybe<User_Coupon_Aggregate_Order_By>;
  user_role?: InputMaybe<Role_Order_By>;
  verify_token?: InputMaybe<Order_By>;
  verify_token_exp?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user" */
export type User_Select_Column =
  /** column name */
  | 'auth_provider'
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'email_verified'
  /** column name */
  | 'firstname'
  /** column name */
  | 'id'
  /** column name */
  | 'identity_number'
  /** column name */
  | 'is_active_user'
  /** column name */
  | 'lastname'
  /** column name */
  | 'password'
  /** column name */
  | 'password_reset_token'
  /** column name */
  | 'password_reset_token_exp'
  /** column name */
  | 'phone'
  /** column name */
  | 'phone_verified'
  /** column name */
  | 'picture'
  /** column name */
  | 'provider_id'
  /** column name */
  | 'reference_code'
  /** column name */
  | 'role'
  /** column name */
  | 'session_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'verify_token'
  /** column name */
  | 'verify_token_exp';

/** select "user_aggregate_bool_exp_bool_and_arguments_columns" columns of table "user" */
export type User_Select_Column_User_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'email_verified'
  /** column name */
  | 'is_active_user'
  /** column name */
  | 'phone_verified';

/** select "user_aggregate_bool_exp_bool_or_arguments_columns" columns of table "user" */
export type User_Select_Column_User_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'email_verified'
  /** column name */
  | 'is_active_user'
  /** column name */
  | 'phone_verified';

/** input type for updating data in table "user" */
export type User_Set_Input = {
  auth_provider?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_verified?: InputMaybe<Scalars['Boolean']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  identity_number?: InputMaybe<Scalars['String']['input']>;
  is_active_user?: InputMaybe<Scalars['Boolean']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  password_reset_token?: InputMaybe<Scalars['String']['input']>;
  password_reset_token_exp?: InputMaybe<Scalars['timestamptz']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  phone_verified?: InputMaybe<Scalars['Boolean']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  provider_id?: InputMaybe<Scalars['String']['input']>;
  reference_code?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role_Enum>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  verify_token?: InputMaybe<Scalars['String']['input']>;
  verify_token_exp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "user" */
export type User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stream_Cursor_Value_Input = {
  auth_provider?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_verified?: InputMaybe<Scalars['Boolean']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  identity_number?: InputMaybe<Scalars['String']['input']>;
  is_active_user?: InputMaybe<Scalars['Boolean']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  password_reset_token?: InputMaybe<Scalars['String']['input']>;
  password_reset_token_exp?: InputMaybe<Scalars['timestamptz']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  phone_verified?: InputMaybe<Scalars['Boolean']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  provider_id?: InputMaybe<Scalars['String']['input']>;
  reference_code?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role_Enum>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  verify_token?: InputMaybe<Scalars['String']['input']>;
  verify_token_exp?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "user" */
export type User_Update_Column =
  /** column name */
  | 'auth_provider'
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'email_verified'
  /** column name */
  | 'firstname'
  /** column name */
  | 'id'
  /** column name */
  | 'identity_number'
  /** column name */
  | 'is_active_user'
  /** column name */
  | 'lastname'
  /** column name */
  | 'password'
  /** column name */
  | 'password_reset_token'
  /** column name */
  | 'password_reset_token_exp'
  /** column name */
  | 'phone'
  /** column name */
  | 'phone_verified'
  /** column name */
  | 'picture'
  /** column name */
  | 'provider_id'
  /** column name */
  | 'reference_code'
  /** column name */
  | 'role'
  /** column name */
  | 'session_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'verify_token'
  /** column name */
  | 'verify_token_exp';

export type User_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type GetUserAddressByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type GetUserAddressByIdQuery = { user_by_pk?: { user_addresses: Array<{ address: string, address_title: string, receiver_firstname: string, receiver_phone: string, receiver_surname: string, id: number, city: { id: number, name: string }, district: { id: number, name: string }, quarter: { id: number, name: string } }> } | null };

export type GetUserByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type GetUserByIdQuery = { user_by_pk?: { id: any, created_at?: any | null, email?: string | null, firstname?: string | null, lastname?: string | null, picture?: string | null, phone?: string | null, reference_code?: string | null, user_addresses: Array<{ address_title: string, address: string }>, carts: Array<{ id: any, content?: any | null }> } | null };

export type UpdateUserByIdMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserByIdMutation = { update_user_by_pk?: { email?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, picture?: string | null } | null };

export type GetCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { cities: Array<{ code: number, id: number, name: string }> };

export type GetDistrictsQueryVariables = Exact<{
  cityId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDistrictsQuery = { districts: Array<{ name: string, id: number }> };

export type GetQuartersQueryVariables = Exact<{
  districtId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetQuartersQuery = { quarters: Array<{ name: string, id: number }> };

export type GetQuarterByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetQuarterByIdQuery = { quarter: Array<{ code: number, id: number, name: string, district: { id: number, code: number, name: string, city: { code: number, id: number, name: string } } }> };

export type GetDistrictByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDistrictByIdQuery = { district: Array<{ code: number, id: number, name: string, city: { name: string, id: number } }> };

export type GetCityByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCityByIdQuery = { city: Array<{ code: number, id: number, name: string }> };

export type GetUserOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserOrdersQuery = { order: Array<{ created_at: any, id: any, total_amount: number, tenant_orders: Array<{ id: any, tenant: { id: any, tenants: Array<{ name?: string | null, logo?: string | null, id: any }> }, order_items: Array<{ id: any, order_item_no?: string | null, product_id: any, quantity: number, product: { id: any, slug?: string | null, description?: string | null, image_url?: Array<string> | null, name: string, price: number, discount_price?: number | null, quantity?: number | null, category: { name: string, slug?: string | null } } }>, order_status?: { value: string } | null }> }> };

export type CreateNewAddressMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  address_title?: InputMaybe<Scalars['String']['input']>;
  city_id?: InputMaybe<Scalars['Int']['input']>;
  district_id?: InputMaybe<Scalars['Int']['input']>;
  quarter_id?: InputMaybe<Scalars['Int']['input']>;
  receiver_firstname?: InputMaybe<Scalars['String']['input']>;
  receiver_phone?: InputMaybe<Scalars['String']['input']>;
  receiver_surname?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type CreateNewAddressMutation = { insert_user_address_one?: { address_title: string, id: number } | null };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { user: Array<{ id: any, provider_id?: string | null }> };

export type GetLocationQueryQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLocationQueryQuery = { search_locationv1: Array<{ id?: number | null, name?: string | null, type?: string | null, district_id?: number | null, district_name?: string | null, city_id?: number | null, city_name?: string | null }> };

export type GetAllCouponsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCouponsQuery = { coupon: Array<{ id: any, code: string, description?: string | null, created_at?: any | null, start_date?: any | null, end_date?: any | null, minimum_cost?: number | null, amount: number, tenant: { tenants: Array<{ name?: string | null, logo?: string | null, id: any }> } }> };

export type GetUserFavoritesQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserFavoritesQuery = { user_favorite: Array<{ id: any, product: { name: string, id: any, image_url?: Array<string> | null, price: number, discount_price?: number | null, slug?: string | null, category: { name: string, slug?: string | null } } }>, user_favorite_aggregate: { aggregate?: { count: number } | null } };

export type AddToFavoritesMutationVariables = Exact<{
  productId: Scalars['bigint']['input'];
}>;


export type AddToFavoritesMutation = { insert_user_favorite_one?: { id: any } | null };

export type RemoveFromFavoritesMutationVariables = Exact<{
  productId: Scalars['bigint']['input'];
}>;


export type RemoveFromFavoritesMutation = { delete_user_favorite?: { affected_rows: number } | null };

export type GetUserAddressesQueryVariables = Exact<{
  user_id: Scalars['uuid']['input'];
}>;


export type GetUserAddressesQuery = { user_address: Array<{ address_title: string, address: string, id: number, city: { name: string, id: number }, quarter: { name: string, id: number }, district: { name: string, id: number } }> };

export type LoginMutationMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginMutationMutation = { login?: { access_token?: string | null, refresh_token?: string | null, error?: string | null } | null };

export type ExpiredRefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type ExpiredRefreshTokenMutation = { refresh_token?: { access_token: string, body?: any | null, error?: string | null } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  provider_id?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisterMutation = { register?: { data?: any | null, body?: any | null, error?: string | null } | null };

export type GetBannersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBannersQuery = { system_banner: Array<{ expire_date?: any | null, id: any, name?: string | null, path?: string | null, redirect_link: string }> };

export type UpdateDbCartMutationVariables = Exact<{
  payload: Array<Cart_Insert_Input> | Cart_Insert_Input;
  CONSTRAINT: Cart_Constraint;
}>;


export type UpdateDbCartMutation = { insert_cart?: { affected_rows: number, returning: Array<{ id: any }> } | null };

export type GetDbCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDbCartQuery = { cart: Array<{ id: any, content?: any | null }> };

export type GetMainCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMainCategoriesQuery = { category: Array<{ id: number, image_url?: string | null, name: string, slug?: string | null }> };

export type GetAllCategoriesQueryVariables = Exact<{
  parent_category_id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllCategoriesQuery = { category: Array<{ id: number, image_url?: string | null, name: string, slug?: string | null }> };

export type SendMessageAloneMutationVariables = Exact<{
  message: Scalars['String']['input'];
  receiver_id: Scalars['uuid']['input'];
  order_tenant_id: Scalars['bigint']['input'];
  user_id: Scalars['uuid']['input'];
}>;


export type SendMessageAloneMutation = { insert_message_one?: { created_at: any, chat_thread: { tenat_id: any, order_tenant_id: any } } | null };

export type SendMessageMutationVariables = Exact<{
  message: Scalars['String']['input'];
  receiver_id: Scalars['uuid']['input'];
  chat_thread_id: Scalars['uuid']['input'];
}>;


export type SendMessageMutation = { insert_message_one?: { created_at: any } | null };

export type MarkAsReadMutationVariables = Exact<{
  chat_thread_id: Scalars['uuid']['input'];
}>;


export type MarkAsReadMutation = { update_message_many?: Array<{ affected_rows: number } | null> | null };

export type SubscribeToChatsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToChatsSubscription = { chat_thread: Array<{ id: any, tenant: { id: any, picture?: string | null, firstname?: string | null, lastname?: string | null }, messages: Array<{ message: string, id: any, is_read?: boolean | null, created_at: any, sender: { picture?: string | null, id: any }, receiver: { picture?: string | null, id: any } }>, order_tenant: { id: any, order_items: Array<{ id: any, product: { image_url?: Array<string> | null, name: string, id: any } }> } }> };

export type GetSingleTenantOrderItemQueryVariables = Exact<{
  id?: InputMaybe<Scalars['bigint']['input']>;
}>;


export type GetSingleTenantOrderItemQuery = { order_tenant: Array<{ id: any, tenant: { id: any } }> };

export type CreateOrderMutationVariables = Exact<{
  object: Order_Insert_Input;
}>;


export type CreateOrderMutation = { insert_order_one?: { id: any } | null };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { product: Array<{ id: any, image_url?: Array<string> | null, description?: string | null, name: string, price: number, quantity?: number | null }>, product_aggregate: { aggregate?: { count: number } | null } };

export type GetProductByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['bigint']['input']>;
}>;


export type GetProductByIdQuery = { product?: { description?: string | null, id: any, image_url?: Array<string> | null, name: string, price: number, quantity?: number | null, is_service_free?: boolean | null, delivery_time_ranges?: any | null, delivery_type?: Delivery_Type_Enum | null, properties?: any | null, discount_price?: number | null, category: { name: string, id: number, slug?: string | null }, questions: Array<{ created_at: any, id: any, question: string, updated_at: any, user: { firstname?: string | null, lastname?: string | null } }>, reviews: Array<{ id: number, comment?: string | null, created_at: any, score?: number | null, user: { firstname?: string | null, lastname?: string | null, picture?: string | null, id: any } }>, product_customizable_areas: Array<{ customizable_area: { count?: number | null, id: number, type: string } }>, reviews_aggregate: { aggregate?: { count: number } | null }, tenant: { id: any, tenants: Array<{ id: any, name?: string | null, logo?: string | null, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> }, user_favorites: Array<{ user_id?: any | null, id: any }>, user_favorites_aggregate: { aggregate?: { count: number } | null } } | null };

export type GetProductForCartQueryVariables = Exact<{
  id?: InputMaybe<Scalars['bigint']['input']>;
}>;


export type GetProductForCartQuery = { product?: { description?: string | null, id: any, image_url?: Array<string> | null, name: string, price: number, discount_price?: number | null, product_customizable_areas: Array<{ count: number, customizable_area: { type: string } }>, category: { name: string }, tenant: { id: any, tenants: Array<{ id: any, name?: string | null, logo?: string | null, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> } } | null, category: Array<{ name: string }> };

export type GetProductPricesByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['bigint']['input']>;
}>;


export type GetProductPricesByIdQuery = { product?: { id: any, price: number, discount_price?: number | null } | null };

export type GetProductsForInitialCartQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['bigint']['input']> | Scalars['bigint']['input']>;
}>;


export type GetProductsForInitialCartQuery = { product: Array<{ name: string, description?: string | null, id: any, price: number, discount_price?: number | null, stock?: number | null, image_url?: Array<string> | null, category: { id: number, name: string, slug?: string | null }, tenant: { id: any, tenants: Array<{ id: any, name?: string | null, logo?: string | null, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> }, product_customizable_areas: Array<{ count: number, max_character?: number | null, customizable_area: { id: number, type: string } }> }> };

export type GetProductActionDataQueryVariables = Exact<{
  id: Scalars['bigint']['input'];
}>;


export type GetProductActionDataQuery = { product?: { user_favorites_aggregate: { aggregate?: { count: number } | null }, user_favorites: Array<{ product_id: any }> } | null };

export type GetProductActionDataForAnonymousQueryVariables = Exact<{
  id: Scalars['bigint']['input'];
}>;


export type GetProductActionDataForAnonymousQuery = { product?: { user_favorites_aggregate: { aggregate?: { count: number } | null } } | null };

export type GetProductInformationQueryVariables = Exact<{
  id: Scalars['bigint']['input'];
}>;


export type GetProductInformationQuery = { product?: { description?: string | null, id: any, image_url?: Array<string> | null, name: string, price: number, is_service_free?: boolean | null, delivery_time_ranges?: any | null, delivery_type?: Delivery_Type_Enum | null, properties?: any | null, discount_price?: number | null, reviews_aggregate: { aggregate?: { count: number } | null }, tenant: { tenants: Array<{ name?: string | null, id: any }> } } | null };

export type GetProductImagesQueryVariables = Exact<{
  id: Scalars['bigint']['input'];
}>;


export type GetProductImagesQuery = { product?: { image_url?: Array<string> | null } | null };

export type GetProductDescriptionQueryVariables = Exact<{
  id: Scalars['bigint']['input'];
}>;


export type GetProductDescriptionQuery = { product?: { description?: string | null, properties?: any | null } | null };

export type GetProductCommentsQueryVariables = Exact<{
  id: Scalars['bigint']['input'];
}>;


export type GetProductCommentsQuery = { product?: { reviews: Array<{ id: number, comment?: string | null, created_at: any, score?: number | null, user: { firstname?: string | null, lastname?: string | null, picture?: string | null } }> } | null };

export type GetProductsWithPaginationQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  category_slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductsWithPaginationQuery = { product_aggregate: { aggregate?: { count: number } | null }, product: Array<{ id: any, tenant_id: any, description?: string | null, name: string, slug?: string | null, image_url?: Array<string> | null, price: number, quantity?: number | null, properties?: any | null, discount_price?: number | null, category: { name: string, slug?: string | null }, product_customizable_areas: Array<{ count: number, customizable_area: { type: string } }>, tenant: { id: any, tenants: Array<{ name?: string | null, logo?: string | null, id: any, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> }, reviews_aggregate: { aggregate?: { count: number } | null } }> };

export type GetProductsWithFilteredPaginationQueryVariables = Exact<{
  filter_payload?: InputMaybe<Product_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsWithFilteredPaginationQuery = { product_aggregate: { aggregate?: { count: number } | null }, product: Array<{ id: any, tenant_id: any, description?: string | null, name: string, slug?: string | null, image_url?: Array<string> | null, price: number, quantity?: number | null, properties?: any | null, discount_price?: number | null, category: { name: string, slug?: string | null }, product_customizable_areas: Array<{ count: number, customizable_area: { type: string } }>, tenant: { id: any, tenants: Array<{ name?: string | null, logo?: string | null, id: any, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> }, reviews_aggregate: { aggregate?: { count: number } | null } }> };

export type SearchProductsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchProductsQuery = { product: Array<{ name: string }> };

export type GetOrdersWithReviewsQueryVariables = Exact<{
  user_id: Scalars['uuid']['input'];
}>;


export type GetOrdersWithReviewsQuery = { order_item: Array<{ id: any, created_at?: any | null, order_tenant?: { updated_at: any, order_status?: { value: string } | null } | null, product: { slug?: string | null, id: any, name: string, image_url?: Array<string> | null, reviews_aggregate: { aggregate?: { count: number } | null } } }>, review: Array<{ id: number, comment?: string | null, score?: number | null, created_at: any, product: { slug?: string | null, name: string, id: any, image_url?: Array<string> | null, category: { name: string, slug?: string | null, id: number }, tenant: { id: any, picture?: string | null }, reviews_aggregate: { aggregate?: { count: number } | null } } }> };

export type CreateReviewMutationVariables = Exact<{
  comment: Scalars['String']['input'];
  score: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
}>;


export type CreateReviewMutation = { insert_review_one?: { created_at: any } | null };

export type GetProductReviewsQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductReviewsQuery = { review: Array<{ id: number, comment?: string | null, score?: number | null, created_at: any, user: { firstname?: string | null, lastname?: string | null } }>, review_aggregate: { aggregate?: { count: number } | null } };

export type GetVendorByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['bigint']['input']>;
}>;


export type GetVendorByIdQuery = { product?: { description?: string | null, id: any, image_url?: Array<string> | null, name: string, price: number, quantity?: number | null, category: { name: string }, questions: Array<{ created_at: any, id: any, question: string, updated_at: any, user: { firstname?: string | null, lastname?: string | null } }>, reviews: Array<{ comment?: string | null, created_at: any, score?: number | null, user: { firstname?: string | null, lastname?: string | null } }>, reviews_aggregate: { aggregate?: { count: number } | null } } | null };

export type GetVendorProductsWithPaginationQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  tenant_id: Scalars['uuid']['input'];
}>;


export type GetVendorProductsWithPaginationQuery = { product_aggregate: { aggregate?: { count: number } | null }, product: Array<{ id: any, description?: string | null, name: string, image_url?: Array<string> | null, price: number, quantity?: number | null, category: { name: string, slug?: string | null } }> };

export type VerifyTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
  resend?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type VerifyTokenMutation = { email_verify?: { result?: string | null } | null };


export const GetUserAddressByIdDocument = gql`
    query getUserAddressById($id: uuid = "") {
  user_by_pk(id: $id) {
    user_addresses {
      address
      address_title
      receiver_firstname
      receiver_phone
      receiver_surname
      id
      city {
        id
        name
      }
      district {
        id
        name
      }
      quarter {
        id
        name
      }
    }
  }
}
    `;
export const GetUserByIdDocument = gql`
    query getUserById($id: uuid = "") {
  user_by_pk(id: $id) {
    id
    created_at
    email
    firstname
    lastname
    picture
    phone
    reference_code
    user_addresses {
      address_title
      address
    }
    carts {
      id
      content
    }
  }
}
    `;
export const UpdateUserByIdDocument = gql`
    mutation updateUserById($id: uuid!, $firstname: String, $lastname: String, $phone: String, $picture: String) {
  update_user_by_pk(
    pk_columns: {id: $id}
    _set: {firstname: $firstname, lastname: $lastname, phone: $phone, picture: $picture}
  ) {
    email
    firstname
    lastname
    phone
    picture
  }
}
    `;
export const GetCitiesDocument = gql`
    query getCities {
  cities: city {
    code
    id
    name
  }
}
    `;
export const GetDistrictsDocument = gql`
    query getDistricts($cityId: Int = 10) {
  districts: district(where: {city: {id: {_eq: $cityId}}}) {
    name
    id
  }
}
    `;
export const GetQuartersDocument = gql`
    query getQuarters($districtId: Int = 1) {
  quarters: quarter(where: {district: {id: {_eq: $districtId}}}) {
    name
    id
  }
}
    `;
export const GetQuarterByIdDocument = gql`
    query GetQuarterById($id: Int) @cached {
  quarter(where: {id: {_eq: $id}}) {
    code
    id
    name
    district {
      id
      code
      name
      city {
        code
        id
        name
      }
    }
  }
}
    `;
export const GetDistrictByIdDocument = gql`
    query getDistrictById($id: Int) @cached {
  district(where: {id: {_eq: $id}}) {
    code
    id
    name
    city {
      name
      id
    }
  }
}
    `;
export const GetCityByIdDocument = gql`
    query getCityById($id: Int) {
  city(where: {id: {_eq: $id}}) {
    code
    id
    name
  }
}
    `;
export const GetUserOrdersDocument = gql`
    query getUserOrders {
  order {
    created_at
    id
    total_amount
    tenant_orders {
      id
      tenant {
        id
        tenants {
          name
          logo
          id
        }
      }
      order_items {
        id
        order_item_no
        product_id
        quantity
        product {
          category {
            name
            slug
          }
          id
          slug
          description
          image_url
          name
          price
          discount_price
          quantity
        }
      }
      order_status {
        value
      }
    }
  }
}
    `;
export const CreateNewAddressDocument = gql`
    mutation createNewAddress($address: String, $address_title: String, $city_id: Int, $district_id: Int, $quarter_id: Int, $receiver_firstname: String, $receiver_phone: String, $receiver_surname: String, $user_id: uuid) {
  insert_user_address_one(
    object: {address: $address, address_title: $address_title, city_id: $city_id, district_id: $district_id, quarter_id: $quarter_id, receiver_firstname: $receiver_firstname, receiver_phone: $receiver_phone, receiver_surname: $receiver_surname, user_id: $user_id}
  ) {
    address_title
    id
  }
}
    `;
export const GetUserByEmailDocument = gql`
    query getUserByEmail($email: String!) {
  user(where: {email: {_eq: $email}}) {
    id
    provider_id
  }
}
    `;
export const GetLocationQueryDocument = gql`
    query GetLocationQuery($search: String = "") @cached {
  search_locationv1(args: {search: $search}, limit: 100) {
    id
    name
    type
    district_id
    district_name
    city_id
    city_name
  }
}
    `;
export const GetAllCouponsDocument = gql`
    query getAllCoupons {
  coupon(
    where: {user_coupons_aggregate: {count: {predicate: {_eq: 0}}}, end_date: {_gte: "now()"}}
  ) {
    id
    code
    description
    created_at
    start_date
    end_date
    minimum_cost
    amount
    tenant {
      tenants {
        name
        logo
        id
      }
    }
  }
}
    `;
export const GetUserFavoritesDocument = gql`
    query getUserFavorites($offset: Int = 0) {
  user_favorite(offset: $offset) {
    id
    product {
      name
      id
      image_url
      price
      discount_price
      slug
      category {
        name
        slug
      }
    }
  }
  user_favorite_aggregate {
    aggregate {
      count
    }
  }
}
    `;
export const AddToFavoritesDocument = gql`
    mutation addToFavorites($productId: bigint!) {
  insert_user_favorite_one(object: {product_id: $productId}) {
    id
  }
}
    `;
export const RemoveFromFavoritesDocument = gql`
    mutation removeFromFavorites($productId: bigint!) {
  delete_user_favorite(where: {product_id: {_eq: $productId}}) {
    affected_rows
  }
}
    `;
export const GetUserAddressesDocument = gql`
    query getUserAddresses($user_id: uuid!) {
  user_address(where: {user_id: {_eq: $user_id}}) {
    address_title
    address
    id
    city {
      name
      id
    }
    quarter {
      name
      id
    }
    district {
      name
      id
    }
  }
}
    `;
export const LoginMutationDocument = gql`
    mutation loginMutation($email: String, $password: String) {
  login(args: {email: $email, password: $password}) {
    access_token
    refresh_token
    error
  }
}
    `;
export const ExpiredRefreshTokenDocument = gql`
    mutation expiredRefreshToken {
  refresh_token {
    access_token
    body
    error
  }
}
    `;
export const RegisterDocument = gql`
    mutation register($email: String!, $password: String, $firstname: String, $lastname: String, $provider: String, $picture: String, $provider_id: String, $phone: String) {
  register(
    args: {email: $email, password: $password, firstname: $firstname, lastname: $lastname, provider: $provider, picture: $picture, provider_id: $provider_id, phone: $phone}
  ) {
    data
    body
    error
  }
}
    `;
export const GetBannersDocument = gql`
    query getBanners {
  system_banner {
    expire_date
    id
    name
    path
    redirect_link
  }
}
    `;
export const UpdateDbCartDocument = gql`
    mutation updateDbCart($payload: [cart_insert_input!]!, $CONSTRAINT: cart_constraint!) {
  insert_cart(
    objects: $payload
    on_conflict: {constraint: $CONSTRAINT, update_columns: [content]}
  ) {
    returning {
      id
    }
    affected_rows
  }
}
    `;
export const GetDbCartDocument = gql`
    query getDbCart {
  cart {
    id
    content
  }
}
    `;
export const GetMainCategoriesDocument = gql`
    query getMainCategories {
  category(where: {parent_category_id: {_is_null: true}}) {
    id
    image_url
    name
    slug
  }
}
    `;
export const GetAllCategoriesDocument = gql`
    query getAllCategories($parent_category_id: Int) {
  category(where: {parent_category_id: {_eq: $parent_category_id}}) {
    id
    image_url
    name
    slug
  }
}
    `;
export const SendMessageAloneDocument = gql`
    mutation sendMessageAlone($message: String!, $receiver_id: uuid!, $order_tenant_id: bigint!, $user_id: uuid!) {
  insert_message_one(
    object: {receiver_id: $receiver_id, message: $message, chat_thread: {data: {order_tenant_id: $order_tenant_id, tenat_id: $receiver_id, user_id: $user_id}, on_conflict: {constraint: chat_thread_order_tenant_id_key, update_columns: [order_tenant_id]}}}
  ) {
    created_at
    chat_thread {
      tenat_id
      order_tenant_id
    }
  }
}
    `;
export const SendMessageDocument = gql`
    mutation sendMessage($message: String!, $receiver_id: uuid!, $chat_thread_id: uuid!) {
  insert_message_one(
    object: {receiver_id: $receiver_id, message: $message, chat_thread_id: $chat_thread_id}
  ) {
    created_at
  }
}
    `;
export const MarkAsReadDocument = gql`
    mutation markAsRead($chat_thread_id: uuid!) {
  update_message_many(
    updates: {_set: {is_read: true}, where: {chat_thread_id: {_eq: $chat_thread_id}, is_read: {_eq: false}}}
  ) {
    affected_rows
  }
}
    `;
export const SubscribeToChatsDocument = gql`
    subscription subscribeToChats {
  chat_thread {
    id
    tenant {
      id
      picture
      firstname
      lastname
    }
    messages(order_by: {created_at: asc}) {
      message
      id
      is_read
      created_at
      sender {
        picture
        id
      }
      receiver {
        picture
        id
      }
    }
    order_tenant {
      id
      order_items {
        id
        product {
          image_url
          name
          id
        }
      }
    }
  }
}
    `;
export const GetSingleTenantOrderItemDocument = gql`
    query getSingleTenantOrderItem($id: bigint) {
  order_tenant(where: {id: {_eq: $id}}) {
    id
    tenant {
      id
    }
  }
}
    `;
export const CreateOrderDocument = gql`
    mutation createOrder($object: order_insert_input!) {
  insert_order_one(object: $object) {
    id
  }
}
    `;
export const GetAllProductsDocument = gql`
    query getAllProducts {
  product {
    id
    image_url
    description
    name
    price
    quantity
  }
  product_aggregate {
    aggregate {
      count
    }
  }
}
    `;
export const GetProductByIdDocument = gql`
    query getProductById($id: bigint = 0) {
  product: product_by_pk(id: $id) {
    category {
      name
    }
    description
    id
    image_url
    name
    price
    quantity
    is_service_free
    delivery_time_ranges
    delivery_type
    properties
    discount_price
    questions {
      created_at
      id
      question
      updated_at
      user {
        firstname
        lastname
      }
    }
    reviews {
      id
      comment
      created_at
      score
      user {
        firstname
        lastname
        picture
        id
      }
    }
    product_customizable_areas {
      customizable_area {
        count
        id
        type
      }
    }
    reviews_aggregate {
      aggregate {
        count(columns: id)
      }
    }
    category {
      name
      id
      slug
    }
    tenant {
      id
      tenants {
        id
        name
        logo
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    user_favorites {
      user_id
      id
    }
    user_favorites_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;
export const GetProductForCartDocument = gql`
    query getProductForCart($id: bigint = 0) {
  product: product_by_pk(id: $id) {
    description
    id
    image_url
    name
    price
    discount_price
    product_customizable_areas {
      customizable_area {
        type
      }
      count
    }
    category {
      name
    }
    tenant {
      id
      tenants {
        id
        name
        logo
        iyzi_sub_merchant_key
        commision_rate
      }
    }
  }
  category {
    name
  }
}
    `;
export const GetProductPricesByIdDocument = gql`
    query getProductPricesById($id: bigint = 0) {
  product: product_by_pk(id: $id) {
    id
    price
    discount_price
  }
}
    `;
export const GetProductsForInitialCartDocument = gql`
    query getProductsForInitialCart($ids: [bigint!]) {
  product(where: {id: {_in: $ids}, is_active: {_eq: true}}) {
    name
    description
    id
    price
    discount_price
    stock
    image_url
    category {
      id
      name
      slug
    }
    tenant {
      id
      tenants {
        id
        name
        logo
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    product_customizable_areas {
      customizable_area {
        id
        type
      }
      count
      max_character
    }
  }
}
    `;
export const GetProductActionDataDocument = gql`
    query getProductActionData($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    user_favorites_aggregate {
      aggregate {
        count
      }
    }
    user_favorites(where: {product: {id: {_eq: $id}}}) {
      product_id
    }
  }
}
    `;
export const GetProductActionDataForAnonymousDocument = gql`
    query getProductActionDataForAnonymous($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    user_favorites_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;
export const GetProductInformationDocument = gql`
    query getProductInformation($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    description
    id
    image_url
    name
    price
    is_service_free
    delivery_time_ranges
    delivery_type
    properties
    discount_price
    reviews_aggregate {
      aggregate {
        count(columns: id)
      }
    }
    tenant {
      tenants {
        name
        id
      }
    }
  }
}
    `;
export const GetProductImagesDocument = gql`
    query getProductImages($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    image_url
  }
}
    `;
export const GetProductDescriptionDocument = gql`
    query getProductDescription($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    description
    properties
  }
}
    `;
export const GetProductCommentsDocument = gql`
    query getProductComments($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    reviews {
      id
      comment
      created_at
      score
      user {
        firstname
        lastname
        picture
      }
    }
  }
}
    `;
export const GetProductsWithPaginationDocument = gql`
    query getProductsWithPagination($limit: Int = 15, $offset: Int = 0, $is_active: Boolean = true, $category_slug: String) {
  product_aggregate(
    where: {is_active: {_eq: $is_active}, category: {slug: {_eq: $category_slug}}}
  ) {
    aggregate {
      count
    }
  }
  product(
    limit: $limit
    offset: $offset
    where: {is_active: {_eq: $is_active}, category: {slug: {_eq: $category_slug}}}
  ) {
    id
    tenant_id
    description
    name
    slug
    category {
      name
      slug
    }
    image_url
    price
    quantity
    properties
    discount_price
    product_customizable_areas {
      count
      customizable_area {
        type
      }
    }
    tenant {
      id
      tenants {
        name
        logo
        id
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    reviews_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;
export const GetProductsWithFilteredPaginationDocument = gql`
    query getProductsWithFilteredPagination($filter_payload: product_bool_exp, $limit: Int = 10, $offset: Int = 0) {
  product_aggregate(where: $filter_payload) {
    aggregate {
      count
    }
  }
  product(
    where: $filter_payload
    limit: $limit
    offset: $offset
    order_by: {id: asc}
  ) {
    id
    tenant_id
    description
    name
    slug
    category {
      name
      slug
    }
    image_url
    price
    quantity
    slug
    properties
    discount_price
    product_customizable_areas {
      count
      customizable_area {
        type
      }
    }
    tenant {
      id
      tenants {
        name
        logo
        id
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    reviews_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;
export const SearchProductsDocument = gql`
    query searchProducts($search: String) {
  product(
    where: {_and: [{_or: [{name: {_ilike: $search}}, {name: {_similar: $search}}, {category: {name: {_similar: $search}}}, {category: {name: {_ilike: $search}}}]}, {is_active: {_eq: true}}]}
  ) {
    name
  }
}
    `;
export const GetOrdersWithReviewsDocument = gql`
    query getOrdersWithReviews($user_id: uuid!) {
  order_item(
    where: {_and: [{product: {_or: [{reviews_aggregate: {count: {predicate: {_eq: 0}}}}, {reviews: {user_id: {_neq: $user_id}}}]}}, {order_tenant: {order_status: {value: {_eq: "Delivered"}}}}]}
  ) {
    id
    order_tenant {
      order_status {
        value
      }
      updated_at
    }
    created_at
    product {
      slug
      id
      name
      image_url
      reviews_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  review(where: {user_id: {_eq: $user_id}}) {
    id
    comment
    score
    created_at
    product {
      slug
      name
      id
      image_url
      category {
        name
        slug
        id
      }
      tenant {
        id
        picture
      }
      reviews_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}
    `;
export const CreateReviewDocument = gql`
    mutation createReview($comment: String!, $score: Int!, $product_id: Int!) {
  insert_review_one(
    object: {comment: $comment, score: $score, product_id: $product_id}
  ) {
    created_at
  }
}
    `;
export const GetProductReviewsDocument = gql`
    query getProductReviews($productId: Int, $limit: Int = 10, $offset: Int = 0) {
  review(where: {product_id: {_eq: $productId}}, limit: $limit, offset: $offset) {
    id
    comment
    score
    created_at
    user {
      firstname
      lastname
    }
  }
  review_aggregate {
    aggregate {
      count
    }
  }
}
    `;
export const GetVendorByIdDocument = gql`
    query getVendorById($id: bigint = 0) {
  product: product_by_pk(id: $id) {
    category {
      name
    }
    description
    id
    image_url
    name
    price
    quantity
    questions {
      created_at
      id
      question
      updated_at
      user {
        firstname
        lastname
      }
    }
    reviews {
      comment
      created_at
      score
      user {
        firstname
        lastname
      }
    }
    reviews_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
}
    `;
export const GetVendorProductsWithPaginationDocument = gql`
    query getVendorProductsWithPagination($limit: Int = 10, $offset: Int = 0, $is_active: Boolean = true, $tenant_id: uuid!) {
  product_aggregate(
    where: {is_active: {_eq: $is_active}, tenant_id: {_eq: $tenant_id}}
  ) {
    aggregate {
      count
    }
  }
  product(
    limit: $limit
    offset: $offset
    where: {is_active: {_eq: $is_active}, tenant_id: {_eq: $tenant_id}}
  ) {
    id
    description
    name
    image_url
    price
    quantity
    category {
      name
      slug
    }
  }
}
    `;
export const VerifyTokenDocument = gql`
    mutation verifyToken($token: String!, $resend: Boolean) {
  email_verify(args: {token: $token, resend: $resend}) {
    result
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getUserAddressById(variables?: GetUserAddressByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserAddressByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserAddressByIdQuery>(GetUserAddressByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserAddressById', 'query', variables);
    },
    getUserById(variables?: GetUserByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByIdQuery>(GetUserByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserById', 'query', variables);
    },
    updateUserById(variables: UpdateUserByIdMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateUserByIdMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserByIdMutation>(UpdateUserByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUserById', 'mutation', variables);
    },
    getCities(variables?: GetCitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCitiesQuery>(GetCitiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCities', 'query', variables);
    },
    getDistricts(variables?: GetDistrictsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDistrictsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDistrictsQuery>(GetDistrictsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDistricts', 'query', variables);
    },
    getQuarters(variables?: GetQuartersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetQuartersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuartersQuery>(GetQuartersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getQuarters', 'query', variables);
    },
    GetQuarterById(variables?: GetQuarterByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetQuarterByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuarterByIdQuery>(GetQuarterByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetQuarterById', 'query', variables);
    },
    getDistrictById(variables?: GetDistrictByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDistrictByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDistrictByIdQuery>(GetDistrictByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDistrictById', 'query', variables);
    },
    getCityById(variables?: GetCityByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetCityByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCityByIdQuery>(GetCityByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCityById', 'query', variables);
    },
    getUserOrders(variables?: GetUserOrdersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserOrdersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserOrdersQuery>(GetUserOrdersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserOrders', 'query', variables);
    },
    createNewAddress(variables?: CreateNewAddressMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateNewAddressMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateNewAddressMutation>(CreateNewAddressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createNewAddress', 'mutation', variables);
    },
    getUserByEmail(variables: GetUserByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByEmailQuery>(GetUserByEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserByEmail', 'query', variables);
    },
    GetLocationQuery(variables?: GetLocationQueryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetLocationQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLocationQueryQuery>(GetLocationQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetLocationQuery', 'query', variables);
    },
    getAllCoupons(variables?: GetAllCouponsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllCouponsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllCouponsQuery>(GetAllCouponsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllCoupons', 'query', variables);
    },
    getUserFavorites(variables?: GetUserFavoritesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserFavoritesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserFavoritesQuery>(GetUserFavoritesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserFavorites', 'query', variables);
    },
    addToFavorites(variables: AddToFavoritesMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddToFavoritesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddToFavoritesMutation>(AddToFavoritesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addToFavorites', 'mutation', variables);
    },
    removeFromFavorites(variables: RemoveFromFavoritesMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RemoveFromFavoritesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveFromFavoritesMutation>(RemoveFromFavoritesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeFromFavorites', 'mutation', variables);
    },
    getUserAddresses(variables: GetUserAddressesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserAddressesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserAddressesQuery>(GetUserAddressesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserAddresses', 'query', variables);
    },
    loginMutation(variables?: LoginMutationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LoginMutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutationMutation>(LoginMutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'loginMutation', 'mutation', variables);
    },
    expiredRefreshToken(variables?: ExpiredRefreshTokenMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ExpiredRefreshTokenMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExpiredRefreshTokenMutation>(ExpiredRefreshTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'expiredRefreshToken', 'mutation', variables);
    },
    register(variables: RegisterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'register', 'mutation', variables);
    },
    getBanners(variables?: GetBannersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetBannersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBannersQuery>(GetBannersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBanners', 'query', variables);
    },
    updateDbCart(variables: UpdateDbCartMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateDbCartMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDbCartMutation>(UpdateDbCartDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateDbCart', 'mutation', variables);
    },
    getDbCart(variables?: GetDbCartQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDbCartQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDbCartQuery>(GetDbCartDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDbCart', 'query', variables);
    },
    getMainCategories(variables?: GetMainCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMainCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMainCategoriesQuery>(GetMainCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMainCategories', 'query', variables);
    },
    getAllCategories(variables?: GetAllCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllCategoriesQuery>(GetAllCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllCategories', 'query', variables);
    },
    sendMessageAlone(variables: SendMessageAloneMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SendMessageAloneMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendMessageAloneMutation>(SendMessageAloneDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sendMessageAlone', 'mutation', variables);
    },
    sendMessage(variables: SendMessageMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SendMessageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendMessageMutation>(SendMessageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sendMessage', 'mutation', variables);
    },
    markAsRead(variables: MarkAsReadMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarkAsReadMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarkAsReadMutation>(MarkAsReadDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'markAsRead', 'mutation', variables);
    },
    subscribeToChats(variables?: SubscribeToChatsSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SubscribeToChatsSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubscribeToChatsSubscription>(SubscribeToChatsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'subscribeToChats', 'subscription', variables);
    },
    getSingleTenantOrderItem(variables?: GetSingleTenantOrderItemQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSingleTenantOrderItemQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSingleTenantOrderItemQuery>(GetSingleTenantOrderItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSingleTenantOrderItem', 'query', variables);
    },
    createOrder(variables: CreateOrderMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrderMutation>(CreateOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createOrder', 'mutation', variables);
    },
    getAllProducts(variables?: GetAllProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllProductsQuery>(GetAllProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllProducts', 'query', variables);
    },
    getProductById(variables?: GetProductByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductByIdQuery>(GetProductByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductById', 'query', variables);
    },
    getProductForCart(variables?: GetProductForCartQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductForCartQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductForCartQuery>(GetProductForCartDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductForCart', 'query', variables);
    },
    getProductPricesById(variables?: GetProductPricesByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductPricesByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductPricesByIdQuery>(GetProductPricesByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductPricesById', 'query', variables);
    },
    getProductsForInitialCart(variables?: GetProductsForInitialCartQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductsForInitialCartQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsForInitialCartQuery>(GetProductsForInitialCartDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductsForInitialCart', 'query', variables);
    },
    getProductActionData(variables: GetProductActionDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductActionDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductActionDataQuery>(GetProductActionDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductActionData', 'query', variables);
    },
    getProductActionDataForAnonymous(variables: GetProductActionDataForAnonymousQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductActionDataForAnonymousQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductActionDataForAnonymousQuery>(GetProductActionDataForAnonymousDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductActionDataForAnonymous', 'query', variables);
    },
    getProductInformation(variables: GetProductInformationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductInformationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductInformationQuery>(GetProductInformationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductInformation', 'query', variables);
    },
    getProductImages(variables: GetProductImagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductImagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductImagesQuery>(GetProductImagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductImages', 'query', variables);
    },
    getProductDescription(variables: GetProductDescriptionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductDescriptionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductDescriptionQuery>(GetProductDescriptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductDescription', 'query', variables);
    },
    getProductComments(variables: GetProductCommentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductCommentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductCommentsQuery>(GetProductCommentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductComments', 'query', variables);
    },
    getProductsWithPagination(variables?: GetProductsWithPaginationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductsWithPaginationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsWithPaginationQuery>(GetProductsWithPaginationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductsWithPagination', 'query', variables);
    },
    getProductsWithFilteredPagination(variables?: GetProductsWithFilteredPaginationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductsWithFilteredPaginationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsWithFilteredPaginationQuery>(GetProductsWithFilteredPaginationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductsWithFilteredPagination', 'query', variables);
    },
    searchProducts(variables?: SearchProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SearchProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchProductsQuery>(SearchProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'searchProducts', 'query', variables);
    },
    getOrdersWithReviews(variables: GetOrdersWithReviewsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetOrdersWithReviewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrdersWithReviewsQuery>(GetOrdersWithReviewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrdersWithReviews', 'query', variables);
    },
    createReview(variables: CreateReviewMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateReviewMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateReviewMutation>(CreateReviewDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createReview', 'mutation', variables);
    },
    getProductReviews(variables?: GetProductReviewsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductReviewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductReviewsQuery>(GetProductReviewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductReviews', 'query', variables);
    },
    getVendorById(variables?: GetVendorByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetVendorByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVendorByIdQuery>(GetVendorByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVendorById', 'query', variables);
    },
    getVendorProductsWithPagination(variables: GetVendorProductsWithPaginationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetVendorProductsWithPaginationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetVendorProductsWithPaginationQuery>(GetVendorProductsWithPaginationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVendorProductsWithPagination', 'query', variables);
    },
    verifyToken(variables: VerifyTokenMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<VerifyTokenMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyTokenMutation>(VerifyTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'verifyToken', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;