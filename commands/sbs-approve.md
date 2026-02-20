---
description: SBS 검수 승인 (Task 완료 → 다음 Task 자동 진행)
agent: atlas
---

플랜 이름은 `$ARGUMENTS`다.

`.sisyphus/plans/$ARGUMENTS.md`에서 가장 최근 수행된 Task를 찾아 승인 처리해라.

승인 프로세스:
1. `.sisyphus/plans/$ARGUMENTS.md` 읽기
2. 가장 최근 수행된 Task (= 마지막으로 검수 요청된 `- [ ]` Task) 찾기
3. 해당 Task의 체크박스를 `- [x]`로 변경
4. 플랜 파일 저장
5. 다음 미완료 Task(`- [ ]`)가 있으면 `/sbs-work $ARGUMENTS` 명령어를 자동 수행하는 것과 동일하게 해당 Task를 즉시 수행
   - 해당 Task 범위만 구현
   - 구현 후 즉시 멈추고 다음 Task 진행 금지
   - 해당 Task의 `[GATE]` 기준으로 검수 요청
   - 사용자 approve 전 체크박스를 `- [x]`로 변경 금지
6. 다음 미완료 Task가 없으면:
   - "🎉 모든 Task 완료!" 메시지 출력
   - 사용자에게 질문: "플랜 파일(`.sisyphus/plans/$ARGUMENTS.md`)을 삭제할까요? (yes/no)"
   - 사용자가 "yes" 응답 시: 플랜 파일 삭제
   - 사용자가 "no" 응답 시: 플랜 파일 유지하고 종료

검수 요청에 반드시 포함:
- 수행한 Task 번호/제목
- 변경 파일 목록
- 변경 요약
- 실행한 검증 결과(가능하면 lint/typecheck/test 중 1개 이상)
- `[GATE]` 검수 포인트/성공 기준 체크리스트
