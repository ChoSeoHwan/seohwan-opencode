import { QuestionResultType } from './sbs-chain.question-next.constant.js';

export interface QuestionApproveResult {
    TYPE: QuestionResultType.APPROVE;
    PLAN: string;
    TASK: string;
}

export interface QuestionRejectResult {
    TYPE: QuestionResultType.REJECT;
    REASON: string;
    PLAN: string;
    TASK: string;
}

export interface QuestionCloseResult {
    TYPE: QuestionResultType.CLOSE;
}

export type QuestionResult =
    | QuestionApproveResult
    | QuestionRejectResult
    | QuestionCloseResult;
