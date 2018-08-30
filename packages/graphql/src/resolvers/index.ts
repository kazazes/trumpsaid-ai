import Mutation from "./Mutation";
import Query from "./Query";

// FIXME: TSC 3.0.1 bug won't resolve IApolloContext in generated definitions, so including manually. Remove, compile, check generated definition to see if fixed.
import { IApolloContext } from "../apollo";
const _: IApolloContext = undefined;
// tslint:disable-next-line:no-unused-expression
_;

export default {
  Query,
  Mutation
};
