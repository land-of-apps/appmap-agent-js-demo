import { main } from "../lib/index.mjs";
import { strict as Assert } from "assert";

describe("index", () => {
  describe("main", () => {
    it("should return main", () => {
      Assert.equal(main(), "main");
    });
  });
});
