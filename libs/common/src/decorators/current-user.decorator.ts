import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UsersDocument } from "../../../../apps/auth/src/users/models/users.schema";


//We have made the user available in the content of requeest by validate method in the local stategy, now just need to pull the user from the requeest
const getCurrentUserBContext = (context: ExecutionContext): UsersDocument => {
    return context.switchToHttp().getRequest().user
}

export const currentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => getCurrentUserBContext(context))