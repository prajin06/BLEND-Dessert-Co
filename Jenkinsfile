pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'prajin06'
        IMAGE_NAME       = 'blend-dessert-co'
        IMAGE_TAG        = "${DOCKER_HUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER}"
        IMAGE_LATEST     = "${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${IMAGE_TAG}"
                sh "docker build -t ${IMAGE_TAG} -t ${IMAGE_LATEST} ."
            }
        }

        stage('Docker Login') {
            steps {
                echo 'Logging in to Docker Hub...'
                withCredentials([string(credentialsId: 'docker-hub-credentials', variable: 'DOCKER_HUB_TOKEN')]) {
                    sh "echo ${DOCKER_HUB_TOKEN} | docker login -u ${DOCKER_HUB_USER} --password-stdin"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                sh "docker push ${IMAGE_TAG}"
                sh "docker push ${IMAGE_LATEST}"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes cluster...'
                sh 'bash deploy.sh'
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully. Image: ${IMAGE_LATEST}"
        }
        failure {
            echo 'Pipeline failed. Check the logs above for details.'
        }
    }
}
