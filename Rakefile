require 'net/ftp'
require 'secret.rb'

task :deploy => [:concat]
task :concat do
  sh "rm game.js"
  sh "cat app/models/tetromino.js app/models/shape_generator.rb app/models/tetromino_draw.js app/modes/engine.js > game.js"
end

task :deploy do
  ftp = Net::FTP.new()
  ftp.connect("kibabase.com",21)
  ftp.login(USER,PASS)
  ftp.chdir("kibabase.com")
  ftp.put("game.js")
  ftp.put("jstet.html")
  ftp.close()
end