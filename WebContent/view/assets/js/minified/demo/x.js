$(function(){Morris.Bar({element:"color-bar",data:[{x:"2011 Q1",y:0},{x:"2011 Q2",y:1},{x:"2011 Q3",y:2},{x:"2011 Q4",y:3},{x:"2012 Q1",y:4},{x:"2012 Q2",y:5},{x:"2012 Q3",y:6},{x:"2012 Q4",y:7},{x:"2013 Q1",y:8}],xkey:"x",ykeys:["y"],labels:["Y"],barColors:function(a,b,c){if("bar"===c){var d=Math.ceil(255*a.y/this.ymax);return"rgb("+d+",155,22)"}return"#000"}})}),$(function(){var a=[{period:"2012-10-01",licensed:3407,sorned:660},{period:"2012-09-30",licensed:3351,sorned:629},{period:"2012-09-29",licensed:3269,sorned:618},{period:"2012-09-20",licensed:3246,sorned:661},{period:"2012-09-19",licensed:3257,sorned:667},{period:"2012-09-18",licensed:3248,sorned:627},{period:"2012-09-17",licensed:3171,sorned:660},{period:"2012-09-16",licensed:3171,sorned:676},{period:"2012-09-15",licensed:3201,sorned:656},{period:"2012-09-10",licensed:3215,sorned:622}];Morris.Bar({element:"labels-bar",data:a,xkey:"period",ykeys:["licensed","sorned"],labels:["Licensed","SORN"],xLabelAngle:60})}),$(function(){Morris.Bar({element:"stacked-bars",data:[{x:"2011 Q1",y:3,z:2,a:3},{x:"2011 Q2",y:2,z:null,a:1},{x:"2011 Q3",y:0,z:2,a:4},{x:"2011 Q4",y:2,z:4,a:3}],xkey:"x",ykeys:["y","z","a"],labels:["Y","Z","A"],stacked:!0})}),$(function(){Morris.Donut({element:"donut",backgroundColor:"#fff",labelColor:"#ccc",colors:["#4fb2ff","#929292","#67C69D","#ff9393"],data:[{value:70,label:"foo",formatted:"at least 70%"},{value:15,label:"bar",formatted:"approx. 15%"},{value:10,label:"baz",formatted:"approx. 10%"},{value:5,label:"A really really long label",formatted:"at most 5%"}],formatter:function(a,b){return b.formatted}})}),$(function(){for(var a=[],b=0;360>=b;b+=10)a.push({x:b,y:1.5+1.5*Math.sin(Math.PI*b/180).toFixed(4)});window.m=Morris.Line({element:"decimal-data",data:a,xkey:"x",ykeys:["y"],labels:["sin(x)"],parseTime:!1,hoverCallback:function(a,b,c){var d=b.data[a];return c.replace("sin(x)","1.5 + 1.5 sin("+d.x+")")},xLabelMargin:10,integerYLabels:!0})}),$(function(){Morris.Area({element:"daytime-bars",data:[{x:"2013-03-30 22:00:00",y:3,z:3},{x:"2013-03-31 00:00:00",y:2,z:0},{x:"2013-03-31 02:00:00",y:0,z:2},{x:"2013-03-31 04:00:00",y:4,z:4}],xkey:"x",ykeys:["y","z"],labels:["Y","Z"]})});