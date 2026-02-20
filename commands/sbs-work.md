---
description: SBS 실행 (다음 Task 1개만 수행하고 검수 대기)
agent: atlas
---

플랜 이름은 `$ARGUMENTS`다.

`.sisyphus/plans/$ARGUMENTS.md`에서 다음 미완료 Task(`- [ ]`) 1개만 수행해라.

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
