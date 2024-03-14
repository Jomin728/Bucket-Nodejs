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
                 sh "chmod 400 'jomin1.pem'"
                 sh "ssh -i 'jomin1.pem' ubuntu@ec2-3-83-241-86.compute-1.amazonaws.com"
                 sh "kubectl delete deployment node-api"
                 sh "kubectl apply -f server-deployment.yaml"
                 sh "kubectl apply -f server-service.yaml"
                 sh "kubectl apply -f ingress-controller.yaml"
            }
        }
    }
}
