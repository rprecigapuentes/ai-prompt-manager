pipeline {
    agent any

    environment {
        SELENIUM_URL = 'http://localhost:4444/wd/hub'
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Test') {
            steps {
                // Start the app and Selenium containers in the background
                sh 'docker-compose up -d app selenium'

                // Wait for the app to be ready (health check passes)
                sh '''
                    echo "Waiting for app to be ready..."
                    for i in $(seq 1 20); do
                        if curl -sf http://localhost:3000/login > /dev/null; then
                            echo "App is up."
                            break
                        fi
                        echo "Attempt $i — retrying in 3s..."
                        sleep 3
                    done
                '''

                // Wait for Selenium to be ready
                sh '''
                    echo "Waiting for Selenium to be ready..."
                    for i in $(seq 1 20); do
                        if curl -sf http://localhost:4444/wd/hub/status > /dev/null; then
                            echo "Selenium is up."
                            break
                        fi
                        sleep 3
                    done
                '''

                // Get the app container's internal IP so Chrome (inside Selenium) can reach it
                // Chrome 145+ auto-upgrades named hostnames to HTTPS; raw IPs are safe
                script {
                    def appIp = sh(
                        script: "docker inspect ai-prompt-manager --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'",
                        returnStdout: true
                    ).trim()
                    env.APP_URL = "http://${appIp}:3000"
                }

                // Run the Cucumber test suite
                sh 'npm test'
            }
            post {
                always {
                    sh 'docker-compose down'
                }
            }
        }

        stage('Report') {
            steps {
                sh 'npm run report'
            }
            post {
                always {
                    // Publish Allure report using the Jenkins Allure plugin
                    allure([
                        includeProperties: true,
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check the Allure report for details.'
        }
        success {
            echo 'All stages passed. Report published.'
        }
    }
}
