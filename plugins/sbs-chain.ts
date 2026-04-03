import type { Plugin } from '@opencode-ai/plugin';

import { sbsChain } from '../src/sbs-chain/index.js';

export const SbsChainPlugin: Plugin = async ({ client, directory }) => {
    return {
        event: async ({ event }) => {
            await sbsChain({
                client,
                directory,
                event
            });
        }
    };
};
