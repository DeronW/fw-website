node("front") {
   stage('Preparation') {
        // 初始化项目用, jenkins创建job时需要先pull代码库
        git credentialsId: '4cac0f9e-5bcd-4f50-a38f-d17f417bbeb5', url: 'git@10.10.100.106:front/webapp.git'
        // 第一次发布新分支, 需要设置本地与origin分支关联
        sh 'git branch --set-upstream-to=origin/$BRANCH $BRANCH'
        sh 'git checkout $BRANCH'
        sh 'git fetch'
        sh 'git diff --stat=400 origin/$BRANCH > /tmp/webapp.$PROJECT.git.diff'
        sh 'git pull'
   }
   stage('Update nodejs lib'){
             sh '''
if [ $FORCE = \'true\' ] ; then
    npm install
fi '''
   }
   stage('Clean workspace'){
       sh 'npm run clean'
   }
   stage('Differential check') {
       sh 'npm run pre-compile -- $PROJECT'
   }
   stage('Build') {
      // 是否强制重新刷新
      sh ''' 
if [ $FORCE = \'true\' ] ; then
    npm run build:loan
else
    ~/workspace/front-$PROJECT/differential.compile.$PROJECT.sh
fi '''
   }
   stage('Publish') {
        sh 'mkdir -p ~/workspace/front-$PROJECT/cdn/loan/placeholder/'
        sh 'rsync -arI ~/workspace/front-$PROJECT/cdn/$PROJECT/ /srv/static/$PROJECT/'
   }
}
