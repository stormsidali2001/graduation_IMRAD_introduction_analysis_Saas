"use action";

import { adminAction, authActionClient } from "@/lib/safe-action";
import { getAllFeedbacks } from "../services/user-data";
import { RetrieverParamsDto } from "../validation/RetrieverParamsDto";
import { getUsers } from "../services/user-service";

export const getAllUsersAction =
  // TODO: uncomment this later
  //adminAction
  adminAction
    .metadata({
      actionName: "getAllUsersAction",
    })
    .schema(RetrieverParamsDto)
    .action(async ({ parsedInput, ctx }) => {
      return getUsers(parsedInput, ctx.userId);
    });
