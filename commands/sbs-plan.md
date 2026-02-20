---
description: SBS 플랜 생성 (Prometheus + [GATE] + 한국어 요약)
agent: prometheus
---

요청 내용 :
- $ARGUMENTS

먼저 아래 규칙으로 plan name을 자동 생성해라:
- 요청 설명을 요약한 kebab-case
- 영문 소문자/숫자/하이픈(`a-z`, `0-9`, `-`)만 사용
- 공백/슬래시/한글/특수문자 금지
- 길이 48자 이내
- 생성한 이름을 `<plan-name>`으로 사용

아래 규칙으로 SBS 플랜만 생성해라:
- 결과를 `.sisyphus/plans/<plan-name>.md`에 저장한다.
- Task는 반드시 체크리스트(- [ ]) 형태로 작성한다.
- 각 Task 블록 끝에 반드시 `[GATE]` 섹션을 넣어라. `[GATE]`에는:
   - 검수 포인트(무엇을 확인받을지)
   - 성공 기준(어떤 상태면 OK인지)
   - 다음 Task 진행 조건: '사용자 approve가 있어야만 진행'을 명시
- 플랜 끝에 '플랜 요약' 섹션을 반드시 한국어로 작성하라.

최종 출력은 아래 3줄만:
- `Plan name: <plan-name>`
- `Plan saved to: .sisyphus/plans/<plan-name>.md`
- `다음 단계: /sbs-work <plan-name>`
