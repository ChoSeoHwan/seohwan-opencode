
# SBS 검수 승인 여부 질문

## 변수 설정

- `{PLAN}`: 첫 번째 인자
- `{TASK}`: 두 번째 인자

## 질문 수행

`question` 도구를 사용하여 사용자에게 아래 내용을 확인하라.

```json
{
    "question": "`{PLAN}` 플랜의 `{TASK}` 작업을 승인하시겠습니까?\n직접 입력 시 \"거절\" 로 표기됩니다.",
    "custom": true,
    "options": [
        {
            "label": "승인",
            "description": "작업을 승인합니다."
        }
    ]
}
```

## 추가 변수 설정

- "승인" 선택 시
    - `{VALUE}`: "APPROVE"
- "직접 답변 입력" 시
    - `{VALUE}`: "REJECT"
    - `{RESON}`: 사용자가 입력한 내용
- "닫기" 시
    - `{VALUE}`: "CLOSE"

## **반드시 아래 내용을 출력하고 종료해라.**

### 승인/닫기 시

```
### QUESTION RESULT
{ "TYPE": "{VALUE}", "PLAN": "{PLAN}", "TASK": "{TASK}" }

```

### 거절 시

```
### QUESTION RESULT
{ "TYPE": "{VALUE}", "REASON": "{REJECT_INPUT}", "PLAN": "{PLAN}", "TASK": "{TASK}" }
```
