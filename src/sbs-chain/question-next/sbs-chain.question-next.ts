import { type Event, OpencodeClient } from '@opencode-ai/sdk';

import { ClientHelper } from '../../common/client-helper.js';
import { QuestionResultType } from './sbs-chain.question-next.constant.js';
import { parseQuestionResult } from './sbs-chain.question-next.util.js';

const APPROVE_QUESTION_COMMANDS = new Set(['sbs-approve-question']);

export const sbsChainQuestionNext = async (data: {
    client: OpencodeClient;
    directory: string;
    event: Event;
}) => {
    const { client, directory, event } = data;

    const clientHelper = new ClientHelper({ client, directory, event });

    try {
        const commandExecutedEvent = clientHelper.getCommandExecutedEvent();
        if (!commandExecutedEvent) return;
        await clientHelper.showToast({
            message: commandExecutedEvent.properties.name
        });
        if (
            !APPROVE_QUESTION_COMMANDS.has(commandExecutedEvent.properties.name)
        )
            return;

        const text = await clientHelper.getMessage();
        if (!text) return;

        const parsed = parseQuestionResult(text);

        if (!parsed)
            throw new Error(`QUESTION RESULT 파싱에 실패했습니다.\n\n${text}`);

        if (parsed.TYPE === QuestionResultType.APPROVE) {
            const result = await clientHelper.runCommand(
                'sbs-approve',
                `"${parsed.PLAN}"`
            );

            if (result.error)
                throw new Error(
                    `sbs-approve 실행에 실패했습니다.\n\n${result.error}`
                );
            return;
        }

        if (parsed.TYPE === QuestionResultType.REJECT) {
            const result = await clientHelper.runCommand(
                'sbs-reject',
                `"${parsed.PLAN}" "${parsed.REASON}"`
            );

            if (result.error)
                throw new Error(
                    `sbs-reject 실행에 실패했습니다.\n\n${result.error}`
                );
            return;
        }
    } catch (error) {
        await clientHelper.toastError(error);
    }
};
