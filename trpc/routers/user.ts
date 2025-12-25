import { procedure, router } from "../../server/trcp";

export const userRouter = router({
  list: procedure.query(() => {
    console.log("🚀 LIST CALLED");
    return [{ id: 1, name: "Test" }];
  }),
});
