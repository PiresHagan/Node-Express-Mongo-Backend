import { NextFunction, Response } from 'express';
import { controller, httpPost, requestBody } from 'inversify-express-utils';
import { TweetRequest } from '../../../shared/infrastruture/types';
import { inject } from 'inversify';
import { TYPES } from '../../../types';
import { TweetDtoType } from '../../../shared/infrastruture/dtos/tweet.dto';
import { TweetCreateUseCase } from '../../application/usecase/tweet-create.usecase';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { ContentVO } from '../../../shared/domain/value-objects/content.vo';

@controller('/tweet')
export class TweetCreateController {
    constructor(
        @inject(TYPES.TweetCreateUseCase)
        private tweetCreateUseCase: TweetCreateUseCase
    ) {}
    @httpPost('/', TYPES.AuthMiddleware)
    async execute(
        req: TweetRequest<TweetDtoType>,
        res: Response,
        next: NextFunction
    ) {
        const { id, content } = req.body;

        try {
            const tweetCreated = await this.tweetCreateUseCase.execute(
                new UuidVO(id),
                new ContentVO(content),
                new UuidVO(req.userId)
            );

            res.status(201).send(tweetCreated);
        } catch (error) {
            next(error);
        }
    }
}
