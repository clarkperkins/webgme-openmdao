/* Generated file based on ejs templates */
define([], function() {
    return {
    "Python.py.ejs": "print \"<%=a%> and <%=b%> provided.\"",
    "assembly.py.ejs": "from openmdao.main.api import Assembly\n<% components.forEach(function(component) { %>\nfrom <%= component.package %> import <%= component.name %>\n<% }) %>\n\nclass <%= name %>(Assembly):\n\n    def configure(self):\n        <% components.forEach(function(component) { %>\n            self.add('<%= component.name.toLowerCase() %>', <%= component.name %>())\n        <% }) %>\n\n        self.driver.workflow.add([\n            <% components.forEach(function(component) { %>\n            '<%= component.name.toLowerCase() %>'\n            <% }) %>\n        ])"
}});