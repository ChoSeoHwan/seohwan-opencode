---
description: SBS 플랜 생성 (Prometheus + [GATE] + 한국어 요약)
---

아래를 그대로 수행해:

task(
   subagent_type="prometheus",
   load_skills=["sbs-plan"],
   prompt=`{name} 라는 plan name으로, 사용자의 요청을 SBS 플랜으로 만들어줘.
   - 결과는 .sisyphus/plans/{name}.md 로 저장
   - 각 Task에 [GATE] 필수
   - 최종 요약은 한국어`,
   run_in_background=false
)

사용자에게 plan 파일 경로와 다음 단계 안내만 간단히 보여줘:
- "Plan saved to: .sisyphus/plans/{name}.md"
- "다음은 /sbs-work {name} 로 1단계 실행을 시작하세요."