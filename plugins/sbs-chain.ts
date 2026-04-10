Error.stackTraceLimit = Infinity;

import type { Plugin } from '@opencode-ai/plugin';
import type { OpencodeClient } from '@opencode-ai/sdk';

import { sbsChain } from '../src/sbs-chain/index.js';

export const SbsChainPlugin: Plugin = async ({ client, directory }) => {
    const opencodeClient = client as unknown as OpencodeClient;
    return {
        event: async ({ event }) => {
            await sbsChain({
                client: opencodeClient,
                directory,
                event
            });
        }
    };
};
