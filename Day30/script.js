import { httpRequest } from "./httpRequest.js";

const response = httpRequest.get("/api/artists");
console.log(response);
