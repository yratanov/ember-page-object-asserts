workflow "Test and deploy" {
  on = "push"
  resolves = ["Run ember tests"]
}

action "Install Dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Run ember tests" {
  uses = "alexlafroscia/actions-ember-testing@master"
  needs = ["Install Dependencies"]
}
