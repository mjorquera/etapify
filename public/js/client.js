$(function(){
    
      $.get('/persons', appendToList);
    
    //   $('form').on('submit', function(event) {
    //     event.preventDefault();
    
    //     var form = $(this);
    //     var cityData = form.serialize();
    
    //     $('.alert').hide();
    
    //     $.ajax({
    //       type: 'POST', url: '/cities', data: cityData
    //     })
    //     .error(function() {
    //       $('.alert').show();
    //     })
    //     .success(function(cityName){
    //       appendToList([cityName]);
    //       form.trigger('reset');
    //     });
    //   });
    
      function appendToList(persons) {
        var list = [];
        var content, person;
        for(var i in persons){
          person = persons[i];
          content = '<a href="/persons/'+person+'" class="collection-item">'+person+'</a>'; // + // example on how to serve static images
            // ' <a href="#" data-person="'+person+'">'+
            // '<img src="delete.png" width="15px"></a>';
          list.push(content);
        }
    
        $('.person-list').append(list)
      }
    
    
      // $('.person-list').on('click', 'a[data-city]', function (event) {
      //   if(!confirm('Are you sure ?')){
      //     return false;
      //   }
    
      //   var target = $(event.currentTarget);
    
      //   $.ajax({
      //     type: 'DELETE',
      //     url: '/cities/' + target.data('city')
      //   }).done(function () {
      //     target.parents('li').remove();
      //   });
      // });
    
    });
    