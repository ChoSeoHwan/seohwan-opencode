import type { ApproveResult } from './sbs-chain.type.js';

export const extractJsonObject = (text: string): string | null => {
    const start = text.indexOf('{');

    if (start < 0) {
        return null;
    }

    let depth = 0;

    for (let i = start; i < text.length; i += 1) {
        const ch = text[i];

        if (ch === '{') {
            depth += 1;
        }

        if (ch === '}') {
            depth -= 1;

            if (depth === 0) {
                return text.slice(start, i + 1);
            }
        }
    }

    return null;
};

const APPROVE_RESULT_MARKER = 'APPROVE RESULT';
export const parseApproveResult = (text: string): ApproveResult | null => {
    const markerIndex = text.lastIndexOf(APPROVE_RESULT_MARKER);

    if (markerIndex < 0) {
        return null;
    }

    const resultText = text.slice(markerIndex + APPROVE_RESULT_MARKER.length);
    const jsonText = extractJsonObject(resultText);
    if (!jsonText) return null;

    try {
        const parsed = JSON.parse(jsonText);
        if (!parsed || typeof parsed !== 'object') return null;

        let result = parsed.RESULT;
        if (typeof result !== 'string') return null;
        result = result.toUpperCase().trim();

        if (result === 'ERROR') return { RESULT: 'ERROR' };
        if (result === 'SUCCESS') {
            const plan = parsed.PLAN;
            if (typeof plan !== 'string') return null;

            return { RESULT: 'SUCCESS', PLAN: plan };
        }

        if (['FINISH', 'FINISHED'].includes(result)) {
            const plan = parsed.PLAN;
            if (typeof plan !== 'string') return null;

            return { RESULT: 'FINISHED', PLAN: plan };
        }

        return null;
    } catch {
        return null;
    }
};
