var VishFactory = angular.module("vish-factories", []);

VishFactory.factory("LoaderService", function () {
    var LoaderService = this;
    LoaderService.Show = function ()
    {
        $(".loading").show();
    }
    LoaderService.Hide = function () {
        $(".loading").hide();
    }
    return LoaderService;
});

VishFactory.factory("ToastrService", function () {
    var ToastrService = this;
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    
    ToastrService.Success = function (text)
    {
        toastr["success"](text);
    }
    ToastrService.Info = function (text) {
        toastr["info"](text);
    }
    ToastrService.Warning = function (text) {
        toastr["warning"](text);
    }
    ToastrService.Error = function (text) {
        toastr["error"](text);
    }
    return ToastrService;
});

VishFactory.factory("Employee", function ($http, LoaderService, ToastrService) {
    var Employee = this;

    Employee.GetAllEmployees = function (cb) {
        LoaderService.Show();
        $http.get("/api/Employee/GetAll").success(function (response) {
            LoaderService.Hide();
            if (cb) {
                cb(response);
            }
        }).error(function (response, status) {
            LoaderService.Hide();
            console.log(response);
            console.log(status);
            ToastrService.Error("Error Occured while execution, Please Refresh the page");
        });
    };

    Employee.GetAllEmployeesWithHobbies = function (cb) {
        LoaderService.Show();
        $http.get("/api/Employee/GetAllWithHobbies").success(function (response) {
            LoaderService.Hide();
            if (cb) {
                cb(response);
            }
        }).error(function (response, status) {
            LoaderService.Hide();
            console.log(response);
            console.log(status);
            ToastrService.Error("Error Occured while execution, Please Refresh the page");
        });
    };

    Employee.AddEmployee = function (emp, cb) {
        LoaderService.Show();
        $http.post("/api/Employee", emp).success(function (response) {
            LoaderService.Hide();
            if (cb) {
                cb(response);
            }
        }).error(function (response, status) {
            LoaderService.Hide();
            console.log(response);
            console.log(status);
            ToastrService.Error("Error Occured while execution, Please Refresh the page");
        });
    };

    Employee.AddEmployeeWithPhoto = function (fd, cb) {
        LoaderService.Show();
        $http.post("/api/Employee/AddEmployeeWithPhoto", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function (response) {
            LoaderService.Hide();
            if (cb) {
                cb(response);
            }
        })
        .error(function (response, status) {
            LoaderService.Hide();
            console.log(response);
            console.log(status);
            ToastrService.Error("Error Occured while execution, Please Refresh the page");
        });
    };

    Employee.UpdateEmployee = function (emp,cb) {
        LoaderService.Show();
        $http.put("/api/Employee", emp).success(function (response) {
            LoaderService.Hide();
            if (cb)
            {
                cb(response);
            }
        }).error(function (response, status) {
            LoaderService.Hide();
            console.log(response);
            console.log(status);
            ToastrService.Error("Error Occured while execution, Please Refresh the page");
        });
    };

    Employee.UpdateEmployeeWithPhoto = function (fd, cb) {
        LoaderService.Show();
        $http.put("/api/Employee/UpdateEmployeeWithPhoto", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function (response) {
            LoaderService.Hide();
            if (cb) {
                cb(response);
            }
        })
        .error(function (response, status) {
            LoaderService.Hide();
            console.log(response);
            console.log(status);
            ToastrService.Error("Error Occured while execution, Please Refresh the page");
        });
    };


    Employee.DeleteEmployee = function (emp, cb) {
        LoaderService.Show();
        var delEmp = _.pick(emp, ['Id']);
        $http['delete']("/api/Employee", { params: delEmp }).success(function (response) {
            LoaderService.Hide();
            if (cb) {
                cb(response);
            }
        }).error(function (response, status) {
            LoaderService.Hide();
            console.log(response);
            console.log(status);
            ToastrService.Error("Error Occured while execution, Please Refresh the page");
        });
    };
    return Employee;
});