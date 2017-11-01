$(function(){
    
  $.get('/persons', appendToList);
  $.get('/stages', appendStages);
    
  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var personData = form.serialize();

    $.ajax({
      type: 'POST', url: '/persons', data: personData
    })
    .done(function(personName){
      appendToList([personName]);
      form.trigger('reset');
    })
    .fail(function( jqXHR, textStatus, errorThrown) {
      Materialize.toast(textStatus + " " + errorThrown, 3000, 'rounded');
    });
  });
    
  function appendToList(persons) {
    var list = [];
    var content, person;
    for(var i in persons){
      person = persons[i];
      content = '<a href="/persons/'+person+'" class="collection-item">'+person+'</a>';
      list.push(content);
    }

    $('.person-list').append(list);
  }

  function appendStages(stages) {
    var list = [];
    var content, stage;
    for(var i in stages){
      stage = stages[i];
      content = '<option value="' + stage + '">' + stage + '</option>';
      list.push(content);
    }

    $('#stages').append(list);
    $('#stages').material_select();
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
    