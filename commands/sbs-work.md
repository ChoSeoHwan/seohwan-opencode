---
description: SBS 실행 (다음 Task 1개만 수행하고 검수 대기)
agent: atlas
subtask: true
---

## Plan Name 결정

`$ARGUMENTS`로부터 plan name을 결정해라:

1. **`$ARGUMENTS`가 비어있지 않으면**: 해당 값을 plan name으로 사용 (기존 동작)
2. **`$ARGUMENTS`가 비어있으면**: `.sisyphus/plans/` 디렉토리에서 `- [ ]`(미완료 Task)가 존재하는 `.md` 파일을 찾아 자동 선택
   - 플랜이 0개면: "❌ 진행 중인 플랜이 없습니다. `/sbs-plan`으로 새 플랜을 생성하세요." 출력 후 종료
   - 플랜이 1개면: 해당 플랜을 자동 선택
   - 플랜이 2개 이상이면: `question` 도구를 사용하여 선택
     - header: "플랜 선택"
     - question: "진행할 플랜을 선택하세요"
     - options: [플랜 이름 목록 (확장자 제외)]

위에서 결정된 plan name을 `{PLAN_NAME}`으로 사용해라.

## Task 수행

`.sisyphus/plans/{PLAN_NAME}.md`에서 다음 미완료 Task(`- [ ]`) 1개만 수행해라.

**Task 수행 전 반드시 아래 정보를 출력해라:**
```
- 플랜: {PLAN_NAME}
- 태스크: {수행할 Task 번호/제목}
```

필수 규칙:
- 해당 Task 범위만 구현
- 구현 후 즉시 멈추고 다음 Task 진행 금지
- 해당 Task의 `[GATE]` 기준으로 검수 요청
- 사용자 approve 전 체크박스를 `- [x]`로 변경 금지

검수 요청에 반드시 포함:
- 수행한 Task 번호/제목
- 변경 파일 목록
- 변경 요약
- 실행한 검증 결과(가능하면 lint/typecheck/test 중 1개 이상)
- `[GATE]` 검수 포인트/성공 기준 체크리스트

---

다음 액션:
- 승인: `/sbs-approve {PLAN_NAME}`
- 반려(변경 요청): `/sbs-reject {PLAN_NAME} {변경 요청 내용}`
