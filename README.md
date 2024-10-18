# total-back
# 나의 GitHub 페이지

안녕하세요! 구정빈 입니다. todo-APP입니다.

## 프로젝트 목록
할일앱 백엔드

### 1. 실행결과
MongoDB로 CURD 기능
post  - addTask
get   - getTask
put   - putTask
del   - delTask

* putTask 사용시
putTask에서 
=================================
prevList.map(item => 
            item._id === id ? { ...item, isComplete: !item.isComplete } : item
          )
        );
=================================
1. prevList는 현재 상태인 todoList의 값
2. item._id === id ? ... : item 
   // item._id가 현재 업데이트하려는 id와 같다면, 해당 item을 업데이트하고, 그렇지 않으면 원래의 item을 그대로 반환
3. !item.isComplete는 true는 false로, false는 true로 바꾼다
=================================


## 연락처
- 이메일: nicewjdqls@naver.com
