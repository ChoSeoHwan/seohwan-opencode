import type { Plugin } from '@opencode-ai/plugin';

export const showToast = async (data: {
    client: Parameters<Plugin>[0]['client'];
    message: string;
    variant?: 'info' | 'warning' | 'error';
    duration?: number;
}) => {
    const { client, message, variant } = data;
    await client.tui.showToast({
        body: {
            message,
            variant: variant ?? 'warning',
            duration: data.duration
        }
    });
};

export const runCommand = (
    client: Parameters<Plugin>[0]['client'],
    sessionID: string,
    command: string,
    argumentsText: string
) => {
    return client.session.command({
        path: {
            id: sessionID
        },
        body: {
            command,
            arguments: argumentsText
        }
    });
};
