//define a module for our app
var startApp = angular.module('contacts', ['ngRoute']);
//define routing for our app
startApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/AddNewContact', {
        templateUrl: 'templates/add_contact.html',
        controller: 'AddContact'
    }).
      when('/ShowContacts', {
        templateUrl: 'templates/show_contacts.html',
        controller: 'ShowAllContacts'
      }).
      when('/Delete/:ID', {
        templateUrl: 'templates/delete.html',
        controller: 'DeleteContact'
      }).
      when('/GetDetails/:ID',{
      	templateUrl: 'templates/show_details.html',
      	controller: 'GetContactDetails',
      	controllerAs: "details"
      }).
      when('/EditDetails/:ID',{
      	templateUrl: 'templates/edit_details.html',
      	controller: 'EditContactDetails',
      	controllerAs: "edit"
      }).
      otherwise({
        redirectTo: '/ShowContacts'
      });
}]);


startApp.controller('ShowAllContacts', function($scope,$http) {
 
    var scope = this;
		scope.result=[];
		var success_1 = function(response){
			console.log('success_1');
			console.log(response);
			scope.result = response.data.records;
		}
		var success = function(response){
			console.log('Success');
			console.log(response.data);
			$http(
			{
				method: 'GET',
				url: 'https://ap2.salesforce.com/services/data/v34.0/query/?q=SELECT+FirstName,LastName,ID+FROM+Contact',
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
});

