

angular.module('contacts')
	.controller('GetContactDetails',[  '$routeParams','$scope','$http'  ,function($routeParams,$scope,$http) {
     var controller = this;
	 controller.FullContact = {};
     console.log($routeParams.ID);

    

	    var data = {
			grant_type : "password",
			client_id : "3MVG9ZL0ppGP5UrBG8bTq2x47dx2oRCiBT_tECLtwKRjqSR4f341uTR0e63Jy44z_fmoJWRDTq_lBpIprRaa9",
			client_secret : "2990445293923837865",
			username : "venkatasaikrishna.bejugam@kony.com" ,
			password : "VENKATsai@1994IRucH3o0IABXZckeGFtPB5Wd"
		};
		var datastring = "grant_type="+data.grant_type+"&client_id="+data.client_id+"&client_secret="+data.client_secret+"&username="+data.username+
			"&password="+data.password;


        var failure = function(response){
			console.log('Failure');
			console.log(response);
		}

		var success_1 = function(response){
			console.log('success_1');
			console.log(response);
			controller.FullContact = response.data;
			console.log(controller.FullContact.FirstName);
			//scope.result = response.data.records;
		}

		var success = function(response){
			console.log('Success');
			console.log(response.data);
			token=response.data.access_token;


			$http({
                method: 'GET',
                url: "https://ap2.salesforce.com/services/data/v34.0/sobjects/Contact/" + $routeParams.ID ,
                headers: {
                    Authorization: 'Bearer '+token
                }
            }).then(success_1,failure);
			
		}


		


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