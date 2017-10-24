//  node : front or  front-virtual

def node_name = 'front'

if(params.JENKINS_NODE == 'front-virtual') {
    node_name = 'front-virtual'
}

node(node_name) {

    stage('Preparation') {
        sh 'node -v'
        sh 'npm -v'

        if(params.INITIALIZE) {
            // 初始化项目用, jenkins创建job时需要先pull代码库
            git credentialsId: '4cac0f9e-5bcd-4f50-a38f-d17f417bbeb5', url: 'git@10.105.101.118:front/website.git'
            // 第一次发布新分支, 需要设置本地与origin分支关联
            sh 'git branch --set-upstream-to=origin/$BRANCH $BRANCH'
        }

        sh 'git checkout $BRANCH'

        if(!params.FORCE) {
            sh 'git fetch'
            sh 'git diff --stat=400 origin/$BRANCH > /tmp/website.$PROJECT.git.diff'
        }

        git branch: BRANCH, credentialsId: '4cac0f9e-5bcd-4f50-a38f-d17f417bbeb5', url: 'git@10.105.101.118:front/website.git'
    }

    stage('Update nodejs lib'){
        if(params.FORCE || params.INITIALIZE) {
            sh 'npm install'
        } else {
            // 忽略掉 npm 的更新
            echo 'no need force update npm'
        }
    }

    stage('Clean workspace'){
        sh 'npm run clean'
    }

    stage('Differential check') {
        if(!params.FORCE) {
            sh 'npm run pre-compile -- $PROJECT'
        }
    }

    stage('Build') {

        // temp to use force compile @2017-10-24
            // sh 'npm run build:$PROJECT'
    // // 是否强制重新刷新
    //     if(params.FORCE) {
    //         sh 'npm run build:$PROJECT'
    //     }
    //     if(!params.FORCE) {
    //         sh '~/workspace/front-$PROJECT/differential.compile.$PROJECT.sh'
    //     }
        sh 'ls /home/jenkins/workspace/front-$PROJECT/differential.compile.$PROJECT.sh'
        sh 'ls ~/workspace/front-$PROJECT/differential.compile.$PROJECT.sh'
    }
    
    stage('Publish') {
        sh 'mkdir -p ~/workspace/front-$PROJECT/cdn/$PROJECT/placeholder/'
        sh 'rsync -arI ~/workspace/front-$PROJECT/cdn/$PROJECT/ /srv/static/$PROJECT/'

        if(params.EXTRA_SERVER_IP) {
            sh 'rsync -arI ~/workspace/front-$PROJECT/cdn/$PROJECT/ www@$EXTRA_SERVER_IP:/static/$PROJECT/'
        }
        if(params.EXTRA_SERVER_IP_2) {
            sh 'rsync -arI ~/workspace/front-$PROJECT/cdn/$PROJECT/ www@$EXTRA_SERVER_IP_2:/static/$PROJECT/'
        }
    }
}
