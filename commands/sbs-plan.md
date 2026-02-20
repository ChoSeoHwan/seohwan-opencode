---
description: SBS 플랜 생성 (Prometheus + [GATE] + 한국어 요약)
agent: prometheus
subtask: true
---

플랜 이름은 `$ARGUMENTS`다.

아래 규칙으로 SBS 플랜만 생성해라:
- 결과를 `.sisyphus/plans/$ARGUMENTS.md`에 저장
- Task는 체크리스트(`- [ ]`) 형식
- 각 Task 끝에 반드시 `[GATE]` 추가
- `[GATE]`는 검수 포인트 / 성공 기준 / approve 필요만 포함
- 마지막에 한국어 "플랜 요약" 포함

최종 출력은 아래 2줄만:
- `Plan saved to: .sisyphus/plans/$ARGUMENTS.md`
- `다음 단계: /sbs-work $ARGUMENTS`
