import type { Plugin } from '@opencode-ai/plugin';

import { sbsChainApproveRun } from '../src/sbs-chain/index.js';

export const SbsChainPlugin: Plugin = async ({ client, directory }) => {
    return {
        event: async ({ event }) => {
            await sbsChainApproveRun({
                client,
                directory,
                event
            });
        }
    };
};
