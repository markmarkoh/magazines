(function() {
  var graphs = d3.select('#graphs');

  var WIDTH = graphs[0][0].offsetWidth, HEIGHT = 5000;
  var GRAPH_WIDTH = WIDTH / 1.5;

  d3.csv('magazines.csv', function(d) {
    return {
      name: d.name,
      pages: +d.pages,
      ads: +d.ads,
      category: d.category
    }
  }, function(error, data) {

    data = data.sort(compare);
    var svg = graphs.append('svg')
      .attr('height', data.length * GRAPH_WIDTH)
      .attr('width', WIDTH);

    var magazines = svg
      .selectAll('.magazines')
      .data(data);


    var magazineEnter = magazines.enter()
        .append('g')
        .attr('class', 'magazine')
        .attr('transform', function(d, idx) {
          return 'translate(0, ' + (idx * GRAPH_WIDTH) + ')';
        });

    magazineEnter
        .append('rect')
          .attr('x', 0)
          .attr('y', function(d, idx) {
            return 0;
          })
          .attr('width', 500)
          .attr('height', 500)
          .attr('class', 'content')
          .style('fill', 'rgba(4,34,218,0.5)')
          .style('stroke', '#FFF')
          .style('stroke-width', 5)

    magazineEnter
        .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', area)
          .attr('height', area)
          .attr('class', 'ads')
          .attr('transform', 'rotate(180, ' + 500/2 + ',' + 500/2 + ')')
          .style('fill', 'rgba(5,43,181,0.5)')
          .style('stroke', '#FFF')
          .style('stroke-width', 5)

    graphs.selectAll('.info')
      .data(data)
      .enter()
        .append('div')
        .style('position', 'absolute')
        .style('top', function(d,idx) {
          return idx * GRAPH_WIDTH + 'px'
        })
        .style('right', 0)
        .html(function(d) {
          return [
            '<dl>',
            '<dd><h3>' + d.name + '</h3></dd>',
            '<dt>Pages of content</dt>',
            '<dd>' + d.pages + '</dd>',
            '<dt>Pages of advertisements</dt>',
            '<dd>' + d.ads + '</dd>',
            '<dt>Category</dt>',
            '<dd>' + d.category + '</dd>',
            '</dl>'
          ].join("")
        })

    function area(d) {
      var areaOfGraph = 500 * 500;
      var percentageOfAds = d.ads / d.pages;
      return Math.sqrt(areaOfGraph * percentageOfAds);
    }

    function compare(a,b) {
      if ( (a.ads / a.pages) > (b.ads / b.pages) ) {
        return -1;
      }
      return 1;
    }
  })

})();