var EmployeeApp = angular.module("EmployeeApp", ['vish-factories']);

EmployeeApp.controller("EmployeeCtrl", function ($scope, $timeout, Employee, ToastrService) {
    //Jquery Variable Declaration
    var $EmpForm = $('#EmpForm');
    var $ProfilePic = $("#ProfilePic");
    var $MyModal = $('#myModal')
    //scope variables and array declarations
    $scope.Employees = [];
    $scope.Hobbies = [];
    $scope.UserType = [
        { Value: 0, Text: "User" }, { Value: 1, Text: "Admin" }
    ];
    $scope.Genders = [
       { Value: 1, Text: "Male" }, { Value: 2, Text: "Female" }, { Value: 0, Text: "Not to disclouse" }
    ];
    $scope.ShowSuccessMessage = false;
    $scope.Mode = "Add"; 
    $scope.successMessage = "added";
    $scope.defaultPic = "/Images/default.png";


    //Get All Employee call
    Employee.GetAllEmployeesWithHobbies(function (resp) {
        $scope.Employees = resp.Users;
        $scope.Hobbies = _.map(resp.Hobbies, function (element) {
            return _.extend({}, element, { selected: false });
        });

    });


    $scope.OpenForUpdate = function (emp) {
        $EmpForm.validationEngine('hide');
        $scope.Mode = "Edit";
        $scope.emp = angular.copy(emp);
        if (_.isUndefined($scope.emp.ProfilePic) || _.isNull($scope.emp.ProfilePic) || _.isEmpty($scope.emp.ProfilePic))
        {
            $scope.emp.ProfilePic = $scope.defaultPic;
        }
        _.each($scope.Hobbies, function (h) {
            var IsSelected = _.find(emp.Hobbies, function (empHobby) {
                return empHobby.Id == h.Id;
            });

            h.selected = IsSelected!=null;
        });
        $MyModal.modal("show");

    }

    $scope.OpenForAdd = function (emp) {
        $EmpForm.validationEngine('hide');
        $scope.Mode = "Add";
        $scope.emp = {
            Gender : 0,
        };
        _.each($scope.Hobbies, function (h) {
            h.selected = false;
        });
        $scope.emp.ProfilePic = $scope.defaultPic;
        $MyModal.modal("show");
    }

    $scope.UpdateEmployee = function (emp) {
        var IsPicUpdated = false;
        if ($EmpForm.validationEngine('validate')) {
            var fd = new FormData();
            var inputFiles = document.getElementById("ProfilePic");
            if (inputFiles.files.length > 0) {
                fd.append("ProfilePic", inputFiles.files[0]);
                IsPicUpdated = true;
            }
            else {
                IsPicUpdated = false;
                
            }
            if (emp.OldPicture != $scope.defaultPic) {
                fd.append("OldProfilePic", emp.OldPicture);
            }
            else {
                fd.append("OldProfilePic", "");
            }
            
            fd.append("IsPicUpdated", IsPicUpdated);
            fd.append("emp", JSON.stringify(emp));
            

            Employee.UpdateEmployeeWithPhoto(fd, function (res) {
                $scope.ShowSuccessMessage = true;
                $scope.successMessage = "edited";
                $timeout(function () {
                    var findEmp = _.find($scope.Employees, function (e) { e.Id == res.Id });
                    _.each($scope.Employees, function (e) {
                        if (e.Id == res.Id) {
                            for (var key in e) {
                                e[key] = res[key];
                            }
                        }
                    });
                    $scope.ShowSuccessMessage = false;
                    $scope.successMessage = "added";
                    $("#myModal").modal("hide");
                }, 2000);
            });
        }
    }

    $scope.AddEmployee = function (emp) {
        if ($EmpForm.validationEngine('validate')) {
            var fd = new FormData();
            var inputFiles = document.getElementById("ProfilePic");
            if (inputFiles.files.length > 0)
            {
                fd.append("ProfilePic", inputFiles.files[0]);
            }
            fd.append("emp", JSON.stringify(emp));


            Employee.AddEmployeeWithPhoto(fd, function (res) {
                $scope.ShowSuccessMessage = true;
                $scope.successMessage = "added";
                $timeout(function () {
                    _.each(res.Hobbies, function (h) {
                    });
                    $scope.Employees.push(res);
                    $scope.ShowSuccessMessage = false;
                    $scope.successMessage = "added";
                    $MyModal.modal("hide");
                }, 2000);
            });
        }
    }


    $scope.DeleteEmployee = function (emp)
    {
        if (confirm("Are you sure want to delete this employee?"))
        {
            Employee.DeleteEmployee(emp, function () {
                ToastrService.Success("User has been successfully deleted");
                $scope.successMessage = "deleted ";
                $scope.Employees =  _.reject($scope.Employees, function (e) {
                    return e.Id == emp.Id;
                });
            });
        }
    }

    $scope.ToggleHobby = function (emp)
    {
        var selectedHobbies = _.filter($scope.Hobbies, function (h) { return h.selected == true; });
        emp.Hobbies = selectedHobbies;
    }

    $MyModal.on('hidden.bs.modal', function () {
        $scope.Mode = "Add";
        $scope.emp = {};
        $ProfilePic.val("");
    });

    $scope.TriggerFileClick = function () {
        $scope.emp.OldPicture = angular.copy($scope.emp.ProfilePic);
        $ProfilePic.trigger("click");
    }

    $ProfilePic.change(function () {
        var photoelem = this;
        $scope.$apply(function () {
            $scope.emp.ProfilePic = ReadURL(photoelem);
        });
    });
    $scope.BindValidation = function () {
        $EmpForm.validationEngine({
            'custom_error_messages': {
                '#txtFirstName': {
                    'required': {
                        'message': "Please enter first name"
                    },
                },
                '#txtLastName': {
                    'required': {
                        'message': "Please enter last name"
                    },
                },
                '#txtEmail': {
                    'required': {
                        'message': "Please enter email address"
                    },
                },
                '#ddlType': {
                    'required': {
                        'message': "Please select Emp type"
                    },
                }
            }
        });
    }

    function ReadURL (input) {
        var myifile = input.files[0];
        var fileurl = URL.createObjectURL(myifile);
        return fileurl;
    }
});

