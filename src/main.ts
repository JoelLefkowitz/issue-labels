import { environment } from "./services/environment";
import { fetch } from "./services/fetch";
import { parse } from "./services/parse";

fetch(environment())
  .then((issues) => issues.map(parse))
  .catch(console.error);
