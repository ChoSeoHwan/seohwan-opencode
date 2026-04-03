import { type Event, OpencodeClient } from '@opencode-ai/sdk';

import { ClientHelper } from '../../common/client-helper.js';
import { parseApproveResult } from './sbs-chain.run-approve.util.js';

const APPROVE_COMMAND_NAMES = new Set(['sbs-approve', '/sbs-approve']);

export const sbsChainRunApprove = async (data: {
    client: OpencodeClient;
    directory: string;
    event: Event;
}) => {
    const { client, directory, event } = data;

    const clientHelper = new ClientHelper({ client, directory, event });

    try {
        const commandExecutedEvent = clientHelper.getCommandExecutedEvent();
        if (!commandExecutedEvent) return;
        if (!APPROVE_COMMAND_NAMES.has(commandExecutedEvent.properties.name))
            return;

        const text = await clientHelper.getMessage();
        if (!text) return;

        const parsed = parseApproveResult(text);

        if (!parsed)
            throw new Error(`APPROVE RESULT 파싱에 실패했습니다.\n\n${text}`);

        const result = parsed.RESULT;
        if (result === 'ERROR')
            throw new Error('승인 결과가 ERROR입니다. 로그를 확인하세요.');

        if (result === 'SUCCESS') {
            const commandResult = await clientHelper.runCommand(
                'sbs-work',
                parsed.PLAN
            );

            if (commandResult.error)
                throw new Error('/sbs-work 자동 실행에 실패했습니다.', {
                    cause: commandResult.error
                });

            return;
        }

        if (result === 'FINISHED') {
            const commandResult = await clientHelper.runCommand(
                'sbs-cleanup-plan',
                parsed.PLAN
            );

            if (commandResult.error)
                throw new Error('/sbs-cleanup-plan 자동 실행에 실패했습니다.', {
                    cause: commandResult.error
                });

            return;
        }
    } catch (error) {
        await clientHelper.toastError(error);
    }
};
