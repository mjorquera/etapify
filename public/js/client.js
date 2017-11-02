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
      $.get('/persons/' + persons[i], function(data){
        content = '<tr>' + 
        '<td><a href="/persons/detail/' + data.name + '">' +  data.name + '</a></td>' +
        '<td><div class="chip">' +
        '<img src="img/' + data.stage.toLowerCase() + '.jpeg" alt="' + data.stage + '">' + data.stage +
        '</div></td>' +
        '<td><a href="#" data-person="' + data.name + '" class="secondary-content"><i class="material-icons">cancel</i></a></td>' +
        '</tr>';
        
        $('.person-list').append(content);
      });
    }
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
      target.parents('tr').remove();
    });
  });
    
});
    