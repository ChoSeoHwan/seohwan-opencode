
# SBS 검수 승인

## 변수 검증

### `{PLAN}` 검증

아래 규칙으로 `{PLAN}` 을 결정해라:

- `{PLAN}` 이 비어있으면 반드시 `@notices/error-no-plan.md` 의 내용을 출력하고 종료해라.

- `.sisyphus/plans/{PLAN}.md` 파일이 존재하는지 확인해라. 존재하지 않으면 반드시 `@notices/error-no-file.md` 의 내용을 출력하고 종료해라.

### `{TASK}` 결정

아래 규칙으로 `{TASK}` 을 결정하고 검증해라:

`{TASK}`: `.sisyphus/plans/{PLAN}.md` 에서 `- [ ]`(미완료 Task) 중 가장 첫 번째 Task

- `{TASK}`(미완료 태스크) 가 없으면 반드시 `@notices/approve-finished.md` 의 내용을 출력하고 종료해라.

## 승인 작업

### **최상단에 반드시 아래 정보를 출력해라:**

```
- 플랜: {PLAN}
- 태스크: {TASK}

**`{TASK}` 를 승인하겠습니다.**
```

### 승인 프로세스:

1. `.sisyphus/plans/{PLAN}.md` 읽기
2. 가장 최근 수행된 Task (= 마지막으로 검수 요청된 `- [ ]` Task) 찾기
3. 현재 Task의 체크박스를 `- [x]`로 변경
4. 플랜 파일 저장

### **마지막에 반드시 아래 정보를 출력해라:**

- 다음 미완료 Task(`- [ ]`)가 있으면 반드시 `@notices/approve-success.md` 의 내용을 출력하고 종료

- 모든 Task가 완료되었으면 반드시 `@notices/approve-finished.md` 의 내용을 출력하고 종료

### 출력 시 주의사항

- notice 파일 내의 `{PLAN}`, `{TASK}` 플레이스홀더는 실제 값으로 치환하여 출력해라.