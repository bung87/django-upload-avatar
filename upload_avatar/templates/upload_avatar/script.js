   function upload_avatar_error(error_msg) {
            alert(error_msg);
        };


        function upload_avatar_success(image_url) {
            $('#uploadAvatarSelectArea').empty();
            $('#uploadAvatarPreviewArea div').empty();
            $('#uploadAvatarPreviewArea div').append('<img />');
            $('#uploadAvatarPreviewArea div img').attr('src', image_url);

            $('#uploadAvatarSelectArea').append('<img />');
            $('#uploadAvatarSelectArea img').attr('src', image_url).load(function(){
                $(this).unbind('load');

                var img_width = $(this).width();
                var img_height = $(this).height();


                if(img_width > {{ crop_image_area_size }} || img_height > {{ crop_image_area_size }}) {
                    if(img_width >= img_height) {
                        $(this).css('width', "{{ crop_image_area_size }}px");
                    }
                    else {
                        $(this).css('height', "{{ crop_image_area_size }}px");
                    }
                }

                img_width = $(this).width();
                img_height = $(this).height();

                var sel = {};
                sel['x1'] = Math.round(img_width/2-25 > 0 ? img_width/2-25 : 0),
                sel['y1'] = Math.round(img_height/2-25 > 0 ? img_height/2-25 : 0),
                sel['x2'] = Math.round(img_width/2+25 > img_width ? img_width : img_width/2+25),
                sel['y2'] = Math.round(img_height/2+25 > img_height ? img_height : img_height/2+25),
                sel['width'] = 50;

                $(this).imgAreaSelect({
                    handles: true,
                    aspectRatio: "1:1",
                    fadeSpeed: 100,
                    minHeight: 50,
                    minWidth: 50,
                    x1: sel.x1,
                    y1: sel.y1,
                    x2: sel.x2,
                    y2: sel.y2,
                    onSelectChange: updateCoors
                });

                updateCoors({'width': img_width}, sel);
            });
        };

        function updateCoors(img, selection) {
          $("#uploadAvatarValueX1").val(selection.x1);
          $("#uploadAvatarValueY1").val(selection.y1);
          $("#uploadAvatarValueX2").val(selection.x2);
          $("#uploadAvatarValueY2").val(selection.y2);

          {% for p in preview_areas %}
            updatePreview({{p.size}},img, selection);
          {% endfor %}
        };


            function updatePreview(size,img, selection) {
              if(parseInt(selection.width) > 0) {
                var ratiox = size / selection.width;
                $("#uploadAvatarPreviewArea"+size+" img").css({
                  width: Math.round(ratiox * img.width) + 'px',
                  marginLeft: '-' + Math.round(ratiox * selection.x1) + 'px',
                  marginTop: '-' + Math.round(ratiox * selection.y1) + 'px'
                });
              }
            };


        function crop_avatar_success(msg) {
            $('#uploadAvatarCropResult').hide().text(msg).show(200);
        };
/*$(function(){
            $('#uploadAvatarBtnLayout button').click(function(){
                return false;
            });

            var input_width = $('#uploadAvatarBtnLayout').width();
            var input_height = $('#uploadAvatarBtnLayout').height();

            $('#uploadAvatarInputFile').css({opacity: 0}).width(input_width + 50).height(input_height).change(function(){
                if($(this).val() == ''){return;}
                var $last_img = $('#uploadAvatarSelectArea img');
                if($last_img.length) {
                    var img_obj = $last_img.imgAreaSelect({instance: true});
                    img_obj.remove();
                }
                $('#uploadAvatarSelectArea').empty();
                $('#uploadAvatarPreviewArea div').empty();
                var p = new RegExp(/\.(jpg|jpeg|png|gif)$/);
                var fileanme = $(this).val().toLowerCase().replace(/^\s+|\s+$/g, '');
                if(!p.test(fileanme)){alert("{{ INVALID_IMAGE }}"); return;}
                $('#uploadAvatarForm').submit();
                $(this).val('');
                $('#uploadAvatarCropSubmit').removeAttr('disabled');
            });


            $('#uploadAvatarCropSubmit').click(function(){
                $(this).attr('disabled', 'disabled');
                var x1 = $('#uploadAvatarValueX1').val();
                var y1 = $('#uploadAvatarValueY1').val();
                var x2 = $('#uploadAvatarValueX2').val();
                var y2 = $('#uploadAvatarValueY2').val();
                if(x1 == "" || y1 == "" || x2 == "" ||y2 == "") {
                    $(this).removeAttr('disabled');
                    return false;
                }

                $('#uploadAvatarCropForm').submit();
                $('#uploadAvatarValueX1').val('');
                $('#uploadAvatarValueY1').val('');
                $('#uploadAvatarValueX2').val('');
                $('#uploadAvatarValueY2').val('');

                $(this).removeAttr('disabled');
                return false;
            });
        });*/
        
