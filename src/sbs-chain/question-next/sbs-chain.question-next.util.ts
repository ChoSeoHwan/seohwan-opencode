import { z } from 'zod';

import { MessageParser } from '../../common/message-parser.js';
import { QuestionResultType } from './sbs-chain.question-next.constant.js';
import type { QuestionResult } from './sbs-chain.question-next.type.js';

const QUESTION_RESULT_MARKER = 'QUESTION RESULT';
export const parseQuestionResult = (text: string): QuestionResult | null => {
    const markerIndex = text.lastIndexOf(QUESTION_RESULT_MARKER);
    if (markerIndex < 0) return { TYPE: QuestionResultType.CLOSE };

    const resultText = text.slice(markerIndex + QUESTION_RESULT_MARKER.length);
    const jsonText = MessageParser.toJSONObject(resultText);
    if (jsonText.length === 0) return { TYPE: QuestionResultType.CLOSE };

    const schema = z.union([
        z.object({
            TYPE: z.literal(QuestionResultType.APPROVE),
            PLAN: z.string(),
            TASK: z.string()
        }),
        z.object({
            TYPE: z.literal(QuestionResultType.REJECT),
            REASON: z.string(),
            PLAN: z.string(),
            TASK: z.string()
        }),
        z.object({
            TYPE: z.literal(QuestionResultType.CLOSE)
        })
    ]);

    try {
        const raw = jsonText[0];
        return schema.parse(raw);
    } catch {
        return null;
    }
};
