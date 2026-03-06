---
description: SBS 검수 승인 (Task 완료 → 다음 Task 자동 진행)
agent: atlas
---

# 변수 설정 및 검증

## `{PLAN}` 결정

아래 규칙으로 `{PLAN}` 을 결정해라:

`{PLAN}`: `$1`

- `{PLAN}` 이 비어있으면 다음 안내 문구를 출력하고 종료해라:
   ```
   ❌ 플랜 이름이 필요합니다. `/sbs-approve {PLAN}` 형식으로 플랜 이름을 입력하세요.
   
   ### APPROVE RESULT
   { "RESULT": "ERROR" }
   ```

- `.sisyphus/plans/{PLAN}.md` 파일이 존재하는지 확인해라. 존재하지 않으면 다음 안내 문구를 출력하고 종료해라.
   ```
   ❌ 플랜 파일이 존재하지 않습니다: .sisyphus/plans/{PLAN}.md
   
   ### APPROVE RESULT
   { "RESULT": "ERROR" }
   ```

## `{TASK}` 결정

아래 규칙으로 `{TASK}` 을 결정하고 검증해라:

`{TASK}`: `.sisyphus/plans/{PLAN}.md` 에서 `- [ ]`(미완료 Task) 중 가장 첫 번째 Task

- `{TASK}`(미완료 태스크) 가 없으면 다음 안내 문구를 출력하고 종료해라.
   ```
   모든 태스크가 완료되었습니다.
   
   ### APPROVE RESULT
   { "RESULT": "FINISHED", "PLAN": "{PLAN}" }
   ```

# 승인 작업

## **최상단에 반드시 아래 정보를 출력해라:**
```
- 플랜: {PLAN}
- 태스크: {TASK}

**`{TASK}` 를 승인하겠습니다.**
```

## 승인 프로세스:

1. `.sisyphus/plans/{PLAN}.md` 읽기
2. 가장 최근 수행된 Task (= 마지막으로 검수 요청된 `- [ ]` Task) 찾기
3. 현재 Task의 체크박스를 `- [x]`로 변경
4. 플랜 파일 저장

## **마지막에 반드시 아래 정보를 출력해라:**

- 다음 미완료 Task(`- [ ]`)가 있으면 다음 안내 문구 출력 후 종료
   ```
   승인 완료되었습니다.
   - 플랜 : {PLAN}
   - 태스크: {TASK}
   
   다음 액션:
   - 진행: `/sbs-work {PLAN}`
   
   ### APPROVE RESULT
   { "RESULT": "SUCCESS", "PLAN": "{PLAN}" }
   ```

- 모든 Task가 완료되었으면, 다음 안내 문구 출력 후 종료
   ```
   모든 태스크가 완료되었습니다.
   
   ### APPROVE RESULT
   { "RESULT": "FINISHED", "PLAN": "{PLAN}" }
   ```

---

/sbs-approve $ARGUMENTS