import { type Event, OpencodeClient } from '@opencode-ai/sdk';

import { ClientHelper } from '../../common/client-helper.js';
import { parseQuestionParam } from './sbs-chain.run-question.util.js';

const RUN_QUESTION_EXECUTE_COMMANDS = new Set([
    'sbs-plan',
    '/sbs-plan',
    'sbs-reject',
    '/sbs-reject',
    'sbs-work',
    '/sbs-work'
]);

export const sbsChainRunQuestion = async (data: {
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
            !RUN_QUESTION_EXECUTE_COMMANDS.has(
                commandExecutedEvent.properties.name
            )
        )
            return;

        const text = await clientHelper.getMessage();
        if (!text) return;

        const parsed = parseQuestionParam(text);

        if (!parsed)
            throw new Error(`QUESTION PARAM 파싱에 실패했습니다.\n\n${text}`);

        const result = await clientHelper.runCommand(
            'sbs-approve-question',
            `"${parsed.PLAN}" "${parsed.TASK}"`
        );

        if (result.error)
            throw new Error('/sbs-approve-question 자동 실행에 실패했습니다.', {
                cause: result.error
            });
    } catch (error) {
        await clientHelper.toastError(error);
    }
};
