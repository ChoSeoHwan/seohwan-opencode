import { z } from 'zod';

import { MessageParser } from '../../common/message-parser.js';
import type { QuestionCommandParam } from './sbs-chain.run-question.type.js';

const QUESTION_PARAM_MARKER = 'PLAN APPROVE QUESTION';
export const parseQuestionParam = (
    text: string
): QuestionCommandParam | null => {
    const markerIndex = text.lastIndexOf(QUESTION_PARAM_MARKER);
    if (markerIndex < 0) throw new Error('QUESTION_PARAM_MARKER not found');

    const resultText = text.slice(markerIndex + QUESTION_PARAM_MARKER.length);
    const jsonText = MessageParser.toJSONObject(resultText);
    if (jsonText.length === 0) throw new Error('QUESTION_PARAM JSON not found');

    const schema = z.object({ PLAN: z.string(), TASK: z.string() });

    try {
        const raw = jsonText[0];
        return schema.parse(raw);
    } catch {
        return null;
    }
};
