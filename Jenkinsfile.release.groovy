def DELIVERY_PATH = '/home/jenkins/buildproject/delivery'

def BRANCH = ''
def BUILD_CMD = ''
def BUILD_DIR = ''
def SHOULD_GO = false
def RELEASE_PATH = ''

if(params.PROJECT == 'keji-web') {
    BRANCH = 'release-keji-web'
    BUILD_CMD = 'build:keji-web'
    BUILD_DIR = 'cdn/keji-web'
    RELEASE_PATH = "${DELIVERY_PATH}/${BRANCH}"
} else if(params.PROJECT == 'p2p-web') {
    BRANCH = 'release-p2p-web'
    BUILD_CMD = 'build:p2p-web'
    BUILD_DIR = 'cdn/p2p-web'
    RELEASE_PATH = "${DELIVERY_PATH}/${BRANCH}"
} else if(params.PROJECT == 'zx-web') {
    BRANCH = 'release-zx-web'
    BUILD_CMD = 'build:zx-web'
    BUILD_DIR = 'cdn/zx-web'
    RELEASE_PATH = "${DELIVERY_PATH}/${BRANCH}"
} else {
    error "not define PROJECT: ${params.PROJECT} yet!"
}

node('front-virtual') {

    stage('initialize'){
        if(params.INITIALIZE) {
            // 初始化项目用, jenkins创建job时需要先pull代码库
            git credentialsId: '4cac0f9e-5bcd-4f50-a38f-d17f417bbeb5', url: 'git@10.105.101.118:front/website.git'
            // 第一次发布新分支, 需要设置本地与origin分支关联
            sh "git checkout ${BRANCH}"
            sh 'npm install'
        }
    }

    stage('Check'){
        sh 'git fetch'
        sh "git diff --name-only origin/${BRANCH}"
        def diff = sh returnStdout: true, script: "git diff --name-only origin/${BRANCH}"

        if(diff || params.FORCE) {
            SHOULD_GO = true
        }
    }

    stage('Preparation') {
        if(SHOULD_GO){
            git branch: BRANCH, credentialsId: '4cac0f9e-5bcd-4f50-a38f-d17f417bbeb5', url: 'git@10.105.101.118:front/website.git'
            sh 'npm run clean'
            sh 'npm install'
        }
    }

    stage('Build') {
        if(SHOULD_GO){
            sh "npm run ${BUILD_CMD}"
        }
    }

    stage('Move file') {
        if(SHOULD_GO){
            sh "mkdir -p ${RELEASE_PATH}/current/placeholder"
            sh "rm -r ${RELEASE_PATH}/current/*"
            
            sh "mkdir -p ${RELEASE_PATH}/$BUILD_ID/"

            sh "cp -r ${BUILD_DIR} ${RELEASE_PATH}/current/"
            sh "cp -r ${BUILD_DIR} ${RELEASE_PATH}/$BUILD_ID/"
        }
    }
    
    stage('Publish') {
        if(SHOULD_GO){
            dir(DELIVERY_PATH){
                sh 'git status'
                sh 'git config user.email "jenkins201@ucfgroup.com"'
                sh 'git config user.name "jenkins201"'
                sh 'git add -A'
                sh 'git commit -am "no comment"'
                sh 'git pull origin master'
                sh 'git push origin master'
            }
        }
    }
    
}