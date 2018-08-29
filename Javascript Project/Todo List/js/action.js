$('#todo-list')
    // create
    .on('click', '.addBtn', function(e) {
        var inputValue = $('#input_msg').val();
        var li = $('.template').find('li').clone();
        li.find('.content').text(inputValue);
        if(inputValue == "") {
            alert("請輸入項目！");
        }else {
            $('#new').after(li);
        }

        $('#input_msg').val("");
    })

    // delete
    .on('click', '.close', function(e) {
        var result = confirm('Do you really want to delete it?');
        if(result) {
            $(this).closest('li').remove();
        }
    })

    // complete
    .on('click','.checkbox', function(e) {
        $(this).closest('li').toggleClass('complete');
    });

