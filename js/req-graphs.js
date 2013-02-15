// Input:
//   requirements: [{id,title,parent}]
//   use-cases: [{id,parent}]
// Output:
//   nodes: [{name,group)]
//   links: [{source,target,value}]

// Turn this:
var reqs = {
    "requirements":[
        {"id":"r1",
         "title":"Bikeshed is blue",
         "parent":"u1"},
        {"id":"r2",
         "title":"Bikeshed is red",
         "parent":"u1"},
        {"id":"r3",
         "title":"Bikeshed has door big enough for bike",
         "parent":"u2"}
    ],

    "usecases":[
        {"id":"u1",
         "title":"Bikeshed is pretty",
         "parent":null},
        {"id":"u2",
         "title":"Bikeshed is functional",
         "parent":null}
    ]
};

// ...and this:
var items = [
    // Requirements
    {"id":"r1",
     "title":"Bikeshed is blue",
     "parent":"u1",
     "type":"requirement"},
    {"id":"r2",
     "title":"Bikeshed is red",
     "parent":"u1",
     "type":"requirement"},
    {"id":"r3",
     "title":"Bikeshed has door big enough for bike",
     "parent":"u2",
     "type":"requirement"},
    // Use Cases
    {"id":"u1",
     "title":"Bikeshed is pretty",
     "parent":null,
     "type":"usecase"},
    {"id":"u2",
     "title":"Bikeshed is functional",
     "parent":null,
     "type":"usecase"},
]

// Into this:
var graph = {
    "nodes":[
        {"name":"Bikeshed is blue","group":2},
        {"name":"Bikeshed is red","group":2},
        {"name":"Bikeshed has a door big enough for a bike","group":2},
        {"name":"Bikeshed is pretty","group":1},
        {"name":"Bikeshed is functional","group":1}
    ],
    "links":[
        {"source":0,"target":3,"value":1},
        {"source":1,"target":3,"value":1},
        {"source":2,"target":4,"value":1}
    ]
};

function nodeOfRequirement(r, i) {
    return {
        "num":i,
        "id":r.id,
        "name":r.title,
        "parent":r.parent,
        "group":2,
    };
}

function nodeOfUsecase(c, i) {
    return {
        "id":c.id,
        "num":i,
        "name":c.title,
        "parent":c.parent,
        "group":1,
    };
}

var itemTypes = ["requirement", "usecase"]
var itemConverters = {
    "requirement":nodeOfRequirement,
    "usecase":nodeOfUsecase,
}

function buildGraphFromItems(items) {
    var nodes = [];
    var links = [];
    var count = 0;

    items.forEach(function(i) {
        var t = i.type;
        var nodeOf = itemConverters[t];
        if(nodeOf != undefined) {
            nodes.push(nodeOf(i,count));
            count++;
        }
    });

    nodes.forEach(function(n) {
        nodes.filter(function(o) { return o.id == n.parent })
            .forEach(function(p) {
                links.push({
                    "source":n.num,
                    "target":p.num,
                });
            });
    });

    return {"nodes":nodes, "links":links};
}

function buildGraph(items) {
    var nodes = [];
    var links = [];

    for (var i=0; i < items.requirements.length; i++) {
        var r = items.requirements[i];
        var n = {
            "num":i,
            "id":r.id,
            "name":r.title,
            "parent":r.parent,
            "group":2,
        };
        nodes.push(n);
    }

    var nr = nodes.length;

    for (var i=0; i < items.usecases.length; i++) {
        var c = items.usecases[i];
        var n = {
            "id":c.id,
            "num":nr + i,
            "name":c.title,
            "parent":c.parent,
            "group":1,
        };
        nodes.push(n);
    }

    nodes.forEach(function(n) {
        var ps = nodes.filter(function(o) { return o.id == n.parent });

        if(ps.length == 1) {
            var p = ps[0];
            var l = {
                "source":n.num,
                "target":p.num
            };
            links.push(l);
        }
    });

    return {"nodes":nodes, "links":links};
}

function doD3(graph) {
    var width = 960, height = 500;

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .style("fill", function(d) { return color(d.group); })
        .call(force.drag);

    node.append("title")
        .text(function(d) { return d.name; });

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });
}

doD3(buildGraphFromItems(items));
