       <!-- Main content -->
        <section class="content">
          <!-- Small boxes (Stat box) -->
      <?php 	
	  $media=mysqli_query($link_music,"SELECT m_id  FROM table_data WHERE m_type='1'") or die(mysqli_error());
	$tong_media = mysqli_num_rows($media);
	$mediav=mysqli_query($link_music,"SELECT m_id  FROM table_data WHERE m_type='2'") or die(mysqli_error());
	$tong_mediav = mysqli_num_rows($mediav);
	$album=mysqli_query($link_music,"SELECT album_id  FROM table_album WHERE album_id") or die(mysqli_error());
	$tong_album = mysqli_num_rows($album);
	$user=mysqli_query($link_music,"SELECT userid  FROM table_user WHERE userid") or die(mysqli_error());
	$tong_user = mysqli_num_rows($user);
	$news=mysqli_query($link_music,"SELECT news_id  FROM table_news WHERE news_id") or die(mysqli_error());
	$tong_news = mysqli_num_rows($news);
	$comment=mysqli_query($link_music,"SELECT comment_id  FROM table_comment WHERE comment_id") or die(mysqli_error());
	$tong_comment = mysqli_num_rows($comment);
    //Tổng số download media
    $totaluser_qr = mysqli_query($link_music,"SELECT sum(m_downloaded) AS unum FROM table_data");
    while ($unum = mysqli_fetch_array($totaluser_qr))
    { $ttu = $unum['unum']; }
	$total_download = $ttg + $ttu;
	    //Tổng số lượt like
    $total_like = mysqli_query($link_music,"SELECT sum(m_like) AS unum FROM table_data");
    while ($unum_like = mysqli_fetch_array($total_like))
    { $ttu_like = $unum_like['unum']; }
	$total_like = $ttg + $ttu_like;
		    //Tổng số lượt like album
    $total_like1 = mysqli_query($link_music,"SELECT sum(album_like) AS unum FROM table_album");
    while ($unum_like1 = mysqli_fetch_array($total_like1))
    { $ttu_like1 = $unum_like1['unum']; }
	$total_like1 = $ttg1 + $ttu_like1;
		    //Tổng số lượt like singer
    $total_like2 = mysqli_query($link_music,"SELECT sum(singer_like) AS unum FROM table_singer");
    while ($unum_like2 = mysqli_fetch_array($total_like2))
    { $ttu_like2 = $unum_like2['unum']; }
	$total_like2 = $ttg2 + $ttu_like2;
	$tong_like = $total_like + $total_like1 + $total_like2;

	?>
 <!-- Small boxes (Stat box) -->
          <div class="row">
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-aqua">
                <div class="inner">
                  <h3><?php  echo $tong_media;?></h3>
                  <p>Bài hát</p>
                </div>
                <div class="icon">
                  <i class="fa fa-music"></i>
                </div>
                <a href="index.php?act=list-media&mode=songs" class="small-box-footer">Xem thêm <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
			            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-red">
                <div class="inner">
                  <h3><?php  echo $tong_mediav;?></h3>
                  <p>Video</p>
                </div>
                <div class="icon">
                  <i class="fa fa-youtube-play"></i>
                </div>
                <a href="index.php?act=list-media&mode=video" class="small-box-footer">Xem thêm <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-green">
                <div class="inner">
                  <h3><?php  echo $tong_album;?></h3>
                  <p>Album</p>
                </div>
                <div class="icon">
                  <i class="fa fa-list"></i>
                </div>
                <a href="index.php?act=list-album&mode=list-album" class="small-box-footer">Xem thêm <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-yellow">
                <div class="inner">
                  <h3><?php  echo $tong_user;?></h3>
                  <p>Thành viên</p>
                </div>
                <div class="icon">
                  <i class="ion ion-person-add"></i>
                </div>
                <a href="index.php?act=list-user&mode=list-user" class="small-box-footer">Xem thêm <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->

          </div><!-- /.row -->
   <div class="row">
            <div class="col-lg-3 col-xs-6">
              <!-- Info Boxes Style 2 -->
              <div class="info-box bg-orange">
                <span class="info-box-icon"><i class="fa fa-newspaper-o"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Tin Tức</span>
                  <span class="info-box-number"><?php  echo $tong_news;?></span>
                  <div class="progress">
                    <div class="progress-bar" style="width: 50%"></div>
                  </div>
                  <span class="progress-description">
                    <i class="fa fa-refresh fa-spin"></i>
                  </span>
                </div><!-- /.info-box-content -->
              </div><!-- /.info-box -->
			    </div>
				<div class="col-lg-3 col-xs-6">
              <div class="info-box bg-maroon">
                <span class="info-box-icon"><i class="fa fa-heart-o"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Lượt Thích</span>
                  <span class="info-box-number"><?php  echo $tong_like;?></span>
                  <div class="progress">
                    <div class="progress-bar" style="width: 20%"></div>
                  </div>
                  <span class="progress-description">
                    <i class="fa fa-refresh fa-spin"></i>
                  </span>
                </div><!-- /.info-box-content -->
              </div><!-- /.info-box -->
			  </div>
			  <div class="col-lg-3 col-xs-6">
              <div class="info-box bg-purple">
                <span class="info-box-icon"><i class="ion ion-ios-cloud-download-outline"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Downloads</span>
                  <span class="info-box-number"><?php  echo $total_download;?></span>
                  <div class="progress">
                    <div class="progress-bar" style="width: 70%"></div>
                  </div>
                  <span class="progress-description">
                    <i class="fa fa-refresh fa-spin"></i>
                  </span>
                </div><!-- /.info-box-content -->
              </div><!-- /.info-box -->
			  </div>
			  <div class="col-lg-3 col-xs-6">
              <div class="info-box bg-blue">
                <span class="info-box-icon"><i class="fa fa-comments-o"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Bình Luận</span>
                  <span class="info-box-number"><?php  echo $tong_comment;?></span>
                  <div class="progress">
                    <div class="progress-bar" style="width: 40%"></div>
                  </div>
                  <span class="progress-description">
                    <i class="fa fa-refresh fa-spin"></i>
                  </span>
                </div><!-- /.info-box-content -->
              </div><!-- /.info-box -->
</div>

        </section><!-- /.content -->
		<section class="content">
          <div class="row">
            <div class="col-xs-12">
              <!-- interactive chart -->
              <div class="box box-primary">
                <div class="box-header with-border">
                  <i class="fa fa-bar-chart-o"></i>
                  <h3 class="box-title">Interactive Area Chart</h3>
                  <div class="box-tools pull-right">
                    Real time
                    <div class="btn-group" id="realtime" data-toggle="btn-toggle">
                      <button type="button" class="btn btn-default btn-xs active" data-toggle="on">On</button>
                      <button type="button" class="btn btn-default btn-xs" data-toggle="off">Off</button>
                    </div>
                  </div>
                </div>
                <div class="box-body">
                  <div id="interactive" style="height: 300px; padding: 0px; position: relative;"><canvas class="flot-base" width="628" height="300" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 628px; height: 300px;"></canvas><div class="flot-text" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; font-size: smaller; color: rgb(84, 84, 84);"><div class="flot-x-axis flot-x1-axis xAxis x1Axis" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; display: block;"><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 97px; top: 283px; left: 20px; text-align: center;">0</div><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 56px; top: 283px; left: 77px; text-align: center;">10</div><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 97px; top: 283px; left: 138px; text-align: center;">20</div><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 56px; top: 283px; left: 198px; text-align: center;">30</div><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 97px; top: 283px; left: 258px; text-align: center;">40</div><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 56px; top: 283px; left: 319px; text-align: center;">50</div><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 97px; top: 283px; left: 379px; text-align: center;">60</div><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 56px; top: 283px; left: 439px; text-align: center;">70</div><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 97px; top: 283px; left: 499px; text-align: center;">80</div><div class="flot-tick-label tickLabel" style="position: absolute; max-width: 56px; top: 283px; left: 560px; text-align: center;">90</div></div><div class="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; display: block;"><div class="flot-tick-label tickLabel" style="position: absolute; top: 270px; left: 12px; text-align: right;">0</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 216px; left: 6px; text-align: right;">20</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 162px; left: 6px; text-align: right;">40</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 108px; left: 6px; text-align: right;">60</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 54px; left: 6px; text-align: right;">80</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 0px; left: 1px; text-align: right;">100</div></div></div><canvas class="flot-overlay" width="628" height="300" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 628px; height: 300px;"></canvas></div>
                </div><!-- /.box-body-->
              </div><!-- /.box -->

            </div><!-- /.col -->
          </div><!-- /.row -->

       
        </section>
		    <!-- Page script -->
    <script type="text/javascript">

      $(function () {

        /*
         * Flot Interactive Chart
         * -----------------------
         */
        // We use an inline data source in the example, usually data would
        // be fetched from a server
        var data = [], totalPoints = 100;
        function getRandomData() {

          if (data.length > 0)
            data = data.slice(1);

          // Do a random walk
          while (data.length < totalPoints) {

            var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;

            if (y < 0) {
              y = 0;
            } else if (y > 100) {
              y = 100;
            }

            data.push(y);
          }

          // Zip the generated y values with the x values
          var res = [];
          for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]]);
          }

          return res;
        }

        var interactive_plot = $.plot("#interactive", [getRandomData()], {
          grid: {
            borderColor: "#f3f3f3",
            borderWidth: 1,
            tickColor: "#f3f3f3"
          },
          series: {
            shadowSize: 0, // Drawing is faster without shadows
            color: "#3c8dbc"
          },
          lines: {
            fill: true, //Converts the line chart to area chart
            color: "#3c8dbc"
          },
          yaxis: {
            min: 0,
            max: 100,
            show: true
          },
          xaxis: {
            show: true
          }
        });

        var updateInterval = 500; //Fetch data ever x milliseconds
        var realtime = "on"; //If == to on then fetch data every x seconds. else stop fetching
        function update() {

          interactive_plot.setData([getRandomData()]);

          // Since the axes don't change, we don't need to call plot.setupGrid()
          interactive_plot.draw();
          if (realtime === "on")
            setTimeout(update, updateInterval);
        }

        //INITIALIZE REALTIME DATA FETCHING
        if (realtime === "on") {
          update();
        }
        //REALTIME TOGGLE
        $("#realtime .btn").click(function () {
          if ($(this).data("toggle") === "on") {
            realtime = "on";
          }
          else {
            realtime = "off";
          }
          update();
        });
        /*
         * END INTERACTIVE CHART
         */


        /*
         * LINE CHART
         * ----------
         */
        //LINE randomly generated data

        var sin = [], cos = [];
        for (var i = 0; i < 14; i += 0.5) {
          sin.push([i, Math.sin(i)]);
          cos.push([i, Math.cos(i)]);
        }
        var line_data1 = {
          data: sin,
          color: "#3c8dbc"
        };
        var line_data2 = {
          data: cos,
          color: "#00c0ef"
        };
        $.plot("#line-chart", [line_data1, line_data2], {
          grid: {
            hoverable: true,
            borderColor: "#f3f3f3",
            borderWidth: 1,
            tickColor: "#f3f3f3"
          },
          series: {
            shadowSize: 0,
            lines: {
              show: true
            },
            points: {
              show: true
            }
          },
          lines: {
            fill: false,
            color: ["#3c8dbc", "#f56954"]
          },
          yaxis: {
            show: true,
          },
          xaxis: {
            show: true
          }
        });
        //Initialize tooltip on hover
        $('<div class="tooltip-inner" id="line-chart-tooltip"></div>').css({
          position: "absolute",
          display: "none",
          opacity: 0.8
        }).appendTo("body");
        $("#line-chart").bind("plothover", function (event, pos, item) {

          if (item) {
            var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

            $("#line-chart-tooltip").html(item.series.label + " of " + x + " = " + y)
                    .css({top: item.pageY + 5, left: item.pageX + 5})
                    .fadeIn(200);
          } else {
            $("#line-chart-tooltip").hide();
          }

        });
        /* END LINE CHART */

        /*
         * FULL WIDTH STATIC AREA CHART
         * -----------------
         */
        var areaData = [[2, 88.0], [3, 93.3], [4, 102.0], [5, 108.5], [6, 115.7], [7, 115.6],
          [8, 124.6], [9, 130.3], [10, 134.3], [11, 141.4], [12, 146.5], [13, 151.7], [14, 159.9],
          [15, 165.4], [16, 167.8], [17, 168.7], [18, 169.5], [19, 168.0]];
        $.plot("#area-chart", [areaData], {
          grid: {
            borderWidth: 0
          },
          series: {
            shadowSize: 0, // Drawing is faster without shadows
            color: "#00c0ef"
          },
          lines: {
            fill: true //Converts the line chart to area chart
          },
          yaxis: {
            show: false
          },
          xaxis: {
            show: false
          }
        });

        /* END AREA CHART */

        /*
         * BAR CHART
         * ---------
         */

        var bar_data = {
          data: [["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9]],
          color: "#3c8dbc"
        };
        $.plot("#bar-chart", [bar_data], {
          grid: {
            borderWidth: 1,
            borderColor: "#f3f3f3",
            tickColor: "#f3f3f3"
          },
          series: {
            bars: {
              show: true,
              barWidth: 0.5,
              align: "center"
            }
          },
          xaxis: {
            mode: "categories",
            tickLength: 0
          }
        });
        /* END BAR CHART */

        /*
         * DONUT CHART
         * -----------
         */

        var donutData = [
          {label: "Series2", data: 30, color: "#3c8dbc"},
          {label: "Series3", data: 20, color: "#0073b7"},
          {label: "Series4", data: 50, color: "#00c0ef"}
        ];
        $.plot("#donut-chart", donutData, {
          series: {
            pie: {
              show: true,
              radius: 1,
              innerRadius: 0.5,
              label: {
                show: true,
                radius: 2 / 3,
                formatter: labelFormatter,
                threshold: 0.1
              }

            }
          },
          legend: {
            show: false
          }
        });
        /*
         * END DONUT CHART
         */

      });

      /*
       * Custom Label formatter
       * ----------------------
       */
      function labelFormatter(label, series) {
        return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
                + label
                + "<br/>"
                + Math.round(series.percent) + "%</div>";
      }
    </script>