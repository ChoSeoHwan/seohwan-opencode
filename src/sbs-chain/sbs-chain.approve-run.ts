import {
    type Event,
    type EventCommandExecuted,
    OpencodeClient
} from '@opencode-ai/sdk';

import { runCommand, showToast } from '../util.js';
import { parseApproveResult } from './sbs-chain.util.js';

const APPROVE_COMMAND_NAMES = new Set(['sbs-approve', '/sbs-approve']);

function isCommandExecutedEvent(event: Event): event is EventCommandExecuted {
    return event.type === 'command.executed';
}

export const sbsChainApproveRun = async (data: {
    client: OpencodeClient;
    directory: string;
    event: Event;
}) => {
    const { client, directory, event } = data;

    if (!isCommandExecutedEvent(event)) {
        return;
    }

    if (!APPROVE_COMMAND_NAMES.has(event.properties.name)) {
        return;
    }

    const sessionID = event.properties.sessionID;
    const messageID = event.properties.messageID;

    const messageResult = await client.session.message({
        path: {
            id: sessionID,
            messageID
        },
        query: {
            directory
        }
    });

    if (messageResult.error || !messageResult.data) {
        await showToast({
            client,
            message: 'sbs-approve 결과 메시지를 읽지 못했습니다.',
            variant: 'error'
        });
        return;
    }

    const text = messageResult.data.parts
        .filter((part) => part.type === 'text')
        .map((part) => part.text)
        .join('\n');

    const parsed = parseApproveResult(text);

    if (!parsed) {
        await showToast({
            client,
            message: `APPROVE RESULT 파싱에 실패했습니다.\n\n${text}`,
            variant: 'error'
        });
        return;
    }

    const result = parsed.RESULT;
    if (result === 'ERROR') {
        await showToast({
            client,
            message: '승인 결과가 ERROR입니다. 로그를 확인하세요.',
            variant: 'error'
        });
        return;
    }

    if (result === 'SUCCESS') {
        const commandResult = await runCommand(
            client,
            sessionID,
            'sbs-work',
            parsed.PLAN
        );

        if (commandResult.error) {
            await showToast({
                client,
                message: '/sbs-work 자동 실행에 실패했습니다.',
                variant: 'error'
            });
        }

        return;
    }

    if (result === 'FINISHED') {
        const commandResult = await runCommand(
            client,
            sessionID,
            'sbs-cleanup-plan',
            parsed.PLAN
        );

        if (commandResult.error) {
            await showToast({
                client,
                message: '/sbs-cleanup-plan 자동 실행에 실패했습니다.',
                variant: 'error'
            });
        }

        return;
    }
};
