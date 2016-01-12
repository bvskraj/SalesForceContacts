startApp.controller('DeleteContact', ['$routeParams','$scope','$http'  ,function($routeParams,$scope,$http) {
 
    var scope = this;
		scope.token="";


		var success_1= function(response){
			console.log('Success_1');
			console.log(response.data);
			//scope.token = response.data.access_token;

		}

		var success = function(response){
			console.log('Success');
			console.log(response.data);
			scope.token = response.data.access_token;


			$http({
                method: 'DELETE',
                url: "https://ap2.salesforce.com/services/data/v34.0/sobjects/Contact/"+$routeParams.ID,
                headers: {
                    Authorization: 'Bearer '+scope.token
                }
            }).then(success_1,failure);

		}	

		var failure = function(response){
			console.log('Failure');
			console.log(response);
		}

		this.deleteContact = function(id){
			
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