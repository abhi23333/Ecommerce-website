pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node and npm') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('frontend') {
                    sh 'CI=true npm test -- --watchAll=false'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'CI=true npm run build'
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                withCredentials([string(
                    credentialsId: 'render-deploy-hook',
                    variable: 'RENDER_DEPLOY_HOOK'
                )]) {
                    sh 'curl -X POST "$RENDER_DEPLOY_HOOK"'
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD Pipeline failed.'
        }
    }
}
