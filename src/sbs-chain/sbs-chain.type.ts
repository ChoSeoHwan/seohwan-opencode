export interface ErrorResult {
    RESULT: 'ERROR';
}

export interface SuccessResult {
    RESULT: 'SUCCESS';
    PLAN: string;
}

export interface FinishResult {
    RESULT: 'FINISHED';
    PLAN: string;
}

export type ApproveResult = ErrorResult | SuccessResult | FinishResult;
