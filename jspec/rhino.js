
load('/usr/lib/ruby/gems/1.9.1/gems/jspec-4.3.1/lib/jspec.js')
load('/usr/lib/ruby/gems/1.9.1/gems/jspec-4.3.1/lib/jspec.xhr.js')
load('public/javascripts/application.js')
load('jspec/unit/spec.helper.js')

JSpec
.exec('jspec/unit/spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'jspec/fixtures' })
.report()