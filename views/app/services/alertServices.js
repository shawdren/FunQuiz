(function () {
  app.factory('alertService', function () {
     var alert = {
        data: {}
    };

    return {
        getData: function () {
            return alert.data;
        },
        setData: function (data) {
            alert.data = data;
        }
    };
  })
})();
