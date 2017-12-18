var zmp3Lyrics = {
    songId: 0,
    tpl: null,
    init: function () {
        $('form#frmLyrics').submit(function () {
            return false;
        });
        $('#lyrics .fn-next').click(function () {
            zmp3Lyrics.show($($(this).data('item')));
            return false;
        });
        $('#lyrics .fn-prev').click(function () {
            zmp3Lyrics.show($($(this).data('item')));
            return false;
        });
    },
    getLyrics: function (songId, refresh, title) {
        songId = songId.toLowerCase();
        if (this.tpl === null) {
            this.tpl = $('.fn-lyrics')[0].cloneNode(true, true);
            $(this.tpl).removeClass('none');
        }
        if (refresh)
            $('.fn-lyrics' + songId).remove();

        if ($('.fn-lyrics' + songId).length < 1) {
            if (this.songId != songId) {
                this.songId = songId;
                $.get(MP3.MP3_URL + "/ajax/song", {op: 'get-lyrics', songId: songId}, function (ret) {
                    if (ret.data) {
                        if (ret.total > 0) {
                            for (x in ret.data) {
                                var item = ret.data[x];

                                x = parseInt(x) + 1;
                                var tpl1 = zmp3Lyrics.tpl.cloneNode(true, true);
                                var elId = 'lyrics' + songId + x;


                                $(tpl1).attr('id', elId).addClass('fn-lyrics fn-lyrics' + songId);
                                if (title)
                                    $('.fn-name', tpl1).html('Lá»i bĂ i hĂ¡t: ' + title.substring(0, 80));
                                $('.fn-content', tpl1).html(item.content);
                                $('.fn-score', tpl1).html(item.score);
                                $('.fn-version', tpl1).html(x + '/' + ret.total);
                                $('#lyrics .fn-container').append(tpl1);
                                if (parseInt(item.id) == 0) {
                                    $('.fn-votebox', tpl1).addClass('none');
                                } else {
                                    $('.fn-vote', tpl1).data('id', item.id).click(function () {
                                        zmp3Lyrics.vote($(this).data('item'), $(this).data('score'));
                                        return false;
                                    });
                                }
                                if (x < ret.total) {
                                    $('.fn-next', tpl1).removeClass('disabled').data('item', "#lyrics" + songId + (x + 1)).click(function () {
                                        zmp3Lyrics.show($($(this).data('item')));
                                        return false;
                                    });
                                } else
                                    $('.fn-next', tpl1).addClass('disabled');
                                if (x > 1) {
                                    $('.fn-prev', tpl1).removeClass('disabled').data('item', "#lyrics" + songId + (x - 1)).click(function () {
                                        zmp3Lyrics.show($($(this).data('item')));
                                        return false;
                                    });
                                } else
                                    $('.fn-prev', tpl1).addClass('disabled');
                                $('.fn-user', tpl1).html(item.user);
                                $(tpl1).append('<i class="fn_zme_info fn' + item.user + '" style="display: none;" data-ref=".fn' + item.user + '" data_uname="' + item.user + '" data-dname="#' + elId + ' .fn-user"></i>');
                                $('#lyrics .fn-container').append(tpl1);
                            }
                            ZMEInfo.renderZMEAvatar();
                        } else {
                            var tpl1 = zmp3Lyrics.tpl.clone(true, true);
                            $(tpl1).attr('id', 'lyrics' + songId + 1).addClass('fn-lyrics fn-lyrics' + songId);
                            $('#lyrics .fn-container').append(tpl1);
                        }
                        zmp3Lyrics.show($("#lyrics" + songId + 1));
                    }
                }, 'json');
            }
        } else {
            zmp3Lyrics.show($("#lyrics" + songId + 1));
        }
    },
    addLyrics: function (rs) {
    },
    show: function (item) {
        console.log(item);
        $('.fn-lyrics').addClass('none');
        if ($('.fn-content', item).html().length < 10) {
            $('.fn-nolyrics').removeClass("none");
            $('.fn-wlyrics').addClass("none");
        } else {
            $('.fn-nolyrics').addClass("none");
            $('.fn-wlyrics').removeClass("none");
        }
        item.removeClass('none');
        return false;
    },
    vote: function (id, s) {
        s = parseInt(s);
        $.post(MP3.MP3_URL + "/ajax/song", {op: 'vote-lyrics', id: id, score: (s > 0 ? 1 : -1)}, function (ret) {
        });
    }
};