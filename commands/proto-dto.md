---
description: proto 기반 DTO 생성 전용 (단일 파일 수정)
agent: atlas
---

# INPUT
기반이 되는 "proto" 파일과 작업할 "dto" 파일을 전달한다.

# WORK
proto 파일을 분석하고, 해당 proto 필드와 타입을 기반하여 DTO 를 작성해야 한다.
다른 DTO 파일을 참고하여 작업할 수 있으며, 
validation / transform 등의 로직을 작성 시, 원하는 작업에 대한 모르는 함수등이 있을 경우 사용자에게 질문하여 필요한 작업을 수행한다.
