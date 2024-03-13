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
               sh "cd server"
               sh "docker login --username='jomin729' --password='Jomin729@'"
               sh "sudo docker build -t jomin729/nodeservice ."
            }
        }
    }
}
