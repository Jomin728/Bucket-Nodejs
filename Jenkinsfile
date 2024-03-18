pipeline {
    agent any
    stages {
        stage('Cloning Git repository') {
            steps {
                cleanWs()
                git branch:'main',credentialsId:'4ed263bf-ff3c-4b6b-b14f-b453dc1e16c5',url: 'https://github.com/Jomin728/ShepherdAI-Nodejs-Microservices.git'
                
            }
        }
        stage('Build Docker Image')
        {
            steps {
               sh "pwd"
               
               sh "docker login --username='jomin729' --password='Jomin729@'"
               dir('server') {
                   sh "pwd"
                   sh "ls"
                   sh "docker build --no-cache -t jomin729/nodeservice ."
                 }
            }
        }
        stage('Push Image to Docker Hub')
        {
            steps {
                sh "docker push jomin729/nodeservice"
            }
        }
        stage('Copy kube yaml Configurations')
        {
            steps{
                sh "chmod 400 'jomin1.pem'"
                sh "scp -i 'jomin1.pem' server/server-deployment.yaml ubuntu@ec2-3-83-241-86.compute-1.amazonaws.com:~/."
                sh "scp -i 'jomin1.pem' server/server-service.yaml ubuntu@ec2-3-83-241-86.compute-1.amazonaws.com:~/."
                sh "scp -i 'jomin1.pem' server/ingress-controller.yaml ubuntu@ec2-3-83-241-86.compute-1.amazonaws.com:~/."
            }
        }
        stage('SSH into master node')
        {
            steps{
                    script {
                     sshagent(credentials : ['masternode']) {
                        sh "echo pwd"
                        sh "ssh -t -t ubuntu@ec2-3-83-241-86.compute-1.amazonaws.com 'echo pwd && kubectl get pods && kubectl delete deployment node-api && kubectl apply -f server-deployment.yaml && kubectl apply -f server-service.yaml && kubectl apply -f ingress-controller.yaml'"
                    }
                 }
            }
        }
    }
        post {
        // Clean after build
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}
