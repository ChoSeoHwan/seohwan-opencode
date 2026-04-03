import type {
    Event,
    EventCommandExecuted,
    OpencodeClient
} from '@opencode-ai/sdk';

export class ClientHelper {
    private readonly client: OpencodeClient;
    private readonly directory: string;
    private readonly event: Event;

    constructor(data: {
        client: OpencodeClient;
        directory: string;
        event: Event;
    }) {
        this.client = data.client;
        this.directory = data.directory;
        this.event = data.event;
    }

    getCommandExecutedEvent(): EventCommandExecuted | false {
        if (this.event.type !== 'command.executed') return false;
        return this.event;
    }

    get sessionID() {
        if (!('sessionID' in this.event.properties))
            throw new Error('sessionID is not defined');
        return this.event.properties.sessionID as string;
    }

    get messageID() {
        if (!('messageID' in this.event.properties))
            throw new Error('messageID is not defined');
        return this.event.properties.messageID as string;
    }

    async getMessageRaw() {
        const sessionID = this.sessionID;
        const messageID = this.messageID;

        try {
            return await this.client.session.message({
                path: { id: sessionID, messageID },
                query: { directory: this.directory }
            });
        } catch (error) {
            throw new Error('Failed to get message', { cause: error });
        }
    }

    async getMessage(): Promise<string | null> {
        const messageResult = await this.getMessageRaw();
        if (messageResult.error || !messageResult.data)
            throw new Error('메시지 결과를 가져오지 못했습니다.');

        return messageResult.data.parts
            .filter((part) => part.type === 'text')
            .map((part) => part.text)
            .join('\n');
    }

    async showToast(data: {
        message: string;
        variant?: 'info' | 'warning' | 'error';
        duration?: number;
    }) {
        const { message, variant } = data;
        await this.client.tui.showToast({
            body: {
                message,
                variant: variant ?? 'warning',
                duration: data.duration
            }
        });
    }

    async runCommand(command: string, argumentsText: string) {
        const sessionID = this.sessionID;
        return this.client.session.command({
            path: { id: sessionID },
            body: {
                command,
                arguments: argumentsText
            }
        });
    }

    async toastError(error: unknown) {
        let message = '예상치 못한 오류가 발생하였습니다.';
        if (error instanceof Error) {
            message = error.message;
        }

        message += `\n\n${error}`;
        await this.showToast({ message, variant: 'error' });
    }
}
