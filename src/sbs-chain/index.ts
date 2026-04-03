import { type Event, OpencodeClient } from '@opencode-ai/sdk';

import { sbsChainQuestionNext } from './question-next/sbs-chain.question-next.js';
import { sbsChainRunApprove } from './run-approve/sbs-chain.run-approve.js';
import { sbsChainRunQuestion } from './run-question/sbs-chain.run-question.js';

export const sbsChain = async (data: {
    client: OpencodeClient;
    directory: string;
    event: Event;
}) => {
    await sbsChainRunApprove(data);
    await sbsChainRunQuestion(data);
    await sbsChainQuestionNext(data);
};
