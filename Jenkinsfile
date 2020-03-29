pipeline {
	agent none
	stages {
		stage('build image') {
			agent any
			when{
				branch 'dev'
			}
			steps {
				sh 'make build_image'
			}
		}

		stage('push image') {
        agent any
        when{
          branch 'dev'
        }
        steps {
          withCredentials([usernamePassword(credentialsId: 'mody-docker-credentials', passwordVariable: 'password', usernameVariable: 'username')]) {
            sh 'docker login -u $username -p $password'
          }
          sh 'make push_image'
        }
    }
	}
}
