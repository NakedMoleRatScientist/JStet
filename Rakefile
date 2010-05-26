require 'net/ftp'
if File.exist?("secret.rb")
  require 'secret.rb'
end

task :deploy => [:concat]
task :concat do
  sh "rm game.js"
  sh "cat client/modes/network.js client/modes/score.js client/models/timer_action.js client/models/score.js client/models/playfield.js client/models/playfield_draw.js client/models/tetromino.js client/models/j_shape.js client/models/i_shape.js client/models/l_shape.js client/models/o_shape.js client/models/z_shape.js client/models/s_shape.js client/models/t_shape.js client/models/shape_generator.js client/models/tetromino_draw.js client/modes/engine.js > game.js"
end

task :copy do
  sh "cp jstet.html /srv/http"
  sh "cp game.js /srv/http"
  sh "cp -r vendor /srv/http"
end

task :test do
  sh "cp sockety.html /srv/http"
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
