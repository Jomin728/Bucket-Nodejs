pipeline {
    agent any
    stages {
        stage('Cloning Git repository') {
            steps {
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
                   sh "docker build -t jomin729/nodeservice ."
                 }
            }
        }
        stage('Push Image to Docker Hub')
        {
            steps {
                sh "docker push jomin729/nodeservice"
            }
        }
        stage('SSH into master node')
        {
            steps{
                 sh "ssh -i 'jomin1.pem' ubuntu@ec2-3-83-241-86.compute-1.amazonaws.com"
            }
        }
    }
}
