node("front") {
   stage('Preparation') {
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
