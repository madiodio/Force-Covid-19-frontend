pipeline {
	agent none
	stages {
		stage('build and push image') {
			agent any
			steps {
				sh 'make build_image'
				withCredentials([usernamePassword(credentialsId: 'mody-docker-credentials', passwordVariable: 'password', usernameVariable: 'username')]) {
          sh 'docker login -u $username -p $password'
        }
        sh 'make push_image'
			}
		}
	}
}
