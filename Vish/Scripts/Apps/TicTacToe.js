
var $ServerUpdateBtn = $('#ServerUpdateBtn');

$(document).ready(function () {
    
    var ticTacToeProxy = $.connection.TicTacToe;
    //Client Function
    ticTacToeProxy.client.ScopeApply = function (pos) {
        $("#a" + pos).trigger("click");
    };

    ticTacToeProxy.client.Relaod = function (pos) {
        location.reload();
    };
    

    

    //Server Function
    $.connection.hub.start().done(function () {
        $ServerUpdateBtn.click(function () {
            $(this).attr("pos");
            ticTacToeProxy.server.refresh($(this).attr("pos"));
        });

        window.onbeforeunload = function () {
            ticTacToeProxy.server.reload();
        };
    });
});
var app = angular.module("TicTacToeApp", []);
app.controller("TicTacToeCtrl", function ($scope,$timeout) {
    $scope.Game = "Tic Tac Toe";
    $scope.States = [0,1];
    $scope.currentState = $scope.States[0];
    $scope.Image1 = { img: "", IsMarked: false, Mark: -1, pulsate:false };
    $scope.Image2 = { img: "", IsMarked: false, Mark: -1, pulsate: false };
    $scope.Image3 = { img: "", IsMarked: false, Mark: -1, pulsate: false };
    $scope.Image4 = { img: "", IsMarked: false, Mark: -1, pulsate: false };
    $scope.Image5 = { img: "", IsMarked: false, Mark: -1, pulsate: false };
    $scope.Image6 = { img: "", IsMarked: false, Mark: -1, pulsate: false };
    $scope.Image7 = { img: "", IsMarked: false, Mark: -1, pulsate: false };
    $scope.Image8 = { img: "", IsMarked: false, Mark: -1, pulsate: false };
    $scope.Image9 = { img: "", IsMarked: false, Mark: -1, pulsate: false };

    $scope.Won = "None";

    $scope.ScopeApply = function () {
        
        
    }
    $scope.PutSign = function (pos) {
        
        if (!($scope.Won == "o" || $scope.Won == "x"))
        if ($scope.currentState == $scope.States[0])
        {
            //Put O mark
            switch (pos) {
                case 1:
                    if (!$scope.Image1.IsMarked) {
                        $scope.currentState = $scope.States[1];
                        $scope.Image1.img = "/Images/0.png";
                        $scope.Image1.IsMarked = true;
                        $scope.Image1.Mark = 0;
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 2:
                    if (!$scope.Image2.IsMarked) {
                        $scope.currentState = $scope.States[1];
                        $scope.Image2.img = "/Images/0.png";
                        $scope.Image2.IsMarked = true;
                        $scope.Image2.Mark = 0;
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 3:
                    if (!$scope.Image3.IsMarked) {
                        $scope.currentState = $scope.States[1];
                        $scope.Image3.img = "/Images/0.png";
                        $scope.Image3.IsMarked = true;
                        $scope.Image3.Mark = 0;
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 4:
                    if (!$scope.Image4.IsMarked) {
                        $scope.currentState = $scope.States[1];
                        $scope.Image4.img = "/Images/0.png";
                        $scope.Image4.IsMarked = true;
                        $scope.Image4.Mark = 0;
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 5:
                    if (!$scope.Image5.IsMarked) {
                        $scope.currentState = $scope.States[1];
                        $scope.Image5.img = "/Images/0.png";
                        $scope.Image5.IsMarked = true;
                        $scope.Image5.Mark = 0;
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 6:
                    if (!$scope.Image6.IsMarked) {
                        $scope.currentState = $scope.States[1];
                        $scope.Image6.img = "/Images/0.png";
                        $scope.Image6.IsMarked = true;
                        $scope.Image6.Mark = 0;
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 7:
                    if (!$scope.Image7.IsMarked) {
                        $scope.currentState = $scope.States[1];
                        $scope.Image7.img = "/Images/0.png";
                        $scope.Image7.IsMarked = true;
                        $scope.Image7.Mark = 0;
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 8:
                    if (!$scope.Image8.IsMarked) {
                        $scope.currentState = $scope.States[1];
                        $scope.Image8.img = "/Images/0.png";
                        $scope.Image8.IsMarked = true;
                        $scope.Image8.Mark = 0;
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 9:
                    if (!$scope.Image9.IsMarked) {
                        $scope.currentState = $scope.States[1];
                        $scope.Image9.img = "/Images/0.png";
                        $scope.Image9.IsMarked = true;
                        $scope.Image9.Mark = 0;
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                
            }
            $scope.Won = CheckWin(0);
        }
        else if ($scope.currentState == $scope.States[1]) {
            //Put X mark
            switch (pos) {
                case 1:
                    if (!$scope.Image1.IsMarked) {
                        $scope.Image1.img = "/Images/X.png";
                        $scope.Image1.IsMarked = true;
                        $scope.Image1.Mark = 1;
                        $scope.currentState = $scope.States[0];
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 2:
                    if (!$scope.Image2.IsMarked) {
                        $scope.Image2.img = "/Images/X.png";
                        $scope.Image2.IsMarked = true;
                        $scope.Image2.Mark = 1;
                        $scope.currentState = $scope.States[0];
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 3:
                    if (!$scope.Image3.IsMarked) {
                        $scope.Image3.img = "/Images/X.png";
                        $scope.Image3.IsMarked = true;
                        $scope.Image3.Mark = 1;
                        $scope.currentState = $scope.States[0];
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 4:
                    if (!$scope.Image4.IsMarked) {
                        $scope.Image4.img = "/Images/X.png";
                        $scope.Image4.IsMarked = true;
                        $scope.Image4.Mark = 1;
                        $scope.currentState = $scope.States[0];
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 5:
                    if (!$scope.Image5.IsMarked) {
                        $scope.Image5.img = "/Images/X.png";
                        $scope.Image5.IsMarked = true;
                        $scope.Image5.Mark = 1;
                        $scope.currentState = $scope.States[0];
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 6:
                    if (!$scope.Image6.IsMarked) {
                        $scope.Image6.img = "/Images/X.png";
                        $scope.Image6.IsMarked = true;
                        $scope.Image6.Mark = 1;
                        $scope.currentState = $scope.States[0];
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 7:
                    if (!$scope.Image7.IsMarked) {
                        $scope.Image7.img = "/Images/X.png";
                        $scope.Image7.IsMarked = true;
                        $scope.Image7.Mark = 1;
                        $scope.currentState = $scope.States[0];
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 8:
                    if (!$scope.Image8.IsMarked) {
                        $scope.Image8.img = "/Images/X.png";
                        $scope.Image8.IsMarked = true;
                        $scope.Image8.Mark = 1;
                        $scope.currentState = $scope.States[0];
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;
                case 9:
                    if (!$scope.Image9.IsMarked) {
                        $scope.Image9.img = "/Images/X.png";
                        $scope.Image9.IsMarked = true;
                        $scope.Image9.Mark = 1;
                        $scope.currentState = $scope.States[0];
                        $ServerUpdateBtn.removeAttr("pos");
                        $ServerUpdateBtn.attr("pos", pos);
                        $ServerUpdateBtn.trigger("click");
                    }
                    break;

            }
            $scope.Won = CheckWin(1);
            
        }
    }

    function CheckWin(cross)
    {
        
        var isWin = "none";
        switch (cross) {
            case 0:
                if ($scope.Image1.Mark == 0 && $scope.Image2.Mark == 0 && $scope.Image3.Mark == 0)
                {
                    isWin = "o";
                    $scope.Image1.pulsate = true;
                    $scope.Image2.pulsate = true;
                    $scope.Image3.pulsate = true;

                }
                if ($scope.Image4.Mark == 0 && $scope.Image5.Mark == 0 && $scope.Image6.Mark == 0)
                {
                    isWin = "o";
                    $scope.Image4.pulsate = true;
                    $scope.Image5.pulsate = true;
                    $scope.Image6.pulsate = true;
                }
                if ($scope.Image7.Mark == 0 && $scope.Image8.Mark == 0 && $scope.Image9.Mark == 0)
                {
                    isWin = "o";
                    $scope.Image7.pulsate = true;
                    $scope.Image8.pulsate = true;
                    $scope.Image9.pulsate = true;
                }
                if ($scope.Image1.Mark == 0 && $scope.Image5.Mark == 0 && $scope.Image9.Mark == 0)
                {
                    isWin = "o";
                    $scope.Image1.pulsate = true;
                    $scope.Image5.pulsate = true;
                    $scope.Image9.pulsate = true;
                }
                if ($scope.Image3.Mark == 0 && $scope.Image5.Mark == 0 && $scope.Image7.Mark == 0)
                {
                    isWin = "o";
                    $scope.Image3.pulsate = true;
                    $scope.Image5.pulsate = true;
                    $scope.Image7.pulsate = true;
                }
                if ($scope.Image1.Mark == 0 && $scope.Image4.Mark == 0 && $scope.Image7.Mark == 0)
                {
                    isWin = "o";
                    $scope.Image1.pulsate = true;
                    $scope.Image4.pulsate = true;
                    $scope.Image7.pulsate = true;
                }
                if ($scope.Image2.Mark == 0 && $scope.Image5.Mark == 0 && $scope.Image8.Mark == 0)
                {
                    isWin = "o";
                    $scope.Image2.pulsate = true;
                    $scope.Image5.pulsate = true;
                    $scope.Image8.pulsate = true;
                }
                if ($scope.Image3.Mark == 0 && $scope.Image6.Mark == 0 && $scope.Image9.Mark == 0)
                {
                    isWin = "o";
                    $scope.Image3.pulsate = true;
                    $scope.Image6.pulsate = true;
                    $scope.Image9.pulsate = true;
                }
                break;
            case 1:
                if ($scope.Image1.Mark == 1 && $scope.Image2.Mark == 1 && $scope.Image3.Mark == 1) {
                    isWin = "x";
                    $scope.Image1.pulsate = true;
                    $scope.Image2.pulsate = true;
                    $scope.Image3.pulsate = true;
                }                                                                               
                if ($scope.Image4.Mark == 1 && $scope.Image5.Mark == 1 && $scope.Image6.Mark == 1)
                {
                    isWin = "x";
                    $scope.Image4.pulsate = true;
                    $scope.Image5.pulsate = true;
                    $scope.Image6.pulsate = true;
                }
                if ($scope.Image7.Mark == 1 && $scope.Image8.Mark == 1 && $scope.Image9.Mark == 1)
                {
                    isWin = "x";
                    $scope.Image7.pulsate = true;
                    $scope.Image8.pulsate = true;
                    $scope.Image9.pulsate = true;
                }
                if ($scope.Image1.Mark == 1 && $scope.Image5.Mark == 1 && $scope.Image9.Mark == 1)
                {
                    isWin = "x";
                    $scope.Image1.pulsate = true;
                    $scope.Image5.pulsate = true;
                    $scope.Image9.pulsate = true;
                }
                if ($scope.Image3.Mark == 1 && $scope.Image5.Mark == 1 && $scope.Image7.Mark == 1)
                {
                    isWin = "x";
                    $scope.Image3.pulsate = true;
                    $scope.Image5.pulsate = true;
                    $scope.Image7.pulsate = true;
                }
                if ($scope.Image1.Mark == 1 && $scope.Image4.Mark == 1 && $scope.Image7.Mark == 1)
                {
                    isWin = "x";
                    $scope.Image1.pulsate = true;
                    $scope.Image4.pulsate = true;
                    $scope.Image7.pulsate = true;
                }
                if ($scope.Image2.Mark == 1 && $scope.Image5.Mark == 1 && $scope.Image8.Mark == 1)
                {
                    isWin = "x";
                    $scope.Image2.pulsate = true;
                    $scope.Image5.pulsate = true;
                    $scope.Image8.pulsate = true;
                }
                if ($scope.Image3.Mark == 1 && $scope.Image6.Mark == 1 && $scope.Image9.Mark == 1)
                {
                    isWin = "x";
                    $scope.Image3.pulsate = true;
                    $scope.Image6.pulsate = true;
                    $scope.Image9.pulsate = true;
                }
                break;
        }
        console.log(isWin);
        return isWin;
    }
    

    
});
