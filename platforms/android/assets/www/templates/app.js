	console.log('hrllo');
	var app = angular.module('contacts',[]);
	app.controller('ContactController',['$http',function($http){
		var scope = this;
		scope.result=[];
		var success_1 = function(response){
			console.log('success_1');
			console.log(response);
			scope.result = response.data.records;/*
			for (var i = response.data.records.length - 1; i >= 0; i--) {
				result[i]=response.data.records[i];
			};*/
		}
		var success = function(response){
			console.log('Success');
			console.log(response.data);
			$http(
			{
				method: 'GET',
				url: 'https://ap2.salesforce.com/services/data/v34.0/query/?q=SELECT+FirstName+FROM+Contact',
				headers:{
					'Authorization':'Bearer ' + response.data.access_token
				},
				data:datastring
			}
		).then(success_1,failure);

		}	
		var failure = function(response){
			console.log('Failure');
			console.log(response);
		}
		var data = {
			grant_type : "password",
			client_id : "3MVG9ZL0ppGP5UrBG8bTq2x47dx2oRCiBT_tECLtwKRjqSR4f341uTR0e63Jy44z_fmoJWRDTq_lBpIprRaa9",
			client_secret : "2990445293923837865",
			username : "venkatasaikrishna.bejugam@kony.com" ,
			password : "VENKATsai@1994IRucH3o0IABXZckeGFtPB5Wd"
		};
		var datastring = "grant_type="+data.grant_type+"&client_id="+data.client_id+"&client_secret="+data.client_secret+"&username="+data.username+
			"&password="+data.password;
		$http(
			{
				method: 'POST',
				url: 'https://login.salesforce.com/services/oauth2/token',
				headers:{
					'Content-Type':'application/x-www-form-urlencoded'
				},
				data:datastring
			}
		).then(success,failure);
	}]);
