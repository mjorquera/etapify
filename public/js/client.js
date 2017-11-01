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
      content = '<li class="collection-item"><div><a href="/persons/' + person + '">' +
              person + '</a><a href="#" data-person="' + person + 
              '" class="secondary-content"><i class="material-icons">cancel</i></a> </div></li>';
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

    $('#stage').append(list);
    $('#stage').material_select();
  }
    
  $('.person-list').on('click', 'a[data-person]', function (event) {
    if(!confirm('Estas seguro ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/persons/' + target.data('person')
    }).done(function () {
      target.parents('li').remove();
    });
  });
    
    });
    