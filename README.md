# TriQuiz
세상의 모든 퀴즈 -> 세모퀴 -> (세모)퀴 -> (Triangle)Quiz -> TriQuiz

# What Is [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html)
- Git 용 branching model. (by Vincent Driessen)
- 협업 및 개발팀 확장 할 때? 사용하기 좋음.

## [Install](https://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html)
git-flow 를 설치해서 쓰거나, 아니면 알아서 branch 관리 잘하거나 하면 될 듯.

- macOS (homebrew)
```shell
$ brew install git-flow-avh
```
- macOS (Macports)
```shell
$ port install git-flow-avh
```
- Linux
```shell
$ apt-get install git-flow
```
- windows
```
$ wget -q -O - --no-check-certificate https://raw.github.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh install stable | bash
```

## Key Benefits
### Parallel Development
- main branch 와 feature branch 분리 됨.
```
👦🏻 feature branch 에서 각 사용자가 막 개발해도 main branch 에 영향이 없음 == main branch 는 정상 동작함
```
- Parallel Development 를 위해서는 branch 옮겨다니기 전에 commit 해야 함.
- (예시 1) feature_A branch 에서 작업 중 feature_B branch 로 넘어가고 싶을 때.
```shell
(feature_A branch 에 있는 생태)
$ git add .
$ git commit -m "desc"
$ git push origin feature/1-feature-A
$ git checkout feature/2-feature-B
$ git pull
```
```
main branch 는 main/
develop branch 는 develop/
feature branch 는 feature/

```
### Collaboration
- ***main - (release) - develop - feature*** 단위로 branch 를 두고 작업하게 됨.
- develop branch 아래에서 feature branch 단위로 작업을 하기 때문에, 협력 할 때 동료의 작업 진행 상황을 파악하기가 용이.
```
👦🏻 각자가, 각각 feature branch 에 commit 하게 되면 작업한 code 량을 확인할 수 있기 때문인 듯?
👦🏻 단순히 생각해봐도, main branch 에 다 commit/push 날리면 누가 무슨 작업 진행중인지 굉장히 헷갈림거 같음.
👦🏻 때문에, 계층을 두고 작업하는 것에 의의를 두면 될 듯 싶음.
```
- (예시 2) git branch 생성 (issue_id: 1, issue_desc: add progress bar)
```shell
(예시 1 참고해서 작업 중인 것을 commit 을 다 한 뒤에,,)
$ git branch feature/1-add-progress-bar
$ git checkout feature/1-add-progress-bar
$ git pull
```
- (예시 3) git release 시에 tag 따기
```shell
(git flow 를 사용합니다)
$ git flow release start 0.1.0 main
$ git flow release publish 0.1.0
$ git flow release finish 0.1.0
$ git push --tags
```
### Release Staging Area
- 각자가 feature branch 에서 작업한 뒤에 develop branch 에 merge. (code review 필요)
- develop branch 에서 main branch 로 merge 할 때에는 따로 ***release branch*** 를 따고 code review 를 받아야 할 듯 싶음.
### Support For Emergency Fixes
- 추가로, ***hotfix branch*** 가 있는데 말 그대로 bugfix 용임.
- main branch 에서 hotfix branch 를 따서 bugfix 한 뒤에 main/develop branch 에 merge 해야 함.
- main branch 의 tag version 이 올라감. (ex. 1.0.0 -> 1.0.1)