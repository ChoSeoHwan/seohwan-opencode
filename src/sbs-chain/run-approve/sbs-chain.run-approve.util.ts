import { z } from 'zod';

import { MessageParser } from '../../common/message-parser.js';
import type { ApproveResult } from './sbs-chain.run-approve.type.js';

const APPROVE_RESULT_MARKER = 'APPROVE RESULT';
export const parseApproveResult = (text: string): ApproveResult | null => {
    const markerIndex = text.lastIndexOf(APPROVE_RESULT_MARKER);
    if (markerIndex < 0) throw new Error('APPROVE RESULT marker not found');

    const resultText = text.slice(markerIndex + APPROVE_RESULT_MARKER.length);
    const jsonText = MessageParser.toJSONObject(resultText);
    if (jsonText.length === 0) throw new Error('APPROVE RESULT JSON not found');

    const schema = z.union([
        z.object({ RESULT: z.literal('ERROR') }),
        z.object({ RESULT: z.literal('SUCCESS'), PLAN: z.string() }),
        z.object({
            RESULT: z.literal('FINISHED'),
            PLAN: z.string()
        })
    ]);

    try {
        const raw = jsonText[0];
        if (typeof raw?.RESULT === 'string')
            raw.RESULT = raw.RESULT.toUpperCase().trim();

        return schema.parse(raw);
    } catch {
        return null;
    }
};
