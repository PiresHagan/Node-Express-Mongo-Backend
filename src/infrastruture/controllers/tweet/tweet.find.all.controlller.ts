import { NextFunction, Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpGet } from "inversify-express-utils"
import { TweetFindAllUseCase } from "../../../application/use-cases/tweet/tweet.find.all.usecase"
import { TYPES } from "../../../types"

@controller('/tweet')
export class TweetFindAllController {
    constructor(
        @inject(TYPES.TweetFindAllUseCase)
        private tweetFindAllUseCase: TweetFindAllUseCase
    ) {
    }
    @httpGet('/', TYPES.AuthMiddleware)
    async execute(req: Request, res: Response, next: NextFunction) {
        try {

            const tweetsFound = await this.tweetFindAllUseCase.execute()

            res.status(200).send(tweetsFound)
        } catch (error) {
            next(error)
        }

    }
}