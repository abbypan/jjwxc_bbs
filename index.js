var cm = require("sdk/context-menu");
var tabs = require("sdk/tabs");
var self=require("sdk/self");
 
cm.Menu({
  label: "红晋江",
  image: self.data.url("16.png"), 
  context: [
      cm.URLContext("http://bbs.jjwxc.net/*"), 
      cm.SelectionContext()
  ], 
  contentScript: 'self.on("click", function (node, qtype) { \
                var qdata = window.getSelection().toString(); \
                self.postMessage({ d : qdata, t: qtype }); \
                 });',
  onMessage: function(m){
          var tab_url = tabs.activeTab.url;
          var p = new RegExp("board\=(\\d+)");
          var result = p.exec(tab_url);
          if (result == null){
              return;
          }
          var board=result[1];

          var attachScript = function (tab) {
              tab.attach({
                  contentScript: ' document.getElementById("kw").value = "' + m.d + '"; \
                  document.getElementById("t").value="' + m.t + '"; \
                  document.getElementById("b").value="' + board + '"; \
                  document.getElementById("f").submit();\
                  '
              });
          };

          tabs.open({
              url: self.data.url("jjwxc.html"),
              onReady: attachScript
          });
  },
  items: [
    cm.Item({ label: "贴子主题", data: "3" }),
    cm.Item({ label: "主题贴内容", data: "1" }),
    cm.Item({ label: "主题贴发贴人", data: "4" }),
    cm.Item({ label: "跟贴内容", data: "2" }),
    cm.Item({ label: "跟贴发贴人", data: "5" })
  ]
});
