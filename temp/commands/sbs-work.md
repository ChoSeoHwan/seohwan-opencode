---
description: SBS 실행 (다음 Task 1개만 수행하고 검수 대기)
---

아래를 그대로 수행해:

task(
  subagent_type="atlas",
  load_skills=["sbs-work"],
  prompt=`plan name은 {name} 이다. .sisyphus/plans/{name}.md 기준으로 다음 미완료 Task 1개만 수행하고 [GATE]에서 멈춰 검수 요청해.`,
  run_in_background=false
)